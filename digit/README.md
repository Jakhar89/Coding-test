# SSCP

This project contains all core code & functionality required for the SSCP AEM experience to work correctly for authors and end-users.

## Modules

The main parts of the template are:

- core: Java bundle containing all core functionality like OSGi services, listeners or schedulers, as well as component-related Java code such as servlets or request filters.
- it.tests: Java based integration tests
- ui.apps: contains the /apps (and /etc) parts of the project, ie JS&CSS ClientLibs, components, and templates
- ui.content: contains sample content using the components from the ui.apps
- ui.config: contains runmode specific OSGi configs for the project
- ui.frontend: encapsulates the front end source which will be compiled into browser-ready bundles and static assets.
- ui.generators: a configuration generator designed with all developers in mind
- ui.tests: Selenium based UI tests
- all: a single content package that embeds all of the compiled modules (bundles and content packages) including any vendor dependencies
- analyse: this module runs analysis on the project which provides additional validation for deploying into AEMaaCS

## Getting started

To ensure a high standard of quality the, Accelerator only supports the latest AEM versions and associated tooling. Please see the [installation instructions](./docs/install.md) to get your local environment up and running.

## How to Build

To build all the modules run in the project root directory the following command with Maven 3:

    mvn clean install

To build all the modules and deploy the `all` package to a local instance of AEM, run in the project root directory the following command:

    mvn clean install -PautoInstallSinglePackage

Or to deploy it to a publish instance, run

    mvn clean install -PautoInstallSinglePackagePublish

Or alternatively

    mvn clean install -PautoInstallSinglePackage -Daem.port=4503

Or to deploy only the bundle to the author, run

    mvn clean install -PautoInstallBundle

Or to deploy only a single content package, run in the sub-module directory (i.e `ui.apps`)

    mvn clean install -PautoInstallPackage

If there is build issues related to 'dispatcher' in Windows, try one of the following:

    Command Prompt:

        mvn clean install -PautoInstallPackage -Denforcer.skip=true

    Terminal:

        mvn clean install -PautoInstallPackage '-Denforcer.skip=true'

## Testing

There are three levels of testing contained in the project:

### Unit tests

This show-cases classic unit testing of the code contained in the bundle. To
test, execute:

    mvn clean test

### Integration tests

This allows running integration tests that exercise the capabilities of AEM via
HTTP calls to its API. To run the integration tests, run:

    mvn clean verify -Plocal

Test classes must be saved in the `src/main/java` directory (or any of its
subdirectories), and must be contained in files matching the pattern `*IT.java`.

The configuration provides sensible defaults for a typical local installation of
AEM. If you want to point the integration tests to different AEM author and
publish instances, you can use the following system properties via Maven's `-D`
flag.

| Property              | Description                                         | Default value           |
| --------------------- | --------------------------------------------------- | ----------------------- |
| `it.author.url`       | URL of the author instance                          | `http://localhost:4502` |
| `it.author.user`      | Admin user for the author instance                  | `admin`                 |
| `it.author.password`  | Password of the admin user for the author instance  | `admin`                 |
| `it.publish.url`      | URL of the publish instance                         | `http://localhost:4503` |
| `it.publish.user`     | Admin user for the publish instance                 | `admin`                 |
| `it.publish.password` | Password of the admin user for the publish instance | `admin`                 |

The integration tests in this archetype use the [AEM Testing
Clients](https://github.com/adobe/aem-testing-clients) and showcase some
recommended [best
practices](https://github.com/adobe/aem-testing-clients/wiki/Best-practices) to
be put in use when writing integration tests for AEM.

## Static Analysis

The `analyse` module performs static analysis on the project for deploying into AEMaaCS. It is automatically
run when executing

    mvn clean install

from the project root directory. Additional information about this analysis and how to further configure it
can be found here https://github.com/adobe/aemanalyser-maven-plugin

### UI tests

They will test the UI layer of your AEM application using Selenium technology.

To run them locally:

    mvn clean verify -Pui-tests-local-execution

This default command requires:

- an AEM author instance available at http://localhost:4502 (with the whole project built and deployed on it, see `How to build` section above)
- Chrome browser installed at default location

Check README file in `ui.tests` module for more details.

## Front End

Please see the [front end documentation](./docs/front-end.md) for more information.

## Managing Environments

It is vital to ensure environments are configured correctly for the sscp, please see [managing environments](./docs/environments.md) for further information.

## Precompiled Scripts

The SSCP makes use of precompiled scripts which behave differently to standard bundles. Please refer to the [precompiled scripts documentation](./README-precompiled-scripts.md) for more information.

## Maven Settings

The project comes with the auto-public repository configured. To setup the repository in your Maven settings, refer to:

    http://helpx.adobe.com/experience-manager/kb/SetUpTheAdobeMavenRepository.html


## AEM non-core component configuration

For each custom component (using `EmailAddress` as example), the following are required:
- model: `core/src/main/java/com/sscp/core/models/EmailAddress.java`
- component `ui.apps/src/main/content/jcr_root/apps/sscp/components/emailaddress`
- template: `/ui.apps/src/main/content/jcr_root/apps/sscp/components/emailaddress/emailaddress.html`
(**NOTE:** the name is important as it maps to FE component and is used by the `composeReactComponents` fn to identify components when app is initialized - see `ui.frontend/src/toyota/js/app.tsx` for reference )

Data is passed to FE via the `data-*` attributes - see example:
```
<div react-component component-name="EmailAddress"
    data-sly-use.model="com.sscp.core.models.EmailAddress"
    data-sly-use.errorSuccessModel="com.sscp.core.models.ErrorSuccessModel"
    data-attribute="${model.json}"
    data-error-success-attribute="${errorSuccessModel.json}">
</div>
```
- dialogues: `ui.apps/src/main/content/jcr_root/apps/sscp/components/emailaddress/_cq_dialog/.content.xml`
- FE component: `ui.frontend/src/common/js/components/EmailAddress`

Make sure any policies updated to include component - see example: `/ui.content/src/main/content/jcr_root/conf/sscp/settings/wcm/policies/.content.xml`

## Adobe Cloud env instability when application dependencies modified (known issue)

When adding/modifying 3rd party vendor packages via yarn and the following files get modified:
- `ui.frontend/package.json`
- `yarn.lock`
...there is a known issue whereby the Adobe Cloud environments appear to use a cached version of the compiled vendor.js file (ie. `/etc.clientlibs/sscp/clientlibs/clientlib-toyota/resources/js/chunks/vendor.5ee04153.js`) and we see a console error - see https://tfal.atlassian.net/browse/DDW-2616 and https://tfal.atlassian.net/browse/DDW-2772 for more context
- a work-around solution will be documented in Confluence involving adding a hash to the vendor js path name