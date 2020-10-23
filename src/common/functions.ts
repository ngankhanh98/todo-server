import * as jwt from 'jsonwebtoken';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

export function hash(text: string): string {
  return bcrypt.hashSync(text, 6, async function(err, hash) {
    if (err) throw Error(err.message);
    return hash;
  });
}

export async function compare(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

export function verify(token: string, passphrase: string): any {
  return jwt.verify(token, passphrase, function(err, decoded): any {
    if (err) throw new Error(err.message);
    return decoded;
  });
}
