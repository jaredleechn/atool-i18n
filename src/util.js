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

export function isRelative(filepath) {
  return filepath.charAt(0) === '.';
}

export function isAbsolute(filepath) {
  return filepath.charAt(0) === '/';
}

export function isProvided(filepath) {
  return existsSync(join(__dirname, 'plugins', `${filepath}.js`));
}

export function format(target) {
  if (Array.isArray(target)) {
    return target.map(value => ({ value }));
  }
  const keys = Object.keys(target);
  return keys.map(item => ({
    value: target[item],
    name: `${target[item]} - from ${item}`,
  }));
}

export async function select(target, message) {
  if (typeof(target) === 'string') {
    return target;
  }
  const answer = await(inquirer.prompt({
    name: 'value',
    type: 'list',
    message,
    choices: format(target),
  }));
  return answer.value;
}
