import { setWorldConstructor, World } from '@cucumber/cucumber';

export class CustomWorld extends World {
  count = 0;

  constructor(options) {
    super(options);
  }

  eat(count) {
    this.count += count;
  }
}
