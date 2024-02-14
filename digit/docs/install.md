# Installation

Go through the steps required to getting your local environment AEM up and running.

## Getting started

The standard method of getting setup using the Oracle JDK and Homebrew to manage additional dependencies will suffice for this project if that is what you already have.

## Requirements

- AEM as a Cloud Service SDK
- JDK (Java Development Kit) 11
- Maven 3
- Node 16.x
- Yarn >=1.10.x <2

## Via homebrew (macOS, Linux, WSL)

Homebrew is the industry standad when it comes to getting common packages installed quickly. It is recommended that you use it for the AEM Accelerator to get the most consistent installation experience.

Installing Homebrew is simple. Open a new terminal window and run the below command.

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### WSL note

Homebrew should install without issue as long as you are using WSL2 and an up-to-date virtual machine.

## Maven 3

Maven can be installed via Homebrew using the following command:

```sh
brew install maven
```

Please see the [Maven installation instructions](https://maven.apache.org/install.html) for guidance on a non-homebrew approach.

## Node

You can install Node either via the bundled installer available on the [Node.js website](https://nodejs.org/en/) or via Homebrew.

```sh
brew install node@16
```

### Node Version Manager (optional)

Working across projects introduces a challenge by which different Node and npm requirements exist. NVM helps avoid such problems by allowing us to run a different version of Node and npm in the context of our chosing without affecting other projects and even the system default.

See the link below for installation instructions.

https://github.com/nvm-sh/nvm

## Yarn

Installing Yarn is as simple as running the below command.

```sh
curl --compressed -o- -L https://yarnpkg.com/install.sh | bash
```

You can use Homebrew to install it but by default it installs the latest version of Node too which can introduce breaking changes. When using nvm however, you don't need to worry about this since switching Node versions is as simple as: `nvm use <version>`.

## Set up local AEM Runtime

Adobe Experience Manager (AEM) can be run locally using the AEM as a Cloud Service SDK’s Quickstart Jar. This allows developers to deploy to, and test custom code, configuration and content prior to committing it to source control, and deploying it to a AEM as a Cloud Service environment.
Note that ~ is used as shorthand for the User’s Directory. In Windows, this is the equivalent of `%HOMEPATH%`.

### Install Java

Experience Manager is a Java application, and thus requires the Java SDK to support the development tooling.
1.	Download and install the latest Java SDK 11
2.	Verify Java 11 SDK is installed by running the command:
    - Windows: `java -version`
    - macOS / Linux: `java --version`

### Java Version Manager (optional)

Any modern workflow deserves a simple way of switching between tooling versions and Java is no exception to this. A tool by the name of `jenv` was created that enables us to use one version of Java for the system and another for each local project via a `.java-version` file.

To get started, follow the instructions at: https://github.com/jenv/jenv

Once installed, and after installing Maven, run `jenv enable-plugin maven` to ensure Maven gets activated for the currently active JDK version.

## AEM as a Cloud Service SDK

**AEM SDK:** [aem-sdk-2022.4.7138.20220427T075748Z-220400.zip](https://tfal.atlassian.net/wiki/spaces/SSP/pages/3049554145/Onboarding+resources) ( unzip and use as we don’t have access to adobe experience cloud instance for entire team yet)

### Set up local AEM Author service
The local AEM Author Service provides developers with a local experience digital marketers/content authors will share to create and manage content. AEM Author Service is designed both as an authoring and preview environment, allowing most validations of feature development can be performed against it, making it a vital element of the local development process.
1.	Create the folder `~/aem-sdk/author`
2.	Copy the Quickstart JAR file to `~/aem-sdk/author` and rename it to `aem-author-p4502.jar`

    Windows:
    ```
    $ mkdir -p c:\Users\<My User>\aem-sdk\author
    $ copy aem-sdk-Quickstart-XXX.jar c:\Users\<My User>\aem-sdk\author\aem-author-p4502.jar
    $ cd c:\Users\<My User>\aem-sdk\author
    $ java -jar aem-author-p4502.jar
    ```

    macOS/Linux:
    ```
    $ mkdir -p ~/aem-sdk/author
    $ cp aem-sdk-Quickstart-XXX.jar ~/aem-sdk/author/aem-author-p4502.jar
    $ cd ~/aem-sdk/author
    $ java -jar aem-author-p4502.jar
    ```
3.	Start the local AEM Author Service by executing the following from the command line:
    -	`java -jar aem-author-p4502.jar`
        -	Provide the admin password as admin. Any admin password is acceptable, however its recommend to use the default for local development to reduce the need to re-configure.

        You cannot start the AEM as Cloud Service Quickstart Jar by double-clicking.
4.	Access the local AEM Author Service at http://localhost:4502 in a Web browser

### Clone Project:

Clone SSCP project from https://github.com/Toyota-Finance-Australia/digital-aem-sscp/tree/develop

### Maven build:

Perform maven build by running:
 `mvn clean install -PautoInstallSinglePackage`
To build without running tests (quicker), run:
`mvn clean install -PautoInstallPackage -DskipTests`
To build just the frontend (ie. no backend changes), cd into frontend directory `ui.frontend` and run:
`mvn clean install -PautoInstallPackage -DskipTests`

### Reference link:

Please follow this link to setup AEM local instance
https://experienceleague.adobe.com/docs/experience-manager-learn/cloud-service/local-development-environment-set-up/aem-runtime.html?lang=en
