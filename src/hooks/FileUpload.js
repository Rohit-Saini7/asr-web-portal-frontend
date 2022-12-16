import axios from 'axios';
import { addDoc } from 'firebase/firestore';
import moment from 'moment';
import { addDocs } from '../redux/slice/userSlice';

export const handleFileUpload = async (
  file,
  docName,
  dispatch,
  collectionRef,
  cancelToken,
  setProgressData
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
      url: import.meta.env.VITE_API_URL,
      withCredentials: false,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (p) => {
        setProgressData({
          done: parseInt(p.loaded / 1024),
          total: parseInt(p.total / 1024),
          progress: parseInt(p.progress * 100),
          rate: parseInt(p.rate / 1024),
          estimated: parseInt(p.estimated),
        });
      },
      cancelToken: cancelToken.token,
    }).then(async function (response) {
      const creationTime = moment(Date().toLocaleString()).format(
        'MMM DD, YYYY | hh:mm A'
      );
      console.log(typeof response.data);
      const data = {
        mediaName: file.name,
        docName: docName,
        creationTime: creationTime,
        modifyTime: creationTime,
        token: response.data,
      };
      await addDoc(collectionRef, data);
      dispatch(addDocs(data));
    });
  } catch (error) {
    console.log('Error from file upload: ', error);
  }

  //TODO: ✅ start file uploading with a visual indicator.
  //TODO: ✅ on success upload => show SUCCESS modal.
  //TODO: on !success upload => show ERROR modal.
};
