import * as React from "react";
import { useParams } from "react-router-dom";

import "./style.css";

import { useFirebaseAuth } from "../../components/FirebaseProvider";
import { GetData, firestore } from "../../utils/FireConnection";
import {
  collection,
  query,
  getDocs,
  where,
  orderBy,
} from "firebase/firestore/lite";

import CardList from "../../components/CardList";
import ErrorPage from "../../components/404";
import LoadingPage from "../../components/Loading";
import RegisterComponent from "../../components/Register";

function ProfileCard(props) {
  return (
    <div>
      <div className="d-flex justify-content-center mb-3">
        <div className="border rounded-2 text-center">
          <div className="d-sm-flex justify-content-center">
            <div>
              <img
                src={
                  props.data
                    ? props.data.picture
                    : "https://via.placeholder.com/100"
                }
                referrerPolicy="no-referrer"
                className="m-2 my-2 rounded-circle"
              />
            </div>
            <div className="me-3 m-2">
              <h4 className="text-break">
                {props.data ? props.data.username : "Username"}
              </h4>
              <div className="d-flex">
                <div className="m-auto me-2">
                  <div className="">
                    <small className="text-muted">Seguidores</small>
                  </div>
                  <div className="">
                    <h6>
                      {props.data && props.data.followers
                        ? props.data.followers.length
                        : "0"}
                    </h6>
                  </div>
                </div>
                <div className="m-auto me-2">
                  <div className="">
                    <small className="text-muted">Estrelas</small>
                  </div>
                  <div className="">
                    <h6>
                      {props.data && props.data.stars
                        ? props.data.stars.length
                        : "0"}
                    </h6>
                  </div>
                </div>
                <div className="m-auto  me-2">
                  <div className="">
                    <small className="text-muted">Projetos</small>
                  </div>
                  <div className="">
                    <h6>{props.cards ? props.cards.length : "0"}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function Dashboard(props) {
  const [cards, setCards] = React.useState([]);
  const [permissionCards, setPermissionCards] = React.useState([]);
  const [register, setRegister] = React.useState([]);

  const GetRegister = async () => {
    try {
      let data = [];
      const docRef = collection(firestore, "registers");
      const docSnap = query(
        docRef,
        where("ownerId", "==", `${props.data.uid}`)
      );
      const docs = await getDocs(docSnap);
      docs.forEach((e) => {
        let dt = e.data();
        data.push(dt);
      });

      setRegister(data);
    } catch (e) {}
  };

  const GetMachines = async () => {
    try {
      let data = [];
      const docRef = collection(firestore, "machines");
      const docSnap = query(
        docRef,
        where("ownerId", "==", `${props.data.uid}`)
      );
      const docs = await getDocs(docSnap);
      docs.forEach((e) => {
        let dt = e.data();
        data.push(dt);
      });
      setCards(data);
    } catch (e) {}
  };

  const GetPermMachines = async () => {
    try {
      let data = [];
      const docRef = collection(firestore, "machines");
      const docSnap = query(
        docRef,
        where("permissions", "array-contains", `${props.data.email}`)
      );
      const docs = await getDocs(docSnap);
      docs.forEach((e) => {
        let dt = e.data();
        data.push(dt);
      });
      setPermissionCards(data);
    } catch (e) {}
  };

  React.useEffect(() => {
    GetMachines();
    GetPermMachines();
    GetRegister();
  }, [props]);

  return (
    <div>
      <ProfileCard data={props.data} cards={cards} />
      {/*<CardList authorData={props.data} card={cards} />*/}
      <div className="m-4">
        <ul className="nav nav-tabs nav-fill" id="myTab">
          <li className="nav-item">
            <a href="#home" className="nav-link active" data-bs-toggle="tab">
              Máquinas
            </a>
          </li>
          <li className="nav-item">
            <a href="#profile" className="nav-link" data-bs-toggle="tab">
              Permissão
            </a>
          </li>
          <li className="nav-item">
            <a href="#messages" className="nav-link" data-bs-toggle="tab">
              Registros
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="home">
            <CardList authorData={props.data} card={cards} />
          </div>
          <div className="tab-pane fade" id="profile">
            <CardList card={permissionCards} />
          </div>
          <div className="tab-pane fade" id="messages">
            {register &&
              register.map((data, index) => {
                return (
                  <RegisterComponent key={`register ${data.id}`} data={data} />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function User() {
  const [ownerData, setOwnerData] = React.useState({});
  const [pageState, setPageState] = React.useState("loading");

  let params = useParams();
  const user = useFirebaseAuth();

  const ProcessProfile = async () => {
    try {
      if (user && user.uid == params.user) window.location = "/me";
      if (user && params.user == "me") params.user = user.uid;

      let data = await GetData(params.user, "users");
      setOwnerData(data);
      if (data) {
        setPageState("loaded");
      } else {
        setPageState("error");
      }
    } catch (e) {console.log(e)}
  };

  React.useEffect(() => {
    ProcessProfile();
  }, [params, user]);

  return (
    <div className="pt-4">
      {pageState == "loading" ? (
        <LoadingPage />
      ) : pageState == "error" ? (
        <ErrorPage />
      ) : params.user == "me" ? (
        user ? (
          <Dashboard data={ownerData} params={params} />
        ) : (
          <ErrorPage />
        )
      ) : (
        <Dashboard data={ownerData} params={params} />
      )}
    </div>
  );
}
