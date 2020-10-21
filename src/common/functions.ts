// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

export function hash(text: string): string {
  return bcrypt.hashSync(text, 6, function(err, hash) {
    if (err) throw Error(err);
    return hash;
  });
}

export function compare(password: string, hash: string): boolean {
  return bcrypt.compare(password, hash, function(err, result) {
    if (err) throw Error(err);
    return result;
  });
}
