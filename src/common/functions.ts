// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

export function hash(text: string): string {
  return bcrypt.hashSync(text, 6, function(err, hash) {
    if (err) throw Error(err);
    return hash;
  });
}
