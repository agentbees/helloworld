'use strict';

const crypto = require('node:crypto');
const KEY_LENGTH = 64;
const SCRYPT_OPTIONS = { N: 16384, r: 8, p: 1, maxmem: 32 * 1024 * 1024 };

function derive(password, salt) {
  return new Promise((resolve, reject) => crypto.scrypt(password, salt, KEY_LENGTH, SCRYPT_OPTIONS, (error, key) => error ? reject(error) : resolve(key)));
}

async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  return `scrypt$${salt}$${(await derive(password, salt)).toString('hex')}`;
}

async function verifyPassword(password, encoded) {
  const [, salt, expectedHex] = String(encoded).split('$');
  if (!salt || !expectedHex || !/^[0-9a-f]+$/i.test(expectedHex)) return false;
  const actual = await derive(password, salt);
  const expected = Buffer.from(expectedHex, 'hex');
  return expected.length === actual.length && crypto.timingSafeEqual(actual, expected);
}

module.exports = { hashPassword, verifyPassword };
