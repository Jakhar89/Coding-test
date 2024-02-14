# Icons Configuration

Font Awesome is used as a base framework for the icons because it offers over 1000+ icons for free and enables custom icons to be generated and used within the core library.

## Usage

There are two types of icons that can be generated:

1. Standard OOTB icons from [fontawesome.com](https://fontawesome.com)
2. Custom icons using local SVG files

### Font Awesome

| Property                                                                                                                                      | Type      | Required |
| --------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- |
| **category**<br><small>_Font Awesome category or custom category name._</small>                                                               | `String`  | Yes      |
| **class**<br><small>_CSS class that Font Awesome will look for when generating icons._</small>                                                | `String`  | Yes      |
| **flat**<br><small>_Used in the content generator to denote the generated icon requires a flat directory structure. default: `false`_</small> | `Boolean` | No       |
| **name**<br><small>_Friendly name that appears in AEM and in the DLS._</small>                                                                | `String`  | Yes      |
| **prefix**<br><small>_Category name that the icon belongs to. i.e. fas, fab_</small>                                                          | `String`  | Yes      |
| **usable**<br><small>_Whether the icon is for internal use only. default: `true`_</small>                                                     | `Boolean` | No       |

#### Example

```yml
- category: 'feed/rss'
  class: 'rss'
  name: 'RSS'
  prefix: 'fas'
```

### Custom Icon

Custom icons follow the same configuration as standard Font Awesome icons but have two extra and distinct properties available.

| Property                                                                                    | Type     | Required |
| ------------------------------------------------------------------------------------------- | -------- | -------- |
| **path**<br><small>_Relative path to the project. The base path is always `./src`._</small> | `String` | Yes      |
| **size**<br><small>_SVG size in pixels._</small>                                            | `Number` | Yes      |

#### Example

```yml
- category: 'feature'
  class: 'autumn'
  name: 'Autumn'
  prefix: 'fac'
  path: 'icons/autumn' # would be relative to ./src/icons
  size: 64
```
