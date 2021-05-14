const gravatar = require('gravatar-api').default;

declare module 'gravatar-api' {
  export default gravatar as GravatarAPI;
}
