import { isAuthorMode } from '@/utility/aem';

async function run() {
  console.info('Getting site ready...');

  /**
   * Apply some fixes when we are in the AEM author 'edit' mode.
   */
  if (isAuthorMode()) {
    // DOM watch mode!
    (await import('./modules/watcher')).default();
  }

  /**
   * Load the icons now as they are the heaviest payload overall.
   */
  // (await import('@/frontend/site/module/adaptive/icons')).default();
}

run();

if (import.meta.hot) {
  import.meta.hot.accept();
}
