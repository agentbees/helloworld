'use strict';

const crypto = require('node:crypto');

// scrypt is a memory-hard, salted one-way password KDF available in Node.
const KEY_LENGTH = 64;
const SCRYPT_OPTIONS = { N: 16384, r: 8, p: 1, maxmem: 32 * 1024 * 1024 };

function derive(password, salt) {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, KEY_LENGTH, SCRYPT_OPTIONS, (error, key) => {
      if (error) reject(error);
      else resolve(key.toString('hex'));
    });
  });
}

async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const digest = await derive(password, salt);
  return `scrypt$${salt}$${digest}`;
}

async function verifyPassword(password, encoded) {
  const [, salt, expected] = String(encoded).split('$');
  if (!salt || !expected) return false;
  const actual = await derive(password, salt);
  return crypto.timingSafeEqual(Buffer.from(actual, 'hex'), Buffer.from(expected, 'hex'));
}

module.exports = { hashPassword, verifyPassword };
