# SSCP - Precompiled Scripts

This project was set-up so that the server-side scripts from the [`ui.apps`](./ui.apps) module
are precompiled and bundled. A secondary JAR artifact will be attached by default to your build,
which will also be added to your [`all`](./all) content-package.

## Development workflow

When deployed to a local SDK development instance, a bundled precompiled script will have priority
over a script for the same resource type/selector combination. Therefore, your `/apps` script
changes will not be picked up for rendering. By default, precompiled scripts are skipped on local
environments to avoid creating problems. 

To activate precompiled scripts, simply set the `CM_BUILD` environment variable which will activate
the required maven profile.

```bash

    CM_BUILD=true mvn clean install -PautoInstallSinglePackage

```
