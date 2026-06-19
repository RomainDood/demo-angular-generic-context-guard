import { Component, Directive, input, signal } from '@angular/core';

export type GenericContext<T> = { $implicit: T };

export type FixDeepFunctionInfer<
  GenericValue extends unknown,
  GenericValueInfer extends unknown,
> = [GenericValueInfer] extends [never]
  ? NoInfer<GenericValue>
  : GenericValueInfer;

@Directive({
  selector: '[appGeneric]',
})
export class GenericDirective<T extends Record<string, number>> {
  readonly items = input.required<T>();

  static ngTemplateContextGuard<T extends Record<string, number>>(
    directive: GenericDirective<T>,
    context: unknown,
  ): context is GenericContext<T> {
    return true;
  }
}

@Directive({
  selector: '[appGenericFixed]',
})
export class FixedGenericDirective<
  GenericValue extends Record<string, number> = Record<string, number>,
  GenericValueInfer extends GenericValue = never,
> {
  readonly items = input.required<
    FixDeepFunctionInfer<GenericValue, GenericValueInfer>[]
  >();

  static ngTemplateContextGuard<
    GenericValue extends Record<string, number>,
    GenericValueInfer extends GenericValue = never,
  >(
    directive: FixedGenericDirective<GenericValue, GenericValueInfer>,
    context: unknown,
  ): context is GenericContext<
    FixDeepFunctionInfer<GenericValue, GenericValueInfer>[]
  > {
    return true;
  }
}

@Component({
  selector: 'app-root',
  template: `
    <ng-template appGenericFixed [items]="items()" let-items>
      {{ items[0].myNum }}
    </ng-template>
  `,
  imports: [FixedGenericDirective],
})
export class App {
  readonly items = signal([{ myNum: 0 }]);
}
