/*
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * @author Evgenii Zharkov <zharkov.ev.u@yandex.ru>
 */

"use strict";

import "mocha"
import assert from "assert";
import { Component, Injector, Singleton } from "../src/di";

abstract class Abstract {
  protected static ABSTRACT_PROP = "ABSTRACT";
  protected _counter: number;

  protected constructor(protected readonly _name: string) {
    this._counter = 0;
  }

  public get name() {
    return this._name;
  }

  public get count() {
    return this._name;
  }

  public increment(): number {
    return ++this._counter;
  }
}

@Component()
@Singleton()
class A extends Abstract {
  public static PUB_PROP = "PUBLIC";
  private static LOCAL_PROP = "LOCAL";

  constructor() {
    super("A");
    assert.strictEqual(A.PUB_PROP, "PUBLIC");
    assert.strictEqual(A.LOCAL_PROP, "LOCAL");
    assert.strictEqual(A.ABSTRACT_PROP, "ABSTRACT");
  }
}

@Component()
class B extends Abstract {
  constructor(public readonly aClass: A) {
    super("B");
  }
}

class C extends Abstract {
  constructor(public readonly bClass: B) {
    super("C");
  }
}

@Component()
class InjectMe {
  constructor(public readonly aClass: A,
              public readonly bClass: B,
              public readonly cClass: C) {
  }
}

describe("Dependency injection test", () => {
  it("Singleton annotation accept injection", () => {
    const aClass = Injector.resolve<InjectMe>(InjectMe).aClass;
    assert.strictEqual(aClass instanceof A, true);
    assert.strictEqual(aClass.name, "A");
    assert.strictEqual(aClass.increment(), 1);
  });

  it("Singleton annotation inject only one instance", () => {
    const aClass = Injector.resolve<InjectMe>(InjectMe).aClass;
    assert.strictEqual(aClass instanceof A, true);
    assert.strictEqual(aClass.name, "A");
    assert.strictEqual(aClass.increment(), 2);
  });

  it("Component annotation accept injection", () => {
    const bClass = Injector.resolve<InjectMe>(InjectMe).bClass;
    assert.strictEqual(bClass instanceof B, true);
    assert.strictEqual(bClass.aClass instanceof A, true);
    assert.strictEqual(bClass.name, "B");
    assert.strictEqual(bClass.increment(), 1);
    assert.strictEqual(bClass.aClass.increment(), 3);
  });

  it("Component annotation inject new instance", () => {
    const bClass = Injector.resolve<InjectMe>(InjectMe).bClass;
    assert.strictEqual(bClass instanceof B, true);
    assert.strictEqual(bClass.aClass instanceof A, true);
    assert.strictEqual(bClass.name, "B");
    assert.strictEqual(bClass.increment(), 1);
  });

  it("Classes without annotation cannot be injected", () => {
    const cClass = Injector.resolve<InjectMe>(InjectMe).cClass;
    assert.strictEqual(cClass instanceof C, true);
    assert.strictEqual(typeof cClass.bClass, "undefined");
  });
});
