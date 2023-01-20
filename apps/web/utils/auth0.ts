import { initAuth0 } from '@auth0/nextjs-auth0/edge';

export default initAuth0({
  secret: 'LONG_RANDOM_VALUE',
  issuerBaseURL: 'https://your-tenant.auth0.com',
  baseURL: 'http://localhost:3000',
  clientID: 'CLIENT_ID',
  clientSecret: 'CLIENT_SECRET',
});
