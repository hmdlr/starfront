import {
  DeployedPaths,
  FrontPaths,
  LocalPaths,
  Microservice
} from '@hmdlr/utils/dist/Microservice';

export default {
  version: {
    number: 0.8,
    name: 'Sat 🛰',
    needsPurge: true,
  },
  api: {
    [Microservice.Authphish]: process.env.NODE_ENV === 'development'
        ? `${LocalPaths[Microservice.Authphish]}`
        : `${DeployedPaths[Microservice.Authphish]}`,
    [Microservice.Scanphish]: process.env.NODE_ENV === 'development'
        ? `${LocalPaths[Microservice.Scanphish]}`
        : `${DeployedPaths[Microservice.Scanphish]}`,
  },
  front: {
    [Microservice.Authphish]: process.env.NODE_ENV === 'development'
        ? `${FrontPaths[Microservice.Authphish]}`
        : `${DeployedPaths[Microservice.Authphish]}`,
  },
  commPort: 'starph1sh',
  tokenLocation: 'starphish-token',
};
