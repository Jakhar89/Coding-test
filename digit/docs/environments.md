# Managing Environments

The SSCP brings much needed improvements around how configurations are managed, as such it is
important that your AEMaaCS environments are configured correctly.

## Environment Variables

The Accelerator configurations have defaults set that provide a decent experience locally but will end up causing issues
in staging & production. To avoid problems in the future, ensure that you have the following variables set:

| Variable Name                        | Dev Value      | Stage/Prod Value |
| ------------------------------------ | -------------- | ---------------- |
| `AEM_VITE_ENABLED`                   | `false`        | `false`          |

See [Cloud Manager Environment Variables](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/content/implementing/using-cloud-manager/environment-variables.html?lang=en)
for more information.

### Dev environment

As mentioned, the staging/production is highly recommended having the above. The dev environment by contrast can use the
defaults which will suffice.

## Pipeline Variables

Like the environment variables, there are some variables that are also required during a build to ensure the correct
outcomes are achieved.

See [Understanding the Build Environment](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/content/implementing/using-cloud-manager/create-application-project/build-environment-details.html?lang=en#pipeline-variables)
for more information.

### Required variables

The below _should_ be defined in all pipelines exactly as per the below list.

| Variable Name            | Dev Value | Stage/Prod Value |
| ------------------------ | --------- | ---------------- |
| `CM_DISABLE_BUILD_REUSE` | `true`    | `true`           |

Learn more about Cloud Manager [build artifact reuse](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/content/implementing/using-cloud-manager/create-application-project/setting-up-project.html?lang=en#build-artifact-reuse).

### Front end ClientLib paths

The `ui.frontend` module out-of-the-box provides the ability to automatically hash and minify ClientLib paths to align
with HTML Library Manager. It is key that `<value>` for `FRONTEND_MINIFY` aligns to the variables set for each environment.

For instance, `FRONTEND_MINIFY` should remain `false` for the Dev environment whereas should be `true` for staging and production which share a pipeline.

### Setting pipeline variables

Once you have the Adobe AIO command line tool installed, replace the input values below with the correct ones for the particular project you're working on.

```bash
aio cloudmanager:set-pipeline-variables <pipelineId> --programId <programId> --variable <variable name> <value>
```