import { db } from './index';

export const listUser = async (): Promise<string[]> => {
  const keys: string[] = [];
  const data = await (await db.ref(`/user/`).once('value')).val();
  Object.keys(data).forEach(function (key) {
    keys.push(key);
  });
  console.log(keys);
  return keys;
};
