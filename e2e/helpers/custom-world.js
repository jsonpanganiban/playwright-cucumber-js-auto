import { World, setWorldConstructor } from '@cucumber/cucumber';

export class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.debug = false;
  }
}
setWorldConstructor(CustomWorld);
