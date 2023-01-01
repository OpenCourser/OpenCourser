import { UserProvider } from '@auth0/nextjs-auth0/client';
import React from 'react';

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
