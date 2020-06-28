import {createHash} from 'crypto';

const cryptoHash = createHash('sha1');

export const sha1 = (text: string) => {
  cryptoHash.update(text);
  return cryptoHash.digest('hex').toUpperCase();
}
