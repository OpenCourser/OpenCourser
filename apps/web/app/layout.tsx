'use client';

import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Box, Flex } from '@chakra-ui/react';
import { SaasProvider } from '@saas-ui/react';
import { Container } from 'components/Container';

import { theme } from 'styles/theme';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: 'rgb(30, 32, 39)' }}>
        <UserProvider>
          <SaasProvider theme={theme}>
            <Box bgColor="background" color="whiteAlpha.900">
              {/*  */}
              <Box
                borderBottomWidth="1px"
                borderColor="whitealpha.200"
                height="64px"
                bgColor="transparent"
                boxShadow="md"
                as="header"
                zIndex="overlay"
                inset={0}
                position="fixed"
              >
                <Box
                  boxSize="full"
                  pos="relative"
                  zIndex={1}
                  _before={{
                    content: `""`,
                    pos: 'absolute',
                    inset: '0px',
                    bottom: '-20px',
                    backdropFilter: 'blur(16px)',
                    mask: 'linear-gradient(to bottom, black 60px, transparent)',
                  }}
                >
                  <Flex boxSize="full" position="relative" zIndex={1}></Flex>
                </Box>
              </Box>
              {/*  */}

              <Container mt="64px">{children}</Container>
            </Box>
          </SaasProvider>
        </UserProvider>
      </body>
    </html>
  );
}
