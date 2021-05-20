import firebase from 'service/firebase';
import { t } from 'i18n';

type FieldsType = {
  email?: 'email';
  password?: 'password';
  name?: 'name';
};

const translateFirebaseError = ({ code }: firebase.auth.Error) => {
  const { email, password }: FieldsType = {
    email: 'email',
    password: 'password',
  };
  const firebaseError = t`firebase.${code}`;

  switch (code) {
    case 'auth/weak-password':
      return { field: password, message: firebaseError };
    case 'auth/email-already-in-use':
      return { field: email, message: firebaseError };
    case 'auth/requires-recent-login':
      return { field: email, message: firebaseError };
    case 'auth/user-not-found':
      return { field: email, message: firebaseError };
    case 'auth/unauthorized-continue-uri':
      return { field: email, message: firebaseError };
    case 'auth/uid-already-exists':
      return { field: email, message: firebaseError };
    case 'auth/session-cookie-revoked':
      return { field: email, message: firebaseError };
    case 'auth/session-cookie-expired':
      return { field: email, message: firebaseError };
    case 'auth/reserved-claims':
      return { field: email, message: firebaseError };
    case 'auth/project-not-found':
      return { field: email, message: firebaseError };
    case 'auth/phone-number-already-exists':
      return { field: email, message: firebaseError };
    case 'auth/operation-not-allowed':
      return { field: email, message: firebaseError };
    case 'auth/missing-uid':
      return { field: email, message: firebaseError };
    case 'auth/missing-ios-bundle-id':
      return { field: email, message: firebaseError };
    case 'auth/missing-hash-algorithm':
      return { field: email, message: firebaseError };
    case 'auth/missing-continue-uri':
      return { field: email, message: firebaseError };
    case 'auth/missing-android-pkg-name':
      return { field: email, message: firebaseError };
    case 'auth/maximum-user-count-exceeded':
      return { field: email, message: firebaseError };
    case 'auth/invalid-user-import':
      return { field: email, message: firebaseError };
    case 'auth/invalid-uid':
      return { field: email, message: firebaseError };
    case 'auth/invalid-session-cookie-duration':
      return { field: email, message: firebaseError };
    case 'auth/invalid-provider-id':
      return { field: email, message: firebaseError };
    case 'auth/invalid-provider-data':
      return { field: email, message: firebaseError };
    case 'auth/invalid-photo-url':
      return { field: email, message: firebaseError };
    case 'auth/invalid-phone-number':
      return { field: email, message: firebaseError };
    case 'auth/invalid-password-salt':
      return { field: email, message: firebaseError };
    case 'auth/invalid-password-hash':
      return { field: password, message: firebaseError };
    case 'auth/invalid-password':
      return { field: password, message: firebaseError };
    case 'auth/invalid-page-token':
      return { field: email, message: firebaseError };
    case 'auth/invalid-last-sign-in-time':
      return { field: email, message: firebaseError };
    case 'auth/invalid-id-token':
      return { field: email, message: firebaseError };
    case 'auth/invalid-hash-salt-separator':
      return { field: email, message: firebaseError };
    case 'auth/invalid-hash-rounds':
      return { field: email, message: firebaseError };
    case 'auth/invalid-hash-parallelization':
      return { field: email, message: firebaseError };
    case 'auth/invalid-hash-memory-cost':
      return { field: email, message: firebaseError };
    case 'auth/invalid-hash-key':
      return { field: email, message: firebaseError };
    case 'auth/invalid-hash-derived-key-length':
      return { field: email, message: firebaseError };
    case 'auth/invalid-hash-block-size':
      return { field: email, message: firebaseError };
    case 'auth/invalid-hash-algorithm':
      return { field: email, message: firebaseError };
    case 'auth/invalid-email-verified':
      return { field: email, message: firebaseError };
    case 'auth/invalid-email':
      return { field: email, message: firebaseError };
    case 'auth/invalid-dynamic-link-domain':
      return { field: email, message: firebaseError };
    case 'auth/invalid-display-name':
      return { field: email, message: firebaseError };
    case 'auth/invalid-disabled-field':
      return { field: email, message: firebaseError };
    case 'auth/invalid-credential':
      return { field: email, message: firebaseError };
    case 'auth/invalid-creation-time':
      return { field: email, message: firebaseError };
    case 'auth/invalid-continue-uri':
      return { field: email, message: firebaseError };
    case 'auth/invalid-claims':
      return { field: email, message: firebaseError };
    case 'auth/invalid-argument':
      return { field: email, message: firebaseError };
    case 'auth/internal-error':
      return { field: email, message: firebaseError };
    case 'auth/insufficient-permission':
      return { field: email, message: firebaseError };
    case 'auth/id-token-revoked':
      return { field: email, message: firebaseError };
    case 'auth/id-token-expired':
      return { field: email, message: firebaseError };
    case 'auth/email-already-exists':
      return { field: email, message: firebaseError };
    case 'auth/claims-too-large':
      return { field: email, message: firebaseError };
    default:
      return { field: email, message: t`firebase.unknown` };
  }
};

export default translateFirebaseError;
