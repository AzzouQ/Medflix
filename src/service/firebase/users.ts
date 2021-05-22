import { database } from './firebase';

export const listUser = async (): Promise<string[]> => {
  const keys: string[] = [];
  const data = await (await database.ref(`/users/`).once('value')).val();
  Object.keys(data).forEach(function (key) {
    keys.push(key);
  });
  console.log(keys);
  return keys;
};
