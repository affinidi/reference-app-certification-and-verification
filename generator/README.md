# Reference app generator

## Commands 

Generate all flavors:
```
$ npm run generate
$ npm run generate:watch
```
> Warning: This overwrites yours local changes to the `flavors/` directory.

Build all flavors:
```
$ npm run build
```

Run all flavors simultaneously:
```
$ npm run dev
```

## Structure

```
/docs
/flavors       – fully functional flavored apps 
  /flavor-1
  /flavor-2
  ...
/generator
  /template    – fully functional generic app that's used as a base for all flavors
  /flavors
    /flavor-1  – flavor-specific customizations (themes, components, assets, etc.)
    /flavor-2
    ...
  generate.mjs – script that's responsible for generating flavored apps
```

How it works:
- It copies `/generator/template/` to the `/flavors/{flavor}` folder
- It then merges files from `/generator/flavors/{flavor}` with `/flavors/{flavor}`
  > Some paths are completely overridden instead of being merged – this can be customized in the `generate.mjs` script.
- `package.json` and `package-lock.json` are slightly updated to use proper `name` value
- `README.md` file is copied from the root directory to the `flavors/{flavor}` folder
  > `{flavor}` variable is replaced in the `README.md` file

## Best practices

- Keep overrides as minimal as possible
- Instead of overriding the whole component, try to only override theme or styles
- Make the code as generic as possible
- Keep most of the logic and components in the base template
- Carefully check changes after each `npm run generate` execution
