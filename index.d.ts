/*
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 */

export declare const Component: () => ClassDecorator;
export declare const Singleton: () => ClassDecorator;

export class Injector {
  static resolve<T>(target: any): T;
}
