# TypeScript Dependency Injection
> npm package: [@operative/di](https://www.npmjs.com/package/@operative/di)

Инъекция зависимостей для TypeScript проектов.

## Требования

В tsconfig.json свойство "target" (ECMAScript target version) не менее "es2015"

В tsconfig.json должны быть установлены в "true" свойства:
* experimentalDecorators
* emitDecoratorMetadata

## Аннотации

* @Component - все классы, доступные к инъекции должны быть помечены этой аннотацией
* @Singleton - создать лишь один экземпляр класса и использовать его во всех инъекциях 

## Использование

```typescript

import assert from "assert"
import { Component, Injector, Singleton } from "@operative/di";

@Component()
@Singleton()
class A {}

@Component()
class B {}

@Component()
class InjectMe {
  constructor(public aClass: A,
              public bClass: B) {
  }
}

const injected = Injector.resolve<InjectMe>(InjectMe);
assert.strictEqual(injected.aClass instanceof A, true);
assert.strictEqual(injected.bClass instanceof B, true);

```