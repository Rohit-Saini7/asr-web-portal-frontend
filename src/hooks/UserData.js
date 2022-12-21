import { collection, getDoc, setDoc } from 'firebase/firestore';

export const SetUserData = async (userId, userRecord) => {
  try {
    const docRef = await setDoc(
      doc(collection(db, 'userRecord'), userId),
      userRecord
    );
    return docRef.id;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const GetUserData = async (userId) => {
  try {
    const docRef = await getDoc(doc(collection(db, 'userRecord'), userId));
    return docRef;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
