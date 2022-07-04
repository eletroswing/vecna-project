import * as React from "react";
import { useParams } from "react-router-dom";
import "./style.css";

import { collection, query, getDocs, where } from "firebase/firestore/lite";

import { firestore } from "./../../utils/FireConnection";
import RegisterComponent from "../../components/Register";

export default function Table() {
  const [registers, setRegisters] = React.useState([]);
  const params = useParams();

  const GetRegisters = async () => {
    let data = [];
    const docRef = collection(firestore, "registers");
    const docSnap = query(
      docRef,
      where("machineId", "==", `${params.machineName}`)
    );
    const docs = await getDocs(docSnap);
    docs.forEach((e) => {
      let dt = e.data();
      data.push(dt);
    });
    setRegisters(data);
  };

  React.useEffect(() => {
    GetRegisters();
  }, []);
  return (
    <div className="table-responsive">
      <div className="mx-2">
      {registers &&
        registers.map((data, index) => {
          return <RegisterComponent key={`register ${data.id}`} data={data} />;
        })}
      </div>
    </div>
  );
}
