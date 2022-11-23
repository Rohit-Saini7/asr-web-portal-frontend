import React from 'react';
import styled from 'styled-components';

const Login = () => {
  return (
    <Container>
      <InnerContainer>
        <LeftSection>
          <Heading>ASR Post Editor Tool</Heading>
          <SubHeadnig>
            Upload the Video or Audio file & get the Transcript and Translation.
          </SubHeadnig>
        </LeftSection>
        <RightSection>
          <Heading>Sign in</Heading>
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
            <CreateAccount>Sign Up</CreateAccount>
          </LinksWrapper>
          <SubmitButton>Sign in</SubmitButton>
          <GoogleButton>Sign in with Google</GoogleButton>
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
  height: 70%;
  width: 30%;
  background-color: #28292d;
  position: relative;
  border-radius: 10px;
  padding: 50px 40px;
  display: flex;
  flex-direction: column;
  box-shadow: -11px 11px 22px #161616, 11px -11px 22px #323232;
  /* background-color: var(--container-bg-color); */
  /* border: 1px solid var(--container-bg-color); */
`;

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
    background-color: var(--signin-color);
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
  color: #23242a;
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
  color: #8f8f8f;
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
  background-color: var(--signin-color);
  color: var(--background-color);
  padding: 11px 25px;
  width: 100%;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: -11px 11px 22px #161616, 11px -11px 22px #323232;
  &:active {
    translate: 0 2px;
  }
`;

const GoogleButton = styled(SubmitButton)`
  color: var(--signin-color);
  background-color: transparent;
  border: 1px solid var(--signin-color);
  margin-top: 20px;
`;
