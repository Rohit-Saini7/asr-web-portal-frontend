import axios from 'axios';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import moment from 'moment';
import { addDocs } from '../redux/slice/userSlice';

export const handleFileUpload = async (
  file,
  docName,
  sourceLang,
  targetLang,
  dispatch,
  collectionRef,
  cancelToken,
  setProgressData,
  tabSelected
) => {
  if (typeof cancelToken != typeof undefined) {
    cancelToken.cancel('Operation canceled due to new request.');
  }

  const formData = new FormData();
  formData.append('file', file);
  cancelToken = axios.CancelToken.source();
  try {
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_API_URL}/${tabSelected}`,
      withCredentials: false,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        source_language: sourceLang,
        destination_language: targetLang,
      },
      onUploadProgress: (p) => {
        setProgressData({
          done: parseInt(p.loaded / 1048576),
          total: parseInt(p.total / 1048576),
          progress: parseInt(p.progress * 100),
          rate: parseInt(p.rate / 1048576),
          estimated: parseInt(p.estimated),
        });
      },
      cancelToken: cancelToken.token,
    }).then(async function (response) {
      const creationTime = moment(Date().toLocaleString()).format(
        'MMM DD, YYYY | hh:mm A'
      );
      const data = {
        mediaName: file.name,
        docName: docName,
        language: `${sourceLang} | ${targetLang}`,
        creationTime: creationTime,
        modifyTime: creationTime,
        token: response.data,
        willGenerate: tabSelected,
        timestamp: serverTimestamp(),
      };
      await addDoc(collectionRef, data);
      dispatch(addDocs(data));
    });
  } catch (error) {
    console.error('Error from file upload: ', error);
  }

  //TODO: ✅ start file uploading with a visual indicator.
  //TODO: ✅ on success upload => show SUCCESS modal.
  //TODO: on !success upload => show ERROR modal.
};
