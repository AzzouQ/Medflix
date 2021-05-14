import { t } from '../i18n';
import firebase from './firebase';

const email = 'email';
const password = 'password';

const transFire = (error: firebase.auth.Error) => {
  const { code } = error;
  switch (code) {
    case 'auth/weak-password':
      return { field: password, message: t(`fire.${code}`) };
    case 'auth/email-already-in-use':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/requires-recent-login':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/user-not-found':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/unauthorized-continue-uri':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/uid-already-exists':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/session-cookie-revoked':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/session-cookie-expired':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/reserved-claims':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/project-not-found':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/phone-number-already-exists':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/operation-not-allowed':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/missing-uid':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/missing-ios-bundle-id':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/missing-hash-algorithm':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/missing-continue-uri':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/missing-android-pkg-name':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/maximum-user-count-exceeded':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/invalid-user-import':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/invalid-uid':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/invalid-session-cookie-duration':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/invalid-provider-id':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/invalid-provider-data':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/invalid-photo-url':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/invalid-phone-number':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/invalid-password-salt':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/invalid-password-hash':
      return { field: password, message: t(`fire.${code}`) };
    case 'auth/invalid-password':
      return { field: password, message: t(`fire.${code}`) };
    case 'auth/invalid-page-token':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/invalid-last-sign-in-time':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/invalid-id-token':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/invalid-hash-salt-separator':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/invalid-hash-rounds':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/invalid-hash-parallelization':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/invalid-hash-memory-cost':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/invalid-hash-key':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/invalid-hash-derived-key-length':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/invalid-hash-block-size':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/invalid-hash-algorithm':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/invalid-email-verified':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/invalid-email':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/invalid-dynamic-link-domain':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/invalid-display-name':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/invalid-disabled-field':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/invalid-credential':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/invalid-creation-time':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/invalid-continue-uri':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/invalid-claims':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/invalid-argument':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/internal-error':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/insufficient-permission':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/id-token-revoked':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/id-token-expired':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/email-already-exists':
      return { field: email, message: t(`fire.${code}`) };
    case 'auth/claims-too-large':
      return { field: email, message: t(`fire.${code}`) };
    default:
      return { field: email, message: t(`fire.unknown`) };
  }
};

export default transFire;
