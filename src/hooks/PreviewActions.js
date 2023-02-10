import axios from 'axios';
import { convertXML } from 'simple-xml-to-json';
import { addError, changeStatus } from '../redux/slice/errorSlice';

export const handlePreview = (
  callType,
  token,
  setPreviewData,
  setIsPending,
  dispatch
) => {
  if (callType === 'TTS') {
    setIsPending(() => ({ status: true, name: callType }));
    return;
  }

  const URL = `${import.meta.env.VITE_API_URL}/${callType}/${token}`;

  axios({
    method: 'get',
    url: URL,
  })
    .then(function (response) {
      if (response.data === 'SUCCESS') {
        axios({
          method: 'get',
          url: `${URL}/result`,
        })
          .then(function (res) {
            const { transcript } = convertXML(res.data);
            let fileContent = '';
            transcript.children.forEach(({ line }) => {
              let lineContent = '';
              line.children.forEach(({ word }) => {
                if (!!word.content) lineContent += ` ${word.content}`;
              });
              fileContent += `[${line.speaker}] ${lineContent} [${line.timestamp}]\n`;
            });
            setPreviewData(fileContent);
          })
          .catch(function (error) {
            dispatch(addError(err));
            dispatch(changeStatus(true));
          });
      } else if (response.data === 'FAILURE') {
        const err = {
          name: 'File Generation Error',
          message: 'Server failed to generate Translation.',
          code: 'FILE_GEN_FAILURE',
        };
        dispatch(addError(err));
        dispatch(changeStatus(true));
      } else {
        setIsPending(() => ({ status: true, name: callType }));
        setTimeout(() => {
          setIsPending(() => ({ status: false, name: callType }));
        }, 10000);
      }
    })
    .catch(function (err) {
      dispatch(addError(err));
      dispatch(changeStatus(true));
    });
};

export const handleDownload = (
  callType,
  docName,
  token,
  setIsPending,
  dispatch
) => {
  const URL = `${import.meta.env.VITE_API_URL}/${callType}/${token}`;

  axios({
    method: 'get',
    url: URL,
  })
    .then(function (response) {
      if (response.data === 'SUCCESS') {
        axios({
          method: 'get',
          url: `${URL}/result`,
          responseType: 'blob',
        })
          .then(function (res) {
            console.log(res.headers);
            const fileURL = window.URL.createObjectURL(res.data);
            let alink = document.createElement('a');
            alink.href = fileURL;
            if (callType !== 'TTS')
              alink.download = `${callType}_${docName}.xml`;
            else alink.download = `${callType}_${docName}.mp3`;
            alink.click();
          })
          .catch(function (err) {
            dispatch(addError(err));
            dispatch(changeStatus(true));
          });
      } else if (response.data === 'FAILURE') {
        const err = {
          name: 'File Generation Error',
          message: 'Server failed to generate Translation.',
          code: 'FILE_GEN_FAILURE',
        };
        dispatch(addError(err));
        dispatch(changeStatus(true));
      } else {
        setIsPending(() => ({ status: true, name: callType }));
        setTimeout(() => {
          setIsPending(() => ({ status: false, name: callType }));
        }, 10000);
      }
    })
    .catch(function (err) {
      dispatch(addError(err));
      dispatch(changeStatus(true));
    });
};
