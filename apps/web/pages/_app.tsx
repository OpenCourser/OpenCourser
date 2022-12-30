import { UserProvider } from '@auth0/nextjs-auth0/client';
import { SaasProvider } from '@saas-ui/react';
import React from 'react';
import { theme } from 'styles/theme';

// Copied from next.js docs and the AppProps type doesn't work
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MyApp({ Component, pageProps }: any) {
  return (
    <UserProvider>
      <SaasProvider theme={theme}>
        <Component {...pageProps} />;
      </SaasProvider>
    </UserProvider>
  );
}
