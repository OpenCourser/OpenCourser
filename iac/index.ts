import * as pulumi from '@pulumi/pulumi';
import * as cloudflare from '@pulumi/cloudflare';

const cfg = new pulumi.Config();

const basicProject = new cloudflare.PagesProject('opencourser-web', {
  accountId: cfg.require('cloudflareAccountId'),
  name: 'opencourser-web',
  productionBranch: 'main',
  buildConfig: {
    buildCommand: 'make build-web',
    destinationDir: 'apps/web/.next',
    rootDir: '',
  },
  source: {
    config: {
      deploymentsEnabled: true,
      owner: 'OpenCourser',
      prCommentsEnabled: true,
      previewBranchExcludes: ['main', 'prod'],
      previewBranchIncludes: ['dev', 'preview'],
      previewDeploymentSetting: 'custom',
      productionBranch: 'main',
      productionDeploymentEnabled: true,
      repoName: 'OpenCourser',
    },
    type: 'github',
  },
  deploymentConfigs: {
    preview: {
      environmentVariables: {
        ENVIRONMENT: 'preview',
      },
    },
    production: {
      environmentVariables: {
        NODE_VERSION: '16.13.0',
      },
    },
  },
});
