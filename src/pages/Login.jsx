import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';

import { db } from '../Firebase';
import { addUser, setDocs } from '../redux/slice/userSlice';
import jwtDecode from 'jwt-decode';

const Login = () => {
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        '796598186652-600nrc4c4q9669lu69097hjjehtb4bv4.apps.googleusercontent.com',
      callback: handleGoogleSignIn,
    });
    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      size: 'large',
    });
  }, []);

  const user = useSelector((state) => state.userState.user);
  const dispatch = useDispatch();

  const handleGoogleSignIn = async (res) => {
    const data = jwtDecode(res.credential);

    const userSnap = await getDoc(doc(db, 'usersList', data.email));
    if (userSnap.exists()) {
      const docSnap = await getDocs(
        collection(db, 'usersList', data.email, 'docs')
      );
      const allDocs = [];
      docSnap.forEach((doc) => {
        allDocs.push(doc.data());
      });
      !!docSnap.size && dispatch(setDocs(allDocs));
    } else {
      await setDoc(doc(db, 'usersList', data.email), {
        data: data.email,
      });
    }
    dispatch(addUser(data));
  };

  return (
    <Container>
      {!!user && !!Object.keys(user).length && <Navigate to='/home' />}
      <InnerContainer>
        <LeftSection>
          <Heading>ASR Post Editor Tool</Heading>
          <SubHeadnig>
            Upload the Video or Audio file & get the Transcript and Translation.
          </SubHeadnig>
        </LeftSection>
        <RightSection>
          <Heading>Sign in</Heading>
          <GoogleButton id='signInDiv'></GoogleButton>
        </RightSection>
      </InnerContainer>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  user-select: none;
`;

const InnerContainer = styled.div`
  height: 70vh;
  max-width: 1350px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const LeftSection = styled.section`
  text-align: center;
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  text-align: center;
`;

const SubHeadnig = styled.p`
  font-size: 1.2rem;
`;

const RightSection = styled.section`
  height: max-content;
  width: 30%;
  background: var(--signin-bg-color);
  position: relative;
  border-radius: 10px;
  padding: 50px 40px;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow);
`;

const GoogleButton = styled.div`
  border-radius: 5px;
  transition: 0.2s;
  border: 1px solid var(--signin-color);
  margin-top: 20px;
  box-shadow: var(--shadow);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &::after {
    z-index: 0;
    content: 'Sign In With Google';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border: none;
    outline: none;
    font-size: 1rem;
    font-weight: 600;
    width: max-content;
  }
  &:hover {
    translate: 0 -2px;
  }
  &:active {
    translate: 0 2px;
  }
  & > div,
  & > div > div,
  & > div > div > iframe {
    width: 100% !important;
  }
  & > div > div > iframe {
    visibility: hidden !important;
    margin: 0 !important;
  }
`;

/* 
  const handleGoogleSignIndone = async () => {
    const userSnap = await getDoc(doc(db, 'usersList', data.email));
    if (userSnap.exists()) {
      const docSnap = await getDocs(
        collection(db, 'usersList', data.email, 'docs')
      );
      const allDocs = [];
      docSnap.forEach((doc) => {
        // console.log(doc.id, ' => ', doc.data());
        allDocs.push(doc.data());
        // console.log(allDocs);
      });
      !!docSnap.size && dispatch(setDocs(allDocs));
    } else {
      console.log('No such document!');
      await setDoc(doc(db, 'usersList', data.email), {
        name: data.email,
      });
      await addDoc(db, 'usersList', data.email, 'docs', {});
    }
    dispatch(addUser(data));
  };


  <InputWrapper>
    <InputField type='text' required='required' />
    <InputLabel>Email</InputLabel>
    <i></i>
  </InputWrapper>
  <InputWrapper>
    <InputField type='password' required='required' />
    <InputLabel>Password</InputLabel>
    <i></i>
  </InputWrapper>
  <LinksWrapper>
    <ForgetPassword>Forget Password</ForgetPassword>
    <CreateAccount>Create Account</CreateAccount>
  </LinksWrapper>
  <SubmitButton>Sign in</SubmitButton> 



const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 35px;
  & > i {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: var(--signin-color);
    border-radius: 4px;
    transition: 0.5s;
    pointer-events: none;
  }
`;

const InputField = styled.input`
  position: relative;
  width: 100%;
  padding: 20px 10px 10px;
  background: transparent;
  border: none;
  outline: none;
  color: var(--signin-bg-color);
  font-size: 1rem;
  letter-spacing: 0.1rem;
  z-index: 10;

  &:valid ~ span,
  &:focus ~ span {
    color: var(--signin-color);
    transform: translateY(-34px);
    font-size: 0.9rem;
  }
  &:valid ~ i,
  &:focus ~ i {
    height: 44px;
  }
`;

const InputLabel = styled.span`
  position: absolute;
  left: 0;
  padding: 20px 0px 10px;
  font-size: 1rem;
  color: var(--label-color);
  pointer-events: none;
  letter-spacing: 0.1rem;
  transition: 0.5s;
`;

const LinksWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ForgetPassword = styled.a`
  margin: 10px 0;
  font-size: 1rem;
  color: var(--font-color);
  text-decoration: none;
  cursor: pointer;
  transition: 0.2s;
  border-bottom: 1px solid transparent;
  &:hover {
    color: var(--signin-color);
    border-bottom: 1px solid var(--signin-color);
  }
`;

const CreateAccount = styled.a`
  margin: 10px 0;
  font-size: 1rem;
  color: var(--signin-color);
  text-decoration: none;
  cursor: pointer;
  border-bottom: 1px solid transparent;
  transition: 0.2s;
  &:hover {
    border-bottom: 1px solid var(--signin-color);
  }
`;

const SubmitButton = styled.button`
  border: none;
  outline: none;
  background: var(--signin-color);
  color: var(--background-color);
  padding: 11px 25px;
  width: 100%;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: var(--shadow);
  &:hover {
    translate: 0 -2px;
  }
  &:active {
    translate: 0 2px;
  }
`; 
*/
