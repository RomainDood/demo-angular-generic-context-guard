# Angular generic template context guard inference

Ce projet compare deux directives de template génériques :

- `GenericDirective<T>` lie directement son input à `T extends Record<string, number>` et rejette un tableau avec `TS2322` ;
- `FixedGenericDirective<GenericValue, GenericValueInfer>` sépare le contrat du type réellement inféré avec `FixDeepFunctionInfer`.

La seconde directive accepte `signal([{ myNum: 0 }])`. Dans le template, `let-items` est précisément inféré comme `{ myNum: number }[]` : `myNum` est un `number` et une propriété absente est rejetée par le compilateur Angular.

## Environnement

- Angular 22.0.2
- Angular CLI 22.0.3
- pnpm 11.5.2
- Node.js 24.15.0 ou version compatible avec Angular 22
- application standalone, sans routing, SSR ni tests

## Observer le comportement

```sh
pnpm install
pnpm start
```

La page affiche `0`. Le build de validation doit réussir :

```sh
pnpm build
```

La directive originale reste dans `src/app/app.ts`. Remplacer `appGenericFixed` par `appGeneric` dans le template reproduit son erreur :

```text
TS2322: Type '{ myNum: number; }[]' is not assignable to type 'Record<string, number>'.
```

## Liens

- [Angular template type checking](https://angular.dev/tools/cli/template-typecheck)
- [Angular signal inputs](https://angular.dev/guide/components/inputs)
- [TypeScript `NoInfer`](https://www.typescriptlang.org/docs/handbook/utility-types.html#noinfertype)
- [Ouvrir dans StackBlitz](https://stackblitz.com/github/RomainDood/demo-angular-generic-context-guard)
