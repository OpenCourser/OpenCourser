import { extendTheme } from '@chakra-ui/react';
import { theme as baseTheme } from '@saas-ui/react';

const colors = {};

export const theme = extendTheme({ colors }, baseTheme);
