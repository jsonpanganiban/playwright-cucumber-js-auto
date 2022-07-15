export class Utils {
  static getSortDirection(arr) {
    const c = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i < arr.length; i++) {
      c.push(arr[i - 1].localeCompare(arr[i]));
    }

    if (c.every((n) => n <= 0)) return 'ascending';
    if (c.every((n) => n >= 0)) return 'descending';

    return 'unsorted';
  }
}
