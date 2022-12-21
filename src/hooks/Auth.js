/* import { useState } from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { dummyUser } from './dummyUser';

export const SignOutUser = async (auth) => {
  signOut(auth)
    .then((e) => {
      console.log('Signed Out' + e);
    })
    .catch((err) => {
      console.error(err.code + err.message + err.email);
    });
}; */

/* export const SignInUser = (auth, provider) => {
  // !This is login with google firebase.
  // signInWithPopup(auth, provider)
  //   .then(async (payload) => {
  //     console.log(payload);
  //     return payload.user;
  //   })
  //   .catch((err) => {
  //     console.error(err.code + err.message + err.email);
  //   }); 

  return dummyUser;
}; */
