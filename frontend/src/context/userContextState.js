import React from "react";
import UserContext from "./userContext";
import userPool from "./cognitoConfig";

import {
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoUser,
} from "amazon-cognito-identity-js";
import { useState } from "react";

const UserContextState = ({ children }) => {
  const [session, setSession] = useState({ current_user: "", accessToken: "" });

  const signUp = async (username, password, email) => {
    return new Promise((resolve, reject) => {
      var attributeList = [];

      var userName = {
        Name: "name",
        Value: username,
      };

      var userEmail = {
        Name: "email",
        Value: email,
      };

      var attributeEmail = new CognitoUserAttribute(userEmail);
      var attributeName = new CognitoUserAttribute(userName);

      attributeList.push(attributeEmail);
      attributeList.push(attributeName);

      userPool.signUp(
        username,
        password,
        attributeList,
        null,
        function (err, result) {
          if (err) {
            console.log({ err });
            reject(err);
          } else {
            resolve("Registration Successful");
          }
        }
      );
    });
  };

  const getSession = async () => {
    return new Promise((resolve, reject) => {
      const user = userPool.getCurrentUser();

      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject();
          } else {
            resolve(session);
          }
        });
      } else {
        reject();
      }
    });
  };

  const authenticate = async (username, password) => {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: username,
        Pool: userPool,
      });

      const authDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (result) => {
          var accessToken = result.getAccessToken().getJwtToken();
          var logged_in_user = userPool.getCurrentUser().username;

          setSession((prev) => ({
            ...prev,
            current_user: logged_in_user,
            accessToken: accessToken,
          }));

          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
        newPasswordRequired: (data) => {
          resolve(data);
        },
      });
    });
  };

  const logOut = () => {
    const user = userPool.getCurrentUser();

    if (user) {
      user.signOut();
      setSession((prev) => ({
        ...prev,
        current_user: "",
        accessToken: "",
      }));
    }
  };

  return (
    <UserContext.Provider
      value={{ signUp, authenticate, logOut, session, setSession, getSession }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextState;
