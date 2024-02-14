import composeReactComponents from '@/utility/compose-react';

async function initiateApp() {
  // Render React components
  const reactComponentElements = document.querySelectorAll<HTMLElement>('[react-component]');
  if (reactComponentElements.length > 0) {
    composeReactComponents(reactComponentElements, 'powertorque');
  }
}

initiateApp();
