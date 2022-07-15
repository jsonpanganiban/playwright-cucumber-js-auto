const rimraf = require('rimraf');

export const removeFiles = (path) => {
  rimraf.sync(path);
};
