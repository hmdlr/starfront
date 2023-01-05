import { Microservice, MicroservicePaths } from '@hmdlr/utils/dist/Microservice';

export default {
  version: {
    number: 0.2,
    name: 'Celestial 🌌',
    needsPurge: true,
  },
  api: {
    [Microservice.Authphish]: process.env.NODE_ENV === 'development'
      ? `${MicroservicePaths.authphish}api`
      : 'https://auth.starphish.app/api',
  },
  commPort: 'starph1sh',
};
