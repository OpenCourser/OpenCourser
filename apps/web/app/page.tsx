'use client';

import { Box, Heading } from '@chakra-ui/react';

export default function Homepage(props) {
  return (
    <>
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
        />
        <Heading padding="64px" textAlign="center" size="4xl">
          Hello world
        </Heading>
        <Box h="3000px" />
      </Box>
    </>
  );
}
