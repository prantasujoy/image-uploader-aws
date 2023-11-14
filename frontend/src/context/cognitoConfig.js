import { CognitoUserPool } from "amazon-cognito-identity-js";

var poolData = {
  UserPoolId: process.env.REACT_APP_COGNITO_POOL_ID,
  ClientId: process.env.REACT_APP_COGNITO_APP_CLIENT_ID,
};
var userPool = new CognitoUserPool(poolData);

export default userPool;
