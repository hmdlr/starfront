import { Microservice, MicroservicePaths } from '@hmdlr/utils/dist/Microservice';

export default {
  version: {
    number: 0.8,
    name: 'Sat 🛰',
    needsPurge: true,
  },
  api: {
    [Microservice.Authphish]: process.env.NODE_ENV === 'development'
      ? `${MicroservicePaths[Microservice.Authphish]}api`
      : 'https://auth.starphish.app/api',
  },
  commPort: 'starph1sh',
};
