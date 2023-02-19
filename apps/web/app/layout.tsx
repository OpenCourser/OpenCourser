'use client';

import { UserProvider } from '@auth0/nextjs-auth0/client';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Persona, SaasProvider } from '@saas-ui/react';
import Link from 'next/link';
import { Container } from 'components/Container';

import { theme } from 'styles/theme';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
                  <Container h="full">
                    <Flex boxSize="full" position="relative" zIndex={1}>
                      <Flex boxSize="full" alignItems="center" justifyContent="space-between">
                        <Button>logo</Button>
                        <Flex>
                          <Box display={{ base: 'block', md: 'none' }}>
                            <IconButton icon={<HamburgerIcon />} aria-label="Open drawer menu" colorScheme="primary" variant="solid" onClick={onOpen} />
                          </Box>
                          <Box display={{ base: 'none', md: 'block' }}>
                            <Menu isLazy>
                              <MenuButton
                                as={Button}
                                variant="ghost"
                                _hover={{ bgColor: 'transparent' }}
                                _focus={{ bgColor: 'transparent' }}
                                _active={{ bgColor: 'transparent' }}
                              >
                                <Persona size="sm" name="Eelco Wiersma" secondaryLabel="Founder" presence="online" />
                              </MenuButton>
                              <MenuList mt={1}>
                                <MenuGroup title="Profile">
                                  <MenuItem>My Account</MenuItem>
                                  <MenuItem>Payments </MenuItem>
                                </MenuGroup>
                              </MenuList>
                            </Menu>
                          </Box>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Container>
                </Box>
              </Box>
              {/*  */}

              {children}
            </Box>
            <Drawer onClose={onClose} isOpen={isOpen} size="full">
              <DrawerOverlay />
              <DrawerContent bgColor="background" borderRadius={0} margin={0}>
                <DrawerCloseButton color="whiteAlpha.900" size="lg" />
                <DrawerHeader>{`drawer contents`}</DrawerHeader>
                <DrawerBody color="whiteAlpha.900">
                  <Stack justifyContent="center" alignItems="center" h="full" spacing={4}>
                    <Link href="#">
                      <Text fontSize="2xl" _hover={{ color: 'primary.500' }} _active={{ color: 'primary.500' }}>
                        My Account
                      </Text>
                    </Link>
                    <Link href="#">
                      <Text fontSize="2xl" _hover={{ color: 'primary.500' }} _active={{ color: 'primary.500' }}>
                        Payments
                      </Text>
                    </Link>
                  </Stack>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </SaasProvider>
        </UserProvider>
      </body>
    </html>
  );
}
