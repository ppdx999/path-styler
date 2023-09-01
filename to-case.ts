/**
 * This code is highly inspired by the following projects:
 * Link    : https://github.com/ianstormtaylor/to-case
 * License : MIT
 */

/**
 * Test whether a string is camel-case.
 */

const hasSpace = /\s/;
const hasSeparator = /(_|-|\.|:)/;
const hasCamel = /([a-z][A-Z]|[A-Z][a-z])/;

/**
 * Remove any starting case from a `string`, like camel or snake, but keep
 * spaces and punctuation that may be important otherwise.
 */

function toNoCase(string: string): string {
  if (hasSpace.test(string)) return string.toLowerCase();
  if (hasSeparator.test(string)) {
    return (unseparate(string) || string).toLowerCase();
  }
  if (hasCamel.test(string)) return uncamelize(string).toLowerCase();
  return string.toLowerCase();
}

/**
 * Separator splitter.
 */

const separatorSplitter = /[\W_]+(.|$)/g;

/**
 * Un-separate a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function unseparate(string: string): string {
  return string.replace(separatorSplitter, function (_m, next) {
    return next ? " " + next : "";
  });
}

/**
 * Camelcase splitter.
 */

const camelSplitter = /(.)([A-Z]+)/g;

/**
 * Un-camelcase a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function uncamelize(string: string): string {
  return string.replace(camelSplitter, function (_m, previous, uppers) {
    return previous + " " + uppers.toLowerCase().split("").join(" ");
  });
}

/**
 * Convert a `string` to space case.
 */
function toSpaceCase(string: string): string {
  return toNoCase(string)
    .replace(/[\W_]+(.|$)/g, function (_m, match) {
      return match ? " " + match : "";
    })
    .trim();
}

/**
 * Convert a `string` to camel case.
 */
export function toCamelCase(string: string): string {
  return toSpaceCase(string).replace(/\s(\w)/g, function (_m, letter) {
    return letter.toUpperCase();
  });
}

/**
 * Convert a `string` to snake case.
 */

export function toSnakeCase(string: string): string {
  return toSpaceCase(string).replace(/\s/g, "_");
}
