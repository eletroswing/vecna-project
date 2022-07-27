import * as React from "react";
import {
  GetData,
  storage,
  firestore,
  Delete,
  DeleteMedia,
} from "./../../utils/FireConnection";
import "./style.css";

import { useFirebaseAuth } from "../FirebaseProvider";
import { Link } from "react-router-dom";
import { ref, getDownloadURL } from "firebase/storage";
import { toast } from "react-hot-toast";
import { collection, query, getDocs, where } from "firebase/firestore/lite";

import LoadingPage from "../Loading";

export default function Card(props) {
  let user = useFirebaseAuth();
  let [Owner, setOwner] = React.useState(false);
  let [isDeleting, setIsDeleting] = React.useState(false);

  var CloseModalButton = React.useRef();

  if (
    (props.authorId == null || props.authorId == undefined) &&
    (props.authorData == null || props.authorData == undefined)
  ) {
    throw new Error("Need to pass id or user data to card");
  }

  const [authorData, setAuthorData] = React.useState({} || null);
  const [useImage, setImage] = React.useState({} || null);

  const GetUserData = async () => {
    let data = await GetData(props.authorId, "users");
    setAuthorData(data);
  };

  const GetCardData = async () => {
    let reference = await ref(storage, props.data.thumbnail);
    let data = await getDownloadURL(reference);
    setImage(data);
  };

  React.useEffect(() => {
    if (props.authorData !== null && props.authorData !== undefined) {
      setAuthorData(props.authorData);
    } else {
      GetUserData();
    }

    GetCardData();
  }, []);

  React.useEffect(() => {
    if (user && authorData.uid == user.uid) {
      setOwner(true);
    }
  }, [authorData]);

  return (
    <div className="me-sm-4">
      <div
        className="modal fade"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        id={`ModalDelete${props.data.id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Deletar uma Máquina
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div>
              <div className="modal-body">
                <form
                  id="form"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <h3>Deseja Excluir esta máquina?</h3>
                </form>
              </div>
              <div className="modal-footer">
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn btn-outline-success me-2"
                    ref={CloseModalButton}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger ms-2 me-2"
                    disabled={isDeleting}
                    onClick={async (e) => {
                      setIsDeleting(true);
                      try {
                        
                          let dataId = props.data.id;
                          //deleting files
                          if (props.data.glb) {
                            let reference = `${props.data.glb}`;
                            await DeleteMedia(storage, reference);
                          }

                          if (props.data.thumbnail) {
                            let reference = `${props.data.thumbnail}`;
                            await DeleteMedia(storage, reference);
                          }
                          if (props.data.images.length != 0) {
                            props.data.images.forEach(async (item, index) => {
                              let reference = `${item}`;
                              await DeleteMedia(storage, reference);
                            });
                          }
                          const docRef = collection(firestore, "registers");
                          const docSnap = query(
                            docRef,
                            where("machineId", "==", `${props.data.id}`)
                          );
                          const docs = await getDocs(docSnap);
                          docs.forEach(async (e) => {
                            let dt = e.data();
                            await Delete("registers", dt.id);
                          });

                          await Delete("machines", dataId);
                          toast.success("Máquina deletada com sucesso!", {
                            duration: 3000,
                            style: {
                              background: "#333",
                              color: "#fff",
                            },
                          });
                      } catch (e) {
                        console.warn(e)
                        toast.error(`Erro ao deletar a máquina!`, {
                          duration: 3000,
                          style: {
                            background: "#333",
                            color: "#fff",
                          },
                        });
                      } finally {
                        setIsDeleting(false);
                        CloseModalButton.current.click();
                      }
                    }}
                  >
                    {isDeleting ? (
                      <div
                        className="spinner-border text-primary spinner-border-sm"
                        role="status"
                      >
                        <span className="sr-only"></span>
                      </div>
                    ) : (
                      "Deletar"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {Object.keys(useImage).length == 0 ? (
        <LoadingPage />
      ) : (
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "10px",
            width: "17rem",
          }}
        >
          <Link
            className="text-black text-decoration-none"
            to={props.cardLink ? `${props.cardLink}` : "#"}
          >
            <img
              src={useImage ? useImage : "https://via.placeholder.com/500"}
              referrerPolicy="no-referrer"
              className="rounded-4 border bg-body"
              loading="lazy"
              style={{
                objectFit: "cover",
                height: "25rem",
                width: "16rem",
              }}
            />
          </Link>
          <div
            style={{
              color: "white",
              position: "absolute",
              bottom: 10,
              backgroundImage: `url("../../gradient.png")`,
              overflow: "hidden",
              padding: "4px",
              borderRadius: "0 0 .8rem .8rem",
              width: "16rem",
              paddingBottom: 15,
              paddingLeft: 10,
            }}
          >
            <Link
              className="text-decoration-none text-white"
              to={props.cardLink ? `${props.cardLink}` : "#"}
            >
              <h5
                style={{
                  overflow: "hidden",
                  wordBreak: "break-word",
                  display: "-webkit-box",
                  WebkitLineClamp: "3",
                  WebkitBoxOrient: "vertical",
                  textShadow: " 2px 2px 4px #000000",
                  WebkitTouchCallout: "none",
                  WebkitUserSelect: "none",
                  KhtmlUserSelect: "none",
                  MozUserSelect: "none",
                  MsUserSelect: "none",
                  userSelect: "none",
                }}
              >
                <strong>
                  {props.cardTitle
                    ? props.cardTitle
                    : "Fresadora universal KFU-2"}
                </strong>
              </h5>
            </Link>
            <div className="d-flex pt-2 justify-content-between">
              <Link
                className="text-white text-decoration-none"
                to={Owner ? "/me" : authorData.uid ? `/${authorData.uid}` : "#"}
              >
                <div className="d-flex">
                  <img
                    src="https://lh3.googleusercontent.com/a/AATXAJxdKxsoHhjCPztK7MBcI2KbkDWJbDNtUSrwv6Cq=s96-c"
                    width="40"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    height="40"
                    className="rounded-circle"
                  />
                  <h6
                    className="my-auto ms-2"
                    href=""
                    style={{
                      textShadow: " 2px 2px 4px #000000",
                      WebkitTouchCallout: "none",
                      WebkitUserSelect: "none",
                      KhtmlUserSelect: "none",
                      MozUserSelect: "none",
                      MsUserSelect: "none",
                      userSelect: "none",
                    }}
                  >
                    {authorData.username
                      ? authorData.username
                      : "Nome do autor"}
                    ...
                  </h6>
                </div>
              </Link>
              {Owner && (
                <div className="me-2 mt-1" style={{}}>
                  <a
                    className="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target={`#ModalDelete${props.data.id}`}
                  >
                    <svg
                      width="24"
                      height="24"
                      fill="#ffffff"
                      style={{
                        filter: "drop-shadow(2px 2px 4px #000000)",
                      }}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M22 6a1 1 0 0 1-1 1H3a1 1 0 0 1 0-2h3.559a1 1 0 0 0 .948-.684l.316-.948A2 2 0 0 1 9.721 2h4.558a2 2 0 0 1 1.9 1.367l.316.95a1 1 0 0 0 .946.683H21a1 1 0 0 1 1 1Zm-2.7 3.03-.61 9.2a3.523 3.523 0 0 1-3.5 3.27H8.81a3.521 3.521 0 0 1-3.5-3.26L4.7 9.03a.511.511 0 0 1 .13-.37.523.523 0 0 1 .37-.16h13.6a.523.523 0 0 1 .37.16.511.511 0 0 1 .13.37ZM11 12a1 1 0 0 0-2 0v5a1 1 0 0 0 2 0Zm4 0a1 1 0 0 0-2 0v5a1 1 0 0 0 2 0Z" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/*
<div id="Card">
        <div
          loading="lazy"
        >
          <Link
            className="text-black text-decoration-none"
            to={props.cardLink ? props.cardLink : "#"}
          >
            {Object.keys(useImage).length == 0? <LoadingPage />: <img
              src={useImage ? useImage : "https://via.placeholder.com/150"}
              id="CardImage"
              referrerPolicy="no-referrer"
              loading="lazy"
              alt="..."
              style={{
                height: "55vh",
                objectFit: "cover"
              }}
            />}
            
            <div className="card-body user-select-none" id="CardContent">
              <h5 className="card-title" id="CardTitle">
                <strong>
                  {props.cardTitle
                    ? props.cardTitle
                    : "Fresadora universal KFU-2"}
                </strong>
              </h5>
            </div>
          </Link>
        </div>
        <div>
          <Link
            className="text-black text-decoration-none"
            to={authorData.uid ? authorData.uid : "#"}
          >
            <div className="card-body" id="CardContent">
              <div className="d-flex aling-center user-select-none">
                <img
                  src={
                    authorData.picture
                      ? authorData.picture
                      : "https://via.placeholder.com/150"
                  }
                  alt="mdo"
                  width="40"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  height="40"
                  className="rounded-circle"
                />
                <h6 className="my-auto ms-2" href="">
                  {authorData.username ? authorData.username : "Nome do autor"}
                </h6>
              </div>
            </div>
          </Link>
          {Owner ? (
            <a
              className="dropdown-item"
              data-bs-toggle="modal"
              data-bs-target={`#ModalDelete${props.data.id}`}
            >
              <div className="d-flex justify-content-end m-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    data-name="trash-Filled"
                    d="M22 6a1 1 0 0 1-1 1H3a1 1 0 0 1 0-2h3.559a1 1 0 0 0 .948-.684l.316-.948A2 2 0 0 1 9.721 2h4.558a2 2 0 0 1 1.9 1.367l.316.95a1 1 0 0 0 .946.683H21a1 1 0 0 1 1 1Zm-2.7 3.03-.61 9.2a3.523 3.523 0 0 1-3.5 3.27H8.81a3.521 3.521 0 0 1-3.5-3.26L4.7 9.03a.511.511 0 0 1 .13-.37.523.523 0 0 1 .37-.16h13.6a.523.523 0 0 1 .37.16.511.511 0 0 1 .13.37ZM11 12a1 1 0 0 0-2 0v5a1 1 0 0 0 2 0Zm4 0a1 1 0 0 0-2 0v5a1 1 0 0 0 2 0Z"
                  />
                </svg>
              </div>
            </a>
          ) : (
            <div />
          )}
        </div>
      </div>
*/
