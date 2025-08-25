import { composePlugins, NxWebpackExecutionContext, withNx } from '@nx/webpack';

module.exports = composePlugins(
  // Default Nx composable plugin
  withNx(),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (config, { options, context }: NxWebpackExecutionContext) => {
    // `config` is the Webpack configuration object
    // `options` is the options passed to the `@nx/webpack:webpack` executor
    // `context` is the context passed to the `@nx/webpack:webpack` executor
    // customize configuration here

    return config;
  },
);
