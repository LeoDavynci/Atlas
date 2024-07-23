import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore"
import { db } from "@/firebase/firebase"

const generateRandomID = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomID = "";
  
    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomID += characters.charAt(randomIndex);
    }
    return randomID;
};
  
export const createData = async (collectionName, data) => {
    const id = generateRandomID();
    try {
      const docRef = doc(db, collectionName, id);
      await setDoc(docRef, {
        id,
        ...data,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
};
  
export const readData = async (collectionName, id) => {
  if (!id) {
      throw new Error("No document ID provided");
  }

  try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
          // console.log("Document data:", docSnap.data());
          return docSnap.data();
      } else {
          console.log("No such document!");
          return null;
      }
  } catch (error) {
      console.error("Error reading document: ", error.message);
      throw error;
  }
};
  
export const updateData = async (collectionName, id, data) => {
  try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, data);
      console.log("Document successfully updated!");
  } catch (error) {
      console.error("Error updating document: ", error.message);
      throw error; // Rethrow the error so it can be caught in the component
  }
};
  
export const deleteData = async (collection, id) => {
    try {
      const docRef = doc(db, collection, id);
      await deleteDoc(docRef);
  
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error.message);
    }
};
  
export const readAllData = async (collectionName) => {
    try {
      const newDataArr = [];
      const querySnapshot = await getDocs(collection(db, collectionName));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        newDataArr.push(doc.data());
      });
      return newDataArr;
    } catch (error) {
      console.error("Error reading collection: ", error.message);
    }
};
  
export const listenToCollection = (collectionName, callback) => {
    const collectionRef = collection(db, collectionName);
  
    return onSnapshot(collectionRef, (querySnapshot) => {
      const newDataArr = [];
      querySnapshot.forEach((doc) => {
        newDataArr.push(doc.data());
      });
      callback(newDataArr);
    });
};
  