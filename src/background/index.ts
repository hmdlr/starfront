// If your extension doesn't need a background script, just leave this file empty

import { wrapStore } from 'webext-redux';
import { store } from '../redux/store';
import env from '../env';

// This needs to be an export due to typescript implementation limitation of needing '--isolatedModules' tsconfig
export async function runBackgroundScripts() {
  wrapStore(store, { portName: env.commPort });
}

(async () => {
  await runBackgroundScripts();
})();
