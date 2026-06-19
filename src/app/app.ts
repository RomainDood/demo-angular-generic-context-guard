import { Component, Directive, input, signal } from '@angular/core';

export type GenericContext<T> = { $implicit: T };

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

@Component({
  selector: 'app-root',
  template: `
    <ng-template appGeneric [items]="items()" let-items> </ng-template>
  `,
  imports: [GenericDirective],
})
export class App {
  readonly items = signal([{ myNum: 0 }]);
}
