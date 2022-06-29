import * as React from "react";
import "./style.css";
import CardList from "../../components/CardList";
import {
  collection,
  query,
  getDocs,
  orderBy
} from "firebase/firestore/lite";

import {firestore} from "./../../utils/FireConnection"

export default function ListMachines() {
  const [cards, setCards] = React.useState([])
  const fire = async () => {
    let data = []
    const docRef = collection(firestore, "machines");
      const docSnap = query(docRef, orderBy("createdTimestamp", "desc"));
      const docs = await getDocs(docSnap)
      docs.forEach(e => {
        let dt = e.data()
        data.push(dt)
      })
      setCards(data)
  }

  React.useEffect(() => {
    fire()
  }, [])

  return (
    <div>
      <CardList card={cards} />
    </div>
  );
}