// If your extension doesn't need a content script, just leave this file empty

// This is an example of a script that will run on every page. This can alter pages
// Don't forget to change `matches` in manifest.json if you want to only change specific webpages

// This needs to be an export due to typescript implementation limitation of needing '--isolatedModules' tsconfig

import { getLogger } from '@hmdlr/utils';
import env from '../env';

const logger = getLogger();
export const runHighlightr = async () => {
  logger.info(`StarPhish ${env.version.name} is shielding you!`);
};

runHighlightr();
