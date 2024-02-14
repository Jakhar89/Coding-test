# ui.frontend

The `ui.frontend` project is designed as the base for all components, functionality, and behaviour. It encapsulates static assets, JavaScript, CSS and a styleguide project within that controls the DLS (Design Language System).

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Deploy Code into AEM](#deploy-code-into-aem)
- [Local Development](#local-development)
- [Linting](#linting)
- [Testing](#testing)

## Features

- ES2020 JavaScript (via TypeScript)
- React components integrated with AEM data models
- A solid testing structure

## Installation

Getting going is pretty simple, you will, however, need to make sure you have the below installed first to ensure a smooth and consistent experience with other developers.

- **Node >= 16**
- **Yarn >= 1.10.0** _(Yarn 2 is not currently supported)_
- **TypeScript enabled IDE** _(VS Code or an IDE plugin)_
- **ESLint**
- **Stylelint**
- **EditorConfig**
- **Prettier**
- An **AEM as a Cloud Service SDK** instance that has project installed

### NPM Packages

Once you have met the requirements above, install the npm packages by simply running:

`yarn`

## Deploy Code into AEM

Run the below command and the ui.frontend module will install into your AEM instance. By default, development code is built.

```bash
mvn clean install -PautoInstallPackage
```

To test that production built code works correctly, add the `command.npm` property flag to the command like below.

```bash
mvn clean install -Dcommand.npm=aem:build -PautoInstallPackage

# or via profile activation
FRONTEND_MINIFY=true mvn clean install -PautoInstallPackage
```

## Local Development

All local development uses the `vite` DevServer which uses the AEM Vite plugin in your local AEM instance and provides real time updates without needing to constantly deploy manually. The benefit to manual deployments is that we get:

- HMR support
- Real time change support
- Proper debugging via an IDE
- True sourcemaps

Simply run the below command of choice and your AEM instance will automatically switch over to your local Vite DevServer.

```sh
yarn serve:<project>
```

### Creating a new project

> Coming soon!

### Running multiple projects

It is possible to run multiple project servers at the same time but requires separate configurations to be created for AEM Vite. If you already have this configured, simply prepend `cross-env DEV_SERVER_PORT` to the serve command.

```sh
cross-env DEV_SERVER_PORT=3001 yarn serve:<project>
```

> **NOTE:** `cross-env` is used to ensure environment variables are set correctly between Unix and Windows operating systems.

### AEM Vite configurations

Once you have a Vite configuration created for your new project, you will also need to create an AEM specific configuration file that defines how your new project will interact with AEM.

Within the `ui.config` module, navigate to the below path:

    src/main/content/jcr_root/apps/sscp/config.local

Make a copy of an existing `dev.aemvite.aem.impl.ViteDevServerConfigImpl` configuration file and update it with the values that meet your project needs. If any values are incorrect or mismatched, you will find that the Vite DevServer either doesn't get injected into the page or if injects into the wrong context.

Consult with your backend developer(s) on the project for guidance if you are unsure about which values to use.

## Linting

All code in the project is linted both in your IDE (where supported) and during compilation. This is to ensure that bugs and issues can be fixed before going out and ensures consistency between developers.

ESLint and Stylelint are used across all projects in conjunction with Prettier to ensure code is always written the same way by everyone. Both projects can be linted separately via the below commands.

```sh
yarn lint     # find all issues
yarn lint:fix # write all fixes
```

## Formatting

All code follows a consistent set of standards and can be formatted a couple of different ways. Prettier is used to implement all rules consistently and the easiest way to get things in check is by running 2 npm scripts.

```bash
yarn prettier:check # find all issues
yarn prettier:write # write all fixes
```

> **NOTE:** Using the linting commands above will also trigger prettier automatically.

A better way of going about this is by having your IDE automatically format on save. This behaviour changes between each IDE but here are some guides to get started:

- [Visual Studio Code](https://glebbahmutov.com/blog/configure-prettier-in-vscode/)
- [IntelliJ](https://medium.com/@dyanagi/format-with-prettier-on-save-in-intellij-based-ides-webstorm-451e0c69bab1)
- [Sublime Text](https://medium.com/@ogbopinamoses/how-to-install-jsprettier-in-sublime-text-f22b0f77380e)
- [Atom](https://atom.io/packages/prettier-atom)

## Testing

All tests are conducted using Jest out-of-the-box. The aim of this structure is to ensure the codebase is concise, consistent, and easy to follow.

Running the tests is as simple as:

```sh
yarn test

# or with coverage
yarn test:coverage
```

## SVG management

Whilst SVGR is great tool to process SVGs and output them as React components, there is an issue with duplicate id attributes within SVGs when the same SVG is rendered more than once on any given page - 2nd and subsequent icons failed to render correctly.

To address this, each SVG has to be manually converted to React component using HOC `import { withSvg } from '@/utility/components/Icon/Svg';`

For any SVG, check if there is an id attr `id="#xxxx"` and if so, use the following pattern to replace with random id generated using `uuid` package.

Example:

```
import React, { useMemo } from 'react';
import { withSvg } from '@/utility/components/Icon/Svg';
import { v4 as uuidv4 } from 'uuid';

const Svg = () => {
  const randomId = useMemo(() => uuidv4(), []);
  return (
    <>
    ...
    </>
    )
  };

```

Replace any id or hash (#) references with `randomId` const.

Example:
```
  <path fill={`url(#${randomId}`}
  ....
  <clipPath id={randomId}>
  ...
  <mask id={randomId}>
  ...
  <path mask={`url(#${randomId}`}/>
  ...

```

## Forgerock integration

For split token integration testing in AEM localhost (ie. http://localhost:4502), you will need to specify 2 local storage values to request the token split endpoint (see `ui.frontend/src/common/js/utilities/hooks/useForgeRockJourney.ts`):

- apiKey: `<value>`
- splitterUrl: `<value>`

Values from Confluence:
- API key: https://tfal.atlassian.net/wiki/spaces/SSP/pages/2968289331/Common+API+Attributes
- URL: https://tfal.atlassian.net/wiki/spaces/SSP/pages/2951905308/Access+Token+Management+Stateless+Client-side+Split+Token