# Reference app generator

## Commands 

Generate all use cases:
```
$ npm run generate
$ npm run generate:watch
```
> Warning: This overwrites yours local changes to the `use-cases/` directory.

Build all use cases:
```
$ npm run build
```

Run all use cases simultaneously:
```
$ npm run dev
```

## Structure

```
/docs
/use-cases      – fully functional use case-specific apps 
  /use-case-1
  /use-case-2
  ...
/generator
  /template     – fully functional generic app that's used as a base for all use cases
  /use-cases
    /use-case-1 – use case-specific customizations (themes, components, assets, etc.)
    /use-case-2
    ...
  generate.mjs  – script that's responsible for generating use case-specific apps
```

How it works:
- It copies `/generator/template/` to the `/use-cases/{use-case}` folder
- It then merges files from `/generator/use-cases/{use-case}` with `/use-cases/{use-case}`
  > Some paths are completely overridden instead of being merged – this can be customized in the `generate.mjs` script.
- `package.json` and `package-lock.json` are slightly updated to use proper `name` value
- `README.md` file is copied from the root directory to the `use-cases/{use-case}` folder
  > `{use-case}` variable is replaced in the `README.md` file

## Best practices

- Keep overrides as minimal as possible
- Instead of overriding the whole component, try to only override theme or styles
- Make the code as generic as possible
- Keep most of the logic and components in the base template
- Carefully check changes after each `npm run generate` execution
