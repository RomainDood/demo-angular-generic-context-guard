# Angular generic template context guard reproduction

Ce projet reproduit le typage d’une directive structurelle générique dont le paramètre `T` étend `Record<string, number>`.

Avec le binding `[items]="items()"`, Angular infère la valeur `{ myNum: number }[]`. Le build doit échouer avec `TS2322`, car un tableau ne satisfait pas `Record<string, number>`.

## Environnement

- Angular 22.0.2
- Angular CLI 22.0.3
- pnpm 11.5.2
- Node.js 24.15.0 ou version compatible avec Angular 22
- application standalone, sans routing, SSR ni tests

## Observer le comportement

```sh
pnpm install
pnpm build
```

Le résultat attendu est une erreur sur `[items]="items()"` :

```text
TS2322: Type '{ myNum: number; }[]' is not assignable to type 'Record<string, number>'.
```

`pnpm start` produit la même erreur au moment de compiler l’application.

## Liens

- [Angular template type checking](https://angular.dev/tools/cli/template-typecheck)
- [Angular signal inputs](https://angular.dev/guide/components/inputs)
- [Ouvrir dans StackBlitz](https://stackblitz.com/github/RomainDood/demo-angular-generic-context-guard)
