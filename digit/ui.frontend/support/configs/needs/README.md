# Project Needs

A need is a set of external configuration factors that introduce new behaviours and functionality into a project without needing to manually invoke them through the **ui.frontend** module.

## Available Features

To keep things simple, features are limited to opt-in to make sure that new features don't have any impact. The currently available features are:

| Feature Name         | Description                                       |
| -------------------- | ------------------------------------------------- |
| **Icon generator**   | Generate TypeScript and tag structures for icons. |
| **Colour generator** | Generate Sass and tag structures for colours.     |

## Create a Needs Config

These configuration files are designed to be simple and straight-forward to ensure that complexities are kept to a minimum.

### Configuration

| Property                                                                                                          | Type      | Required |
| ----------------------------------------------------------------------------------------------------------------- | --------- | -------- |
| **colours.tags**<br><small>_Do the colours also need tags to be generated? default: `false`_</small>              | `Boolean` | No       |
| **colours.sass**<br><small>_Generate a Sass file for the colours. This path is relative `./src`._</small>         | `String`  | No       |
| **icons.tags**<br><small>_Do the icons also need tags to be generated? default: `false`_</small>                  | `Boolean` | No       |
| **icons.typescript**<br><small>_Generate a TypeScript file for the icons. This path is relative `./src`._</small> | `String`  | No       |

### Example

```js
module.exports = {
  icons: {
    tags: true,
    typescript: 'site/js/modules/icons.ts',
  },
}
```
