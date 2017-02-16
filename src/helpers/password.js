import CryptoJS from 'crypto-js';

const SaltLength = 16;

const createHash = (password) => {
  const salt = generateSalt(SaltLength),
        hash = hmacSHA256(password + salt);
  return salt + hash;
};

const validateHash = (hash, password) => {
  const salt      = hash.substr(0, SaltLength),
        validHash = salt + hmacSHA256(password + salt);
  return hash === validHash;
};

const generateSalt = (len) => {
  const set    = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ',
        setLen = set.length;
  let salt = '';
  for (let i = 0; i < len; i++) {
    let p = Math.floor(Math.random() * setLen);
    salt += set[p];
  }
  return salt;
};

const hmacSHA256 = (string) => {
  return CryptoJS.HmacSHA256(string, '4M3R1K44N2_-_R4MM3N').toString();
};

export {
  createHash,
  validateHash
};