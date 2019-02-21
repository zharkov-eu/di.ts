/*
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 */

"use strict";

import "reflect-metadata";

export const Component = (): ClassDecorator => {
  return (target) => undefined;
};

export const Singleton = (): ClassDecorator => {
  return (target: any) => {
    const tokens = Reflect.getMetadata("design:paramtypes", target) || [];

    const singleton: any = function (...args: any[]) {
      if (!singleton.INSTANCE)
        singleton.INSTANCE = new target(...args);
      return singleton.INSTANCE;
    };
    singleton.INSTANCE = null;
    singleton.TOKENS = tokens;

    singleton.prototype = target.prototype;
    return singleton;
  };
};

export const Injector = new class {
  public resolve<T>(target: any): T {
    const tokens = target.TOKENS || Reflect.getMetadata("design:paramtypes", target) || [];
    const injections = tokens.map((token: any) => Injector.resolve<any>(token));

    return new target(...injections);
  }
}();
