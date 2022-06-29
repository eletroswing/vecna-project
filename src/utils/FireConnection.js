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
  orderBy,
  startAfter,
  limit,
  getDocs,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBYt1PEtXUBHzTlqEEv47e9iSzaEBSLiro",
  authDomain: "vecna-project.firebaseapp.com",
  projectId: "vecna-project",
  storageBucket: "vecna-project.appspot.com",
  messagingSenderId: "885079794024",
  appId: "1:885079794024:web:fd88909dbe22471bf4f6dd",
  measurementId: "G-ECE613MR24",
};

async function GetAllMachines(
  database = "machines"
) {
  var data = []
  const db = getFirestore(app);
  const q = query(collection(db, database));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (doc) => {
    let CardData = doc.data()
    let user = await GetData(CardData.ownerId.id, "users")
    let dt = { "id": CardData.id, "link": `/${CardData.ownerId.id}`, cardLink: `/${CardData.ownerId.id}/${CardData.id}`, "author": user.username, "title": CardData.title, "authorImage": user.picture }
    data.push(dt)
  });
  return data
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, CreateOrUpdateData, GetData };
