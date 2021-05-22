import { UserType } from 'types';
import { database } from './firebase';

export const listUser = async (): Promise<string[]> => {
  const keys: string[] = [];
  const data = await (await database.ref(`/users/`).once('value')).val();
  if (!data)
    return []
  Object.keys(data).forEach(function (key) {
    keys.push(key);
  });
  console.log(keys);
  return keys;
};

export const listFollowers = async (uid: string | undefined): Promise<UserType[]> => {
  if (!uid) return []
  const data = await (await database.ref(`/users/${uid}/subscriptions`).once('value')).val();
  if (!data)
    return []
  return fetchUserData(data);
};

export const fetchUserData = async (uids: string[]): Promise<UserType[]> => {
const usersSnap = await database.ref(`/users`).get();
const users: { [key: string]: UserType } = usersSnap.val();
  const myUsers = uids.map((uid) => {
    users[uid as string].uid = uid
    return users[uid as string];
  });
  return myUsers
};
