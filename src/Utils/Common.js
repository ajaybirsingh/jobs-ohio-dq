const config = {
    clientId: "0oaez4a6k38GCrsto5d7",
    issuer: "https://dev-50224363.okta.com",
    redirectUri: `${window.location.origin}/login/callback`,
    scopes: ['openid', 'profile', 'email', 'offline_access'],
    pkce: true,
}
var OktaAuth = require('@okta/okta-auth-js').OktaAuth;
export const authClient = new OktaAuth(config)