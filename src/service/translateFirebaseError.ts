import firebase from 'firebase/app';
import 'firebase/auth';

const translateFirebaseError = (error: firebase.auth.Error) => {
  console.log(error);
  if (error.code === 'auth/email-already-in-use')
    return {
      field: 'email',
      message: 'This email is already taken',
    };
  if (error.code === 'auth/user-not-found')
    return {
      field: 'email',
      message: 'The email and the password does not match',
    };
  if (error.code === 'auth/weak-password')
    return {
      field: 'password',
      message: 'The password must be at least 6 characters',
    };
  return {
    field: 'password',
    message: 'Uknown error',
  };
};

export default translateFirebaseError;
