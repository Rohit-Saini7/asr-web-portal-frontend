import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CustomDropdown from '../components/CustomDropdown';
import { UploadIcon } from '../components/Icons';
import ProgressModal from '../components/ProgressModal';

const Home = () => {
  const fileRef = useRef();
  const docNameRef = useRef();
  const sourceLangRef = useRef();
  const targetLangRef = useRef();
  const errorRef = useRef();
  const submitButtonRef = useRef();
  let cancelToken;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progressData, setProgressData] = useState({
    done: 0,
    total: 0,
    progress: 0,
    rate: 0,
    estimated: 0,
  });

  const handleFileChange = (e) => {
    if (!!e.target.files)
      document.getElementById('file-name').innerHTML = e.target.files[0].name;
  };

  const handleSubmit = async () => {
    if (
      !!fileRef.current.files[0] &&
      !!docNameRef.current.value &&
      !!sourceLangRef.current.value &&
      !!targetLangRef.current.value
    ) {
      setIsModalOpen(true);
      const formData = new FormData();
      formData.append('file', fileRef.current.files[0]);

      if (typeof cancelToken != typeof undefined) {
        cancelToken.cancel('Operation canceled due to new request.');
      }

      cancelToken = axios.CancelToken.source();
      try {
        await axios({
          method: 'post',
          url: 'https://udaaniitb.aicte-india.org:8000/asr/transcript',
          withCredentials: false,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (p) => {
            /*p = {
              "loaded": 1736142,
              "total": 8301209,
              "progress": 0.2091432705766112,
              "bytes": 425984,
              "rate": 114384,
              "estimated": 57.39497657014967,
              "event": {
                "isTrusted": true
              },
              "upload": true
            } */
            setProgressData({
              done: parseInt(p.loaded / 1024),
              total: parseInt(p.total / 1024),
              progress: parseInt(p.progress * 100),
              rate: parseInt(p.rate / 1024),
              estimated: parseInt(p.estimated),
            });
          },
          cancelToken: cancelToken.token,
        })
          .then(function (response) {
            console.log(JSON.stringify(response.data));

            //* This block reset the form.
            fileRef.current.value = null;
            docNameRef.current.value = null;
            sourceLangRef.current.value = null;
            targetLangRef.current.value = null;
            document.getElementById('file-name').innerHTML = null;
            document
              .querySelectorAll('.valid')
              .forEach((box) => box.classList.remove('valid'));

            //* This block reset the form.
          })
          .catch(function (error) {
            console.log(error.message);
          });
      } catch (error) {
        console.log('error from try-catch: ', error);
      }

      //TODO: start file uploading with a visual indicator.
      //TODO: on success upload => show SUCCESS modal.
      //TODO: on !success upload => show ERROR modal.
    } else {
      errorRef.current.innerHTML =
        (!fileRef.current.files[0] ? 'Media file is Missing. \n' : '') +
        (!docNameRef.current.value ? 'Document Name is Missing. \n' : '') +
        (!sourceLangRef.current.value ? 'Source Language is Missing. \n' : '') +
        (!targetLangRef.current.value ? 'Target Language is Missing. \n' : '');
    }
  };

  return (
    <React.Fragment>
      {isModalOpen && (
        <ProgressModal
          progressData={progressData}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <Container>
        <Heading>ASR Post Editor Tool</Heading>
        <Instructions aria-label='Instructions:'>
          <li>File name should be greater than 5 characters.</li>
          <li>Audio or Video name shouldn&#39;t contain any white spaces.</li>
          <li>
            First upload the Audio or Video file, then enter other fields.
          </li>
          <li>
            Uploading Audio or Video file size should be less than{' '}
            <strong>
              <em>1024 MB</em>
            </strong>
            .
          </li>
        </Instructions>
        <ErrorMessage ref={errorRef}></ErrorMessage>
        <InnerContainer>
          <InputWrapper>
            <FileInput
              type='file'
              name='file-7'
              id='file-7'
              accept='video/*, audio/*'
              onChange={handleFileChange}
              ref={fileRef}
            />
            <FileInputLabel htmlFor='file-7'>
              <strong>
                <UploadIcon />
                Choose a file…
              </strong>
              <span id='file-name'></span>
            </FileInputLabel>
          </InputWrapper>
          <InputWrapper>
            <InputField type='text' required='required' ref={docNameRef} />
            <InputLabel>Document Name</InputLabel>
            <i></i>
          </InputWrapper>
          <InputWrapper>
            <CustomDropdown
              inputClass='sourcelang'
              wrapperClass='sourceDropdown'
              options={['English', 'Hindi', 'Tamil', 'Telgu']}
              label='Select Source Language'
              langRef={sourceLangRef}
            />
          </InputWrapper>
          <InputWrapper>
            <CustomDropdown
              inputClass='targetlang'
              wrapperClass='targetDropdown'
              options={['English', 'Hindi', 'Tamil', 'Telgu']}
              label='Select Target Language'
              langRef={targetLangRef}
            />
          </InputWrapper>
          <SubmitButton onClick={handleSubmit} ref={submitButtonRef}>
            Convert
          </SubmitButton>
        </InnerContainer>
      </Container>
    </React.Fragment>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  text-align: center;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  margin-top: 2rem;
  width: fit-content;
  align-self: center;
`;

const Instructions = styled.ul`
  width: 100%;
  max-width: fit-content;
  align-self: center;
  margin-top: 2rem;
  text-align: justify;
  background-color: var(--instructions-color);
  padding: 20px;
  padding-left: 40px;
  border-radius: 10px;
  box-shadow: var(--shadow);

  &:before {
    content: attr(aria-label);
    font-size: 1.2rem;
    font-weight: 700;
    margin-left: -15px;
  }
`;

const ErrorMessage = styled.h3`
  margin: 20px;
  font-size: 2rem;
  height: 3rem;
  color: var(--error-color);
`;

const InnerContainer = styled.div`
  max-width: 1350px;
  width: 100%;
  background: var(--signin-bg-color);
  position: relative;
  border-radius: 10px;
  padding: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  flex-direction: column;
  box-shadow: var(--shadow);
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
    background: var(--signin-color);
    border-radius: 4px;
    transition: 0.5s;
    pointer-events: none;
  }
`;

const FileInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const FileInputLabel = styled.label`
  border: 1px solid var(--signin-color);
  background-color: transparent;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  color: var(--signin-color);
  font-size: 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-around;
  overflow: hidden;
  padding: 5px 1.25rem;
  & > span {
    width: 60%;
    max-width: 20vw;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  & > strong {
    color: var(--background-color);
    background-color: var(--signin-color);
    padding: 5px 25px;
    border-radius: 10px;
    display: inline-block;
    font-size: 1.25rem;
    font-weight: 600;
    transition: 0.2s;
    box-shadow: var(--shadow);
    &:active {
      translate: 0 2px;
    }
  }

  svg {
    margin-right: 5px;
    height: 16px;
    width: 16px;
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

const SubmitButton = styled.button`
  margin: auto;
  border: none;
  outline: none;
  background: var(--signin-color);
  color: var(--background-color);
  padding: 11px 25px;
  width: 100%;
  max-width: fit-content;
  align-self: center;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: var(--shadow);
  grid-column: 1/-1;
  &:hover {
    translate: 0 -2px;
  }
  &:active {
    translate: 0 2px;
  }
`;
