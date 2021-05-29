import React, { useEffect } from 'react';
import EditProfileForm from './EditProfileForm';
import { userActions, userSelectors, UserState } from 'slices/user.slice';
import firebase, { auth, database } from 'service/firebase';

import type { FormikType } from 'types';
import { useDispatch, useSelector } from 'react-redux';

export declare namespace EditProfileType {
  type FormProps = {
    user: UserState | undefined;
    setModalOpen: (value: boolean) => void;
  };
}

type Props = {
  setModalOpen: (value: boolean) => void;
};

const EditProfileFormContainer: React.FC<Props> = ({ setModalOpen }) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.getUser);

  useEffect(() => {
    const initUser = async (currentUser: firebase.User) => {
      const user = await database.ref(`/users/${currentUser!.uid}`).get();
      dispatch(
        userActions.initUser({ user: { ...user.val(), uid: currentUser!.uid } })
      );
    };
    !user &&
      auth.onAuthStateChanged((currentUser) => {
        if (currentUser) {
          initUser(currentUser);
        }
      });
  }, [dispatch, user]);

  return <EditProfileForm {...{ user, setModalOpen }} />;
};

export default EditProfileFormContainer;
