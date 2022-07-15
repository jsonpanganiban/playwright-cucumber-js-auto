// eslint-disable-next-line no-unused-vars
import { setWorldConstructor, World } from '@cucumber/cucumber';

export class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.debug = false;
  }
}
setWorldConstructor(CustomWorld);
