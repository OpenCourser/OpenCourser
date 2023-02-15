import { Box, BoxProps } from '@chakra-ui/react';

export const containerPaddingX = { base: 4, md: 6 };
export const negativeContainerPaddingX = makeEachItemNegative(Object.entries(containerPaddingX));

export function Container({ children, ...props }: BoxProps) {
  return (
    <Box width="100%" mx="auto" maxWidth="87.5rem" px={containerPaddingX} {...props}>
      {children}
    </Box>
  );
}

function makeEachItemNegative(arr: [string, number][]) {
  return Object.fromEntries(arr.map(([key, value]) => [key, value * -1]));
}
