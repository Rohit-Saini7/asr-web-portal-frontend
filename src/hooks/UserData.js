import { collection, getDoc, setDoc } from 'firebase/firestore';

export const SetUserData = async (userId, userRecord) => {
  try {
    const docRef = await setDoc(
      doc(collection(db, 'userRecord'), userId),
      userRecord
    );
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const GetUserData = async (userId) => {
  try {
    const docRef = await getDoc(doc(collection(db, 'userRecord'), userId));
    console.log('Document written with ID: ', docRef.id);
    return docRef;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
