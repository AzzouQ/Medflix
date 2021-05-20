import { auth, database } from './firebase';
// import { setFcm } from './fcm';

export const signIn = async (email: string, password: string) => {
  const { user } = await auth.signInWithEmailAndPassword(email, password);
  const date = +new Date();
  await database.ref(`/user/${user?.uid}`).update({ lastOnline: date });
  // await setFcm();
};

export const signOut = async () => {
  await auth.signOut();
};

export const signUp = async (name: string, email: string, password: string) => {
  const { user } = await auth.createUserWithEmailAndPassword(email, password);
  const date = +new Date();
  await database.ref(`/user/${user?.uid}`).set({
    name,
    creationDate: date,
    lastOnline: date,
    followerNb: 0,
    followers: [],
    following: [],
    followingNb: 0,
  });
  // await setFcm();
};
