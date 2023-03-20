import jwtDecode from 'jwt-decode';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';

import { db } from '../Firebase';
import { addUser, setDocs } from '../redux/slice/userSlice';

export const handleGoogleSignIn = async (res, dispatch) => {
  const data = jwtDecode(res.credential);

  const userSnap = await getDoc(doc(db, 'usersList', data.email));
  if (userSnap.exists()) {
    const q = query(
      collection(db, 'usersList', data.email, 'docs'),
      orderBy('timestamp', 'desc')
    );
    const docSnap = await getDocs(q);

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
