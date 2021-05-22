import firebase from 'service/firebase';
import { t } from 'i18n';

export const translateError = ({ code }: firebase.auth.Error) => {
  return { field: 'email', message: t(`firebase.${code}`) };
};
