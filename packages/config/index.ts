import get from 'lodash/get';

import devConfig from './config.dev';
import exampleConfig from './config.example';

import { CoreConfiguration } from './definition';

type EnvType = 'development' | 'production';

const cget = (key: Join<PathsToStringProps<typeof exampleConfig>, '.'>) => {
  const isClient = typeof window !== 'undefined';
  if (isClient) {
    throw new Error('Core config cannot be used on a client');
  }

  const configs: Partial<Record<EnvType, CoreConfiguration>> = {
    development: devConfig,
    // production: prodConfig
  };

  const env: EnvType = (process.env.NODE_ENV as EnvType) || 'development';
  return get(configs[env] || configs['development'], key) || key;
};

type PathsToStringProps<T> = T extends string
  ? []
  : {
      [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>];
    }[Extract<keyof T, string>];

type Join<T extends string[], D extends string> = T extends []
  ? never
  : T extends [infer F]
  ? F
  : T extends [infer F, ...infer R]
  ? F extends string
    ? `${F}${D}${Join<Extract<R, string[]>, D>}`
    : never
  : string;

export { cget };
