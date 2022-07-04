import * as React from "react";
import toast from "react-hot-toast";
import { Delete, GetData } from "../../utils/FireConnection";
import { useFirebaseAuth } from "../FirebaseProvider";

export default function RegisterComponent(props) {
  let user = useFirebaseAuth();
  const [ownerData, setOwnerData] = React.useState({});
  const [machineData, setMachineData] = React.useState({});
  const [machineOwner, setMachineOwner] = React.useState({});
  const closemodal = React.createRef();

  const GetAuthor = async () => {
    let data = await GetData(props.data.ownerId, "users");
    setOwnerData(data);
  };

  const GetMachine = async () => {
    let data = await GetData(props.data.machineId, "machines");
    setMachineData(data);
  };
  const GetCreated = async () => {
    let data = await GetData(machineData.ownerId, "users");
    setMachineOwner(data);
  };

  React.useEffect(() => {
    if (Object.keys(machineData).length != 0) {
      GetCreated();
    }
  }, [machineData]);

  React.useEffect(() => {
    GetAuthor();
    GetMachine();
  }, []);

  return (
    <div className="card mt-5 border-5 pt-2 active pb-0 px-3">
      <div
        className="modal fade"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        id={`ModalDeleteReg${props.data.id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Deletar um registro
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
                <h3>Deseja Excluir este registro?</h3>
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn btn-outline-success me-2"
                    ref={closemodal}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger ms-2 me-2"
                    onClick={async (e) => {
                      e.preventDefault();
                      try {
                        await Delete("registers", props.data.id);
                        closemodal.current.click();
                        window.location = window.location.href;
                      } catch (e) {
                        toast.error("Erro ao Deletar Registro!", {
                          duration: 3000,
                          style: {
                            background: "#333",
                            color: "#fff",
                          },
                        });
                      }
                    }}
                  >
                    Deletar
                  </button>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body ">
        <a
          href={`/${machineOwner.uid}/${machineData.id}/historico/${props.data.id}`}
          className="text-decoration-none text-black"
        >
          <div className="row">
            <div className="col-12 ">
              <h4 className="card-title ">
                <b>{props.data.os.causa}</b>
              </h4>
            </div>
            <div className="col">
              <h6 className="card-subtitle mb-2 text-muted">
                <p className="card-text text-muted small ">
                  <img
                    src="https://img.icons8.com/metro/26/000000/star.png"
                    className="mr-1 "
                    width="15"
                    height="15"
                    id="star"
                  />{" "}
                  <span className="vl mr-2 ml-0"></span>
                  Criado por{" "}
                  <span className="font-weight-bold">
                    {machineOwner && machineOwner.username}
                  </span>{" "}
                  em{" "}
                  {props.data.createdTimestamp &&
                    props.data.createdTimestamp
                      .toDate()
                      .toLocaleDateString("pt-BR")}
                  , as{" "}
                  {props.data.createdTimestamp &&
                    props.data.createdTimestamp
                      .toDate()
                      .toLocaleTimeString("pt-BR")}
                </p>
              </h6>
            </div>
          </div>
        </a>
        <p className="card-text text-muted">Para a máquina: <a className="text-decoration-none" href={`/${machineOwner.uid}/${machineData.id}`}>{machineData && machineData.title}</a></p>

      </div>
      <div className="card-footer bg-white px-0 ">
        <div className="row">
          <div className="col-md-auto w-100 d-flex justify-content-end">
            <ul className="list-inline">
              <li className="list-inline-item">
                {" "}
                {ownerData && (
                  <a href={`/${ownerData.uid}`}>
                    <img
                    src={ownerData.picture}
                    alt="DP"
                    referrerPolicy="no-referrer"
                    className="  rounded-circle img-fluid "
                    width="35"
                    height="35"
                  />
                  </a>
                )}
              </li>
              <li className="list-inline-item">
                {user && user.uid == props.data.ownerId && (
                  <a
                    className="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target={`#ModalDeleteReg${props.data.id}`}
                  >
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        data-name="trash-Filled"
                        d="M22 6a1 1 0 0 1-1 1H3a1 1 0 0 1 0-2h3.559a1 1 0 0 0 .948-.684l.316-.948A2 2 0 0 1 9.721 2h4.558a2 2 0 0 1 1.9 1.367l.316.95a1 1 0 0 0 .946.683H21a1 1 0 0 1 1 1Zm-2.7 3.03-.61 9.2a3.523 3.523 0 0 1-3.5 3.27H8.81a3.521 3.521 0 0 1-3.5-3.26L4.7 9.03a.511.511 0 0 1 .13-.37.523.523 0 0 1 .37-.16h13.6a.523.523 0 0 1 .37.16.511.511 0 0 1 .13.37ZM11 12a1 1 0 0 0-2 0v5a1 1 0 0 0 2 0Zm4 0a1 1 0 0 0-2 0v5a1 1 0 0 0 2 0Z"
                      />
                    </svg>
                  </a>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
