import express from 'express';
import multer from 'multer';
import PQueue from 'p-queue';
import MessageResponse from 'src/interfaces/MessageResponse';
import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import ErrorResponse from 'src/interfaces/ErrorResponse';

const router = express.Router();
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

ffmpeg.setFfmpegPath(ffmpegPath);

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
    const inputFileName = path.join(__dirname, `input-video`);
    const outputFileName = path.join(__dirname, `output.m3u8`);

    const requestQueue = new PQueue({ concurrency: 1 });

    await fs.promises.writeFile(inputFileName, videoData);
    await fs.promises.writeFile(outputFileName, '');

    await requestQueue.add(async () => {
      ffmpeg(inputFileName)
        .outputOptions([
          '-codec: copy',
          '-start_number 0',
          '-hls_time 10',
          '-hls_list_size 0',
          '-hls_playlist_type vod',
          '-hls_base_url http://localhost:3000/',
        ])
        .output('outputfile.m3u8')
        .on('progress', (info) => {
          console.log('progress ' + info?.percent + '%');
        })
        .on('end', async (info) => {
          await fs.promises.unlink(inputFileName);
          // await fs.promises.unlink(outputFileName);
          console.log('done processing input stream');
          res.end();
        })
        .run();

      // upload to s3 async (e.g. through api gateway -> sns/sqs -> s3 or something like that, but probably i am over-thinking this )
    });
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
