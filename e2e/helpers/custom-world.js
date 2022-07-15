// eslint-disable-next-line no-unused-vars
import { setWorldConstructor, World } from '@cucumber/cucumber';

export class CustomWorld extends World {
  // eslint-disable-next-line no-useless-constructor
  constructor(options) {
    super(options);
  }
}
