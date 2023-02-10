import express from 'express';
import multer from 'multer';
import PQueue from 'p-queue';
import MessageResponse from 'src/interfaces/MessageResponse';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';
import ErrorResponse from 'src/interfaces/ErrorResponse';
import tmp from 'tmp';

const router = express.Router();
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

ffmpeg.setFfmpegPath(ffmpegPath);

tmp.setGracefulCleanup();

type EmojiResponse = MessageResponse | ErrorResponse | Buffer;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 },
});

router.post<{}, EmojiResponse>('/', upload.single('video'), async (req, res) => {
  const videoData = req?.file?.buffer;

  if (!videoData) {
    res.json({
      message: 'Received empty payload',
    });
    return;
  }

  try {
    const requestQueue = new PQueue({ concurrency: 1 });
    const inputFilenamePrefix = 'input-video';

    const tmpInputFile = tmp.fileSync({ prefix: inputFilenamePrefix });
    await fs.promises.writeFile(tmpInputFile.name, videoData);

    await requestQueue.add(async () => {
      ffmpeg(tmpInputFile.name)
        .outputOptions([
          '-codec: copy',
          '-start_number 0',
          `-hls_time ${process.env.HLS_CHUNK_SIZE}`,
          '-hls_list_size 0',
          '-hls_playlist_type vod',
          `-hls_base_url ${process.env.HLS_BASE_URL}`,
        ])
        .output('outputfile.m3u8')
        .on('end', async (info) => {
          await fs.promises.unlink(tmpInputFile.name);
          tmpInputFile.removeCallback();
        })
        .run();

      // upload to s3 async (e.g. through api gateway -> sns/sqs -> s3 or something like that, but probably i am over-thinking this )
    });

    res.end();
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({
        message: 'Something went wrong',
        stack: e.stack,
      });
    }
  }
});

export default router;
