'use client';

import { Box, Grid, GridItem, Heading, Icon, Link, LinkBox, LinkOverlay, Progress, SimpleGrid, Stack, TagRightIcon, Text } from '@chakra-ui/react';
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle } from '@saas-ui/react';
import NextLink from 'next/link';
import { Container } from 'components/Container';

export default function Homepage(props) {
  return (
    <Container color="whiteAlpha.900">
      <Box pos="relative" h="500px">
        <Box
          position="absolute"
          w="full"
          background="radial-gradient(at 40% 45%, #4f1d9e 10%, transparent 30%),radial-gradient(at 60% 60%, #2ab4d9 0%, transparent 40%),radial-gradient(at 30% 60%, var(--chakra-colors-cyan-500) 0%, transparent 30%),radial-gradient(at 70% 70%, #1d979e 0%, transparent 10%),radial-gradient(at 60% 70%, #4f1d9e 0%, transparent 30%)"
          backgroundBlendMode="saturation"
          backgroundPosition="top"
          opacity={0.5}
          inset="0px"
          filter="blur(160px)"
          zIndex={1}
        />
        <Grid
          position="relative"
          background="transparent"
          zIndex={2}
          w="full"
          py={40}
          templateColumns={{ base: 'repeat(auto-fit, minmax(200px, 1fr))', lg: 'repeat(4, 1fr)' }}
          gap={10}
        >
          <GridItem colStart={1} colEnd={4}>
            <Stack>
              <Heading size="lg" mb={{ base: 4, md: 10 }}>
                Courses
              </Heading>
              <SimpleGrid minChildWidth="290px" spacing="40px">
                {Array.from({ length: 10 }, (_, idx) => {
                  return (
                    <Card key={idx} color="whiteAlpha.900" as={LinkBox} bg="gray.700" borderColor="whiteAlpha.50">
                      <CardHeader pt={4} pb={2}>
                        <LinkOverlay href="#">
                          <CardTitle>An example course</CardTitle>
                        </LinkOverlay>
                      </CardHeader>
                      <CardBody py={2}>
                        <Text fontSize="md" color="muted">
                          Laborum velit aliquip duis Lorem consectetur qui duis velit consequat id excepteur deserunt non. Exercitation qui nulla Lorem irure ad
                          tempor do exercitation est consectetur eu.
                        </Text>
                        <Button
                          rightIcon={
                            <Icon
                              as={TagRightIcon}
                              transform="translateX(-5px)"
                              transitionProperty="common"
                              transitionDuration="normal"
                              sx={{ '.saas-card:hover &': { transform: 'translateX(0)' } }}
                            />
                          }
                          variant="link"
                          sx={{ '.saas-card:hover &': { color: 'primary.400' } }}
                        >
                          Learn more
                        </Button>
                      </CardBody>

                      <CardFooter pb={4} pt={2}>
                        <Stack spacing={2} alignItems="center" w="full">
                          <Text color="muted" fontSize="12px">
                            34% completed
                          </Text>
                          <Progress colorScheme="green" value={34} size="sm" w="full" />
                        </Stack>
                      </CardFooter>
                    </Card>
                  );
                })}
              </SimpleGrid>
            </Stack>
          </GridItem>
          <GridItem justifySelf={{ base: 'auto', lg: 'flex-end' }}>
            <Stack>
              <Heading size="lg" mb={{ base: 4, md: 10 }}>
                Helpful links
              </Heading>

              <Link as={NextLink} href="/">
                My account
              </Link>
              <Link as={NextLink} href="/">
                Code of conduct
              </Link>
              <Link as={NextLink} href="/">
                Contact support
              </Link>
            </Stack>
          </GridItem>
        </Grid>
      </Box>
    </Container>
  );
}
