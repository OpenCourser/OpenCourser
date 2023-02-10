import app from './app';
import { cget } from '@opencourser/config';

const port = cget('m3u8ConverterService.port');

if (!port) {
  throw new Error('Cannot start video-to-m3u8 converter service, because it has no PORT env var declared.');
}

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
