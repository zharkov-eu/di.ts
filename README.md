# TypeScript Dependency Injection

Dependency Injection for TypeScript-based projects.

## Requirements

In tsconfig.json property "target" (ECMAScript target version) more or equal "es2015"

In tsconfig.json must be set to "true" properties:
* experimentalDecorators
* emitDecoratorMetadata

## Аннотации

* @Component - all classes available for injection should be marked with this annotation
* @Singleton - create only one instance of the class and use it in all injections

## Usage

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
