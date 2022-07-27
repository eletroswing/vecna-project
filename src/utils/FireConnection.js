import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  serverTimestamp,
  collection,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  query,
  getDocs,
  deleteDoc
} from "firebase/firestore/lite";

import { getStorage, ref, uploadBytes, deleteObject  } from "firebase/storage";

//TODO: change to production
//Prod
const firebaseConfig = {
  apiKey: "AIzaSyBYt1PEtXUBHzTlqEEv47e9iSzaEBSLiro",
  authDomain: "vecna-project.firebaseapp.com",
  projectId: "vecna-project",
  storageBucket: "vecna-project.appspot.com",
  messagingSenderId: "885079794024",
  appId: "1:885079794024:web:fd88909dbe22471bf4f6dd",
  measurementId: "G-ECE613MR24",
};


//Dev
/*const firebaseConfig = {
  apiKey: "AIzaSyCSJHk2p6SC9fc9TZT7gkeVzNP53LsiHwM",
  authDomain: "vecna-project-dev.firebaseapp.com",
  projectId: "vecna-project-dev",
  storageBucket: "vecna-project-dev.appspot.com",
  messagingSenderId: "939989981341",
  appId: "1:939989981341:web:da81de633f2ae7aaa09c74",
  measurementId: "G-6NFLV9X2FM"
};*/

async function GetAllMachines(database = "machines") {
  var data = [];
  const db = getFirestore(app);
  const q = query(collection(db, database));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (doc) => {
    let CardData = doc.data();
    let user = await GetData(CardData.ownerId.id, "users");
    let dt = {
      id: CardData.id,
      link: `/${CardData.ownerId.id}`,
      cardLink: `/${CardData.ownerId.id}/${CardData.id}`,
      author: user.username,
      title: CardData.title,
      authorImage: user.picture,
    };
    data.push(dt);
  });
  return data;
}

async function GetData(id = null, databaseName = null) {
  if (
    id == null ||
    id == undefined ||
    databaseName == null ||
    databaseName == undefined
  ) {
    throw new Error("missing data");
  }
  const db = getFirestore(app);

  const docRef = doc(db, databaseName, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return;
}

async function CreateOrUpdateData(id = null, data, databaseName = null) {
  if (
    id == null ||
    id == undefined ||
    databaseName == null ||
    databaseName == undefined
  ) {
    throw new Error("missing data");
  }

  var dataToCreate = {
    ...data,
    updateTimestamp: serverTimestamp(),
  };

  const db = getFirestore(app);
  const collectionRef = collection(db, databaseName);

  //first, verify if user data already exists on db
  const docRef = doc(db, databaseName, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(doc(collectionRef, id), dataToCreate);
    return docSnap.data();
  }
  dataToCreate = {
    ...dataToCreate,
    createdTimestamp: serverTimestamp(),
  };

  //if no, we create
  const createPromise = await setDoc(doc(collectionRef, id), dataToCreate).then(
    () => id
  );

  const docId = await createPromise;

  return {
    id: docId,
    ...data,
    updateTimestamp: new Date(),
  };
}

async function UploadFile(reference, file) {
  if (reference == undefined || reference == null || file == undefined || file == null) {
    throw new Error("missing info");
  }
  let storageRef = ref(storage, reference);

  // 'file' comes from the Blob or File API
  let data = await uploadBytes(storageRef, file)
  return {data, storageRef}
}

async function Delete(table, id){
  if(!table || !id) throw new Error("missing info")
  await deleteDoc(doc(firestore, table, id))
  return
}

async function DeleteMedia(storage, reference){
  if(!reference || !storage) throw new Error("missin info")
  var MediaRef = ref(storage, reference);

  // Delete the file
  try{
    await deleteObject(MediaRef)
    return
  }catch(e){
    console.warn(e)
    return e
  }
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage, CreateOrUpdateData, GetData,UploadFile, Delete, DeleteMedia };
