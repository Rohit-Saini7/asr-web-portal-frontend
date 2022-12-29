import axios from 'axios';
import { convertXML } from 'simple-xml-to-json';

export const handlePreview = (
  callType,
  token,
  setPreviewData,
  setIsPending
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
            const data = res.data;
            const { transcript } = convertXML(data);
            let fileContent = '';
            transcript.children.forEach(({ line }) => {
              let lineContent = '';
              line.children.forEach(({ word }) => {
                if (!!word.content && !!word.is_valid)
                  lineContent += ` ${word.content}`;
              });
              fileContent += `[${line.speaker}] ${lineContent} [${line.timestamp}]\n`;
            });
            setPreviewData(fileContent);
          })
          .catch(function (error) {
            console.error(error);
          });
      } else {
        setIsPending(() => ({ status: true, name: callType }));
        setTimeout(() => {
          setIsPending(() => ({ status: false, name: callType }));
        }, 10000);
      }
    })
    .catch(function (error) {
      console.error(error);
    });
};

export const handleDownload = (callType, docName, token, setIsPending) => {
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
          responseType: 'blob',
        })
          .then(function (res) {
            const fileURL = window.URL.createObjectURL(res.data);
            let alink = document.createElement('a');
            alink.href = fileURL;
            alink.download = `${callType}_${docName}.xml`;
            alink.click();
          })
          .catch(function (error) {
            console.error(error);
          });
      } else {
        setIsPending(() => ({ status: true, name: callType }));
        setTimeout(() => {
          setIsPending(() => ({ status: false, name: callType }));
        }, 10000);
      }
    })
    .catch(function (error) {
      console.error(error);
    });
};
