import _throttle from 'lodash/throttle';

function handleRougeContent(target: Element | null = null) {
  console.info('[Rouge Content] Getting ready to smash some elements, 𝗛𝗨𝗟𝗞 style!');

  const paragraphs = (target || document).querySelectorAll('p');

  let totalSmashed = 0;

  if (paragraphs.length) {
    paragraphs.forEach((paragraph) => {
      if (paragraph.innerHTML === '&nbsp;') {
        paragraph.classList.add('is-empty');
        totalSmashed += 1;
      }
    });
  }

  console.info('[Rouge Content] Smashed %d paragraph elements!', totalSmashed);
}

export default (): void => {
  console.info('[Watcher] Spinning up mutation observer for AEM author mode!');

  const mutationObserver = new MutationObserver(
    _throttle((mutations: MutationRecord[]) => {
      console.info('[Watcher] Change detected! %d mutations in play', mutations.length);

      mutations.forEach(({ target }) => {
        console.info('[Watcher] Target:', target);

        // Rouge content
        handleRougeContent(target as Element);
      });

      console.info('[Watcher] Finished mutation run!');
    }, 500),
  ); // -> Wait 500 milliseconds between executions so we don't freeze the authoring UI

  mutationObserver.observe(document.querySelector('body > div:first-child') as HTMLElement, {
    childList: true,
    subtree: true,
  });

  // Rouge content
  handleRougeContent();
};
