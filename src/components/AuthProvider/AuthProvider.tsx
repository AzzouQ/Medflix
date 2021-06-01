import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import firebase, { auth, database } from 'service/firebase';
import { userActions } from 'slices';

const AuthProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initUser = async (currentUser: firebase.User) => {
      const user = await database.ref(`/users/${currentUser!.uid}`).get();
      dispatch(
        userActions.initUser({
          user: { ...user.val(), uid: currentUser!.uid },
        })
      );
    };
    return auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        initUser(currentUser);
      } else dispatch(userActions.resetUser());
    });
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
