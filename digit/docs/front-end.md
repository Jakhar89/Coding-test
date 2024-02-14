# Front End

Unlike the standard AEM Archetype, the AEM Accelerator uses a highly-custom version of the `ui.frontend` module which integrates the latest and great technologies.

## ClientLibs

The `ui.frontend` module is made available using an [AEM ClientLib](https://helpx.adobe.com/experience-manager/6-5/sites/developing/using/clientlibs.html). When executing an npm build script, the app is built into the correct ClientLib structure using a pre-defined template in the `.maven` folder.

A ClientLib will consist of the following files and directories:

- `css/`: CSS files which can be requested in the HTML
- `css.txt` (tells AEM the order and names of files in `css/` so they can be merged)
- `js/`: JavaScript files which can be requested in the HTML
- `js.txt` (tells AEM the order and names of files in `js/` so they can be merged
- `resources/`: Source maps, non-entrypoint code chunks (resulting from code splitting), static assets (e.g. icons), etc.
