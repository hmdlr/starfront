import { getLogger } from '@hmdlr/utils';
import env from '../env';
import { collect, getServerCache } from "./collector";
import { Store, applyMiddleware } from 'webext-redux';
import thunkMiddleware from 'redux-thunk';
import { getInvoker } from "../invoker";

const proxyStore = new Store({ portName: env.commPort });

const middleware = [thunkMiddleware];
const store = applyMiddleware(proxyStore, ...middleware);

const logger = getLogger();
export const runStarphish = async () => {
  logger.info(`Starphish ${env.version.name} is shielding you!`);

  const invoker = getInvoker(store);

  const collectible = collect();
  const serverCache = await getServerCache(invoker);

  console.log(collectible);
};

(async () => {
  await runStarphish();
})();
