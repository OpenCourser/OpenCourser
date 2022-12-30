import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';
import { EnvVars } from 'env-vars';

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        authorizationParams: {
          audience: EnvVars.AUTH0_AUDIENCE,
          scope: 'openid profile email',
        },
      });
    } catch (error) {
      res.status(error.status || 400).end(error.message);
    }
  },
});
