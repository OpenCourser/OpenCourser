import app from './app';

const port = process.env.PORT;

if (!process.env.PORT) {
  throw new Error('Cannot start video-to-m3u8 converter service, because it has no PORT env var declared.');
}

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
