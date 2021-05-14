import 'i18next';
import { resources } from '../i18n/i18n';

declare module 'i18next' {
  type DefaultResources = typeof resources['fr'];
  interface Resources extends DefaultResources {}
}
