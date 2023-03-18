export default{

  //okta data
  oidc: {
    //app client id - public identifier
    clientId: '0oa8ot2t69ACNM1xZ5d7',
    //dev environment - token issuer
    issuer:'https://dev-58117300.okta.com/oauth2/default',
    //redirect location
    redirectUri: 'http://localhost:4200/login/callback',
    //user info based in scope definition
    scopes: ['openid', 'profile', 'email']
  }


}
