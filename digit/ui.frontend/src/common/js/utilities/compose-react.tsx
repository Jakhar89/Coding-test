import { FC, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AEMProps } from '@/types/global/aem-definition';
import { default as HinoTheme } from '@/utility/theme/hino';
import { default as LexusTheme } from '@/utility/theme/lexus';
import { default as MazdaTheme } from '@/utility/theme/mazda';
import { default as PowerAllianceTheme } from '@/utility/theme/power-alliance';
import { default as PowerTorqueTheme } from '@/utility/theme/powertorque';
import { default as SuzukiTheme } from '@/utility/theme/suzuki';
import { default as ToyotaTheme } from '@/utility/theme/toyota';

import { isRestricted } from './helpers/restrictAccess';

const themeConfig = {
  hino: HinoTheme,
  lexus: LexusTheme,
  mazda: MazdaTheme,
  'power-alliance': PowerAllianceTheme,
  powertorque: PowerTorqueTheme,
  suzuki: SuzukiTheme,
  toyota: ToyotaTheme,
};

/**
 * Check if page restricted | pgRestricted
 * Pass the API values returned in *pgRestricted* to the components of the page
 */
const pageName = digitalData?.page?.pageName ?? '';
const pgRestricted = isRestricted(pageName);

export default (componentRootElements: NodeListOf<HTMLElement>, site: string) => {
  const foundComponents = {};
  const Theme = themeConfig?.[site] ?? ToyotaTheme;

  const globbedComponents = import.meta.globEager('../../../common/js/components/**/!(*.stories)@(.tsx)');

  Object.keys(globbedComponents).forEach((componentName) => {
    componentName.match(/\/(\w+).tsx$/);

    // If the component name cannot be extract, simply fall back to the original key
    foundComponents[RegExp.$1 || componentName] = globbedComponents[componentName];
  });

  componentRootElements.forEach((rootElement) => {
    const aemDialogValues = rootElement.getAttribute('data-attribute');
    const aemErrorSuccessValues = rootElement.getAttribute('data-error-success-attribute');
    const isAuthorRunMode = rootElement.getAttribute('data-is-author-mode');

    const componentName = rootElement.getAttribute('component-name');
    const foundComponent = Object.keys(foundComponents).find((c) => c === componentName);

    if (foundComponent && componentName && aemDialogValues) {
      const Component: FC<AEMProps> = foundComponents[foundComponent]?.default;

      if (Component) {
        // @ts-ignore we know it doesn't contain a valid signature, it's fine
        // NOTE: Use cloud config (possibly) to pass in props to have some content be dynamic
        const root = createRoot(rootElement!);
        root.render(
          <StrictMode>
            <Theme>
              <Component
                attributes={aemDialogValues}
                errorSuccessMap={(aemErrorSuccessValues && JSON.parse(aemErrorSuccessValues)) ?? {}}
                isAuthorRunMode={isAuthorRunMode ?? 'true'}
                site={site}
                restricted={pgRestricted ? true : false}
              />
            </Theme>
          </StrictMode>,
        );
      }
    }
  });
};
