import firebase from 'service/firebase';
import { t } from 'i18n';

export const translateError = ({ code }: firebase.auth.Error) => {
  switch (code) {
    case 'auth/email-already-in-use':
    case 'auth/requires-recent-login':
    case 'auth/user-not-found':
    case 'auth/unauthorized-continue-uri':
    case 'auth/uid-already-exists':
    case 'auth/session-cookie-revoked':
    case 'auth/session-cookie-expired':
    case 'auth/reserved-claims':
    case 'auth/project-not-found':
    case 'auth/phone-number-already-exists':
    case 'auth/operation-not-allowed':
    case 'auth/missing-uid':
    case 'auth/missing-ios-bundle-id':
    case 'auth/missing-hash-algorithm':
    case 'auth/missing-continue-uri':
    case 'auth/missing-android-pkg-name':
    case 'auth/maximum-user-count-exceeded':
    case 'auth/invalid-user-import':
    case 'auth/invalid-uid':
    case 'auth/invalid-session-cookie-duration':
    case 'auth/invalid-provider-id':
    case 'auth/invalid-provider-data':
    case 'auth/invalid-photo-url':
    case 'auth/invalid-phone-number':
    case 'auth/invalid-password-salt':
    case 'auth/invalid-page-token':
    case 'auth/invalid-last-sign-in-time':
    case 'auth/invalid-id-token':
    case 'auth/invalid-hash-salt-separator':
    case 'auth/invalid-hash-rounds':
    case 'auth/invalid-hash-parallelization':
    case 'auth/invalid-hash-memory-cost':
    case 'auth/invalid-hash-key':
    case 'auth/invalid-hash-derived-key-length':
    case 'auth/invalid-hash-block-size':
    case 'auth/invalid-hash-algorithm':
    case 'auth/invalid-email-verified':
    case 'auth/invalid-email':
    case 'auth/invalid-dynamic-link-domain':
    case 'auth/invalid-display-name':
    case 'auth/invalid-disabled-field':
    case 'auth/invalid-credential':
    case 'auth/invalid-creation-time':
    case 'auth/invalid-continue-uri':
    case 'auth/invalid-claims':
    case 'auth/invalid-argument':
    case 'auth/internal-error':
    case 'auth/insufficient-permission':
    case 'auth/id-token-revoked':
    case 'auth/id-token-expired':
    case 'auth/email-already-exists':
    case 'auth/claims-too-large':
      return { field: 'email', message: t(`firebase.${code}`) };
    case 'auth/invalid-password-hash':
    case 'auth/invalid-password':
    case 'auth/weak-password':
      return { field: 'password', message: t(`firebase.${code}`) };
    default:
      return { field: 'email', message: t`firebase.unknown` };
  }
};
