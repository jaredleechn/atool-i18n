import { existsSync } from 'fs';
import { join } from 'path';
import inquirer from 'inquirer';

export function arrayToObject(arr, key) {
  return arr.reduce((collection, current) => ({
    ...collection,
    [current[key]]: {
      ...current,
    },
  }), {});
}

export function objectToArray(obj, key) {
  return Object.keys(obj).map(each => ({
    value: obj[each],
    [key]: each,
  }));
}

export function isRelative(filepath) {
  return filepath.charAt(0) === '.';
}

export function isAbsolute(filepath) {
  return filepath.charAt(0) === '/';
}

export function isProvided(filepath) {
  return existsSync(join(__dirname, 'plugins', `${filepath}.js`));
}

export function format(target, prefix) {
  const before = prefix || '';
  if (Array.isArray(target)) {
    return target.reduce((collection, item) => ({
      ...collection,
      [`${item} - ${before}`]: item,
    }), {});
  } else if (target && target.constructor === Object) {
    return Object.keys(target).reduce((collection, key) => ({
      ...collection,
      [`${target[key]} - ${before} ${key}`]: target[key],
    }), {});
  }
  return {
    [`${target} - ${before}`]: target,
  };
}

export async function select(target, message) {
  const answer = await (inquirer.prompt({
    name: 'value',
    type: 'list',
    message,
    choices: objectToArray(target, 'name'),
  }));
  return answer.value;
}
