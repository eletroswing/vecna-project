import * as React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ref, getDownloadURL } from "firebase/storage";
import { QRCode } from "react-qrcode-logo";
import { v4 } from "uuid";

import "./style.css";

import ErrorPage from "./../../components/404";
import LoadingPage from "../../components/Loading";

import {
  CreateOrUpdateData,
  GetData,
  storage,
  firestore,
} from "../../utils/FireConnection";
import { useFirebaseAuth } from "../../components/FirebaseProvider";
import { toast } from "react-hot-toast";
import {
  collection,
  query,
  getDocs,
  where,
  orderBy,
} from "firebase/firestore/lite";
import RegisterComponent from "../../components/Register";

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (e) {
    console.warn(e);
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}
function Carroussel(props) {
  return (
    <div>
      {props.images.length != 0 ? (
        <div
          id="carouselExampleIndicators"
          className="carousel slide w-100"
          data-bs-ride="true"
        >
          <div className="carousel-indicators">
            {props.images.map((image, index) => {
              return (
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={index}
                  key={`btn image ${index}`}
                  className={index == "0" ? "active bg-black" : "bg-black"}
                  aria-current={index == "0" ? "true" : "false"}
                  aria-label="Slide 1"
                ></button>
              );
            })}
          </div>
          <div className="carousel-inner">
            {props.images.map((image, index) => {
              return (
                <div
                  className={
                    index == 0 ? "carousel-item active" : "carousel-item"
                  }
                  key={`slide image ${index}`}
                >
                  <img
                    width="800"
                    height="400"
                    role="img"
                    className="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
                    style={{
                      objectFit: "contain",
                    }}
                    src={image}
                  />
                </div>
              );
            })}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon bg-dark opacity-50"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon bg-dark opacity-50"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

function ModelViwer(props) {
  return (
    <div>
      {props.glb ? (
        <div>
          <model-viewer
            id="ModelViwer"
            src={props.glb}
            ar
            ar-modes="webxr scene-viewer quick-look"
            camera-controls
            enable-pan
          ></model-viewer>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

export default function Machine() {
  let userData = useFirebaseAuth();
  let { user, machineName } = useParams();
  const [owner, setOwner] = React.useState({});
  const [notificationArray, setNotificationArray] = React.useState([]);
  const [machine, setMachine] = React.useState({});
  const [loadingNotButton, setLoadingNotButton] = React.useState(false);

  const [is3d, set3d] = React.useState(false);
  const [have3dImage, setHave3dImage] = React.useState(false);
  const [haveImages, setHaveImages] = React.useState(false);

  const [pageState, setPageState] = React.useState("loading");
  const [loaded, setLoaded] = React.useState(false);

  const [link, setLink] = React.useState("");
  const [tableInfo, setTableInfo] = React.useState([]);
  const [tableChilds, setTableChilds] = React.useState([]);

  const [ImageList, setList] = React.useState([]);
  const [tempImage, setTempImage] = React.useState("");

  const [AnulateSS, setAnulateSS] = React.useState(false);
  const closeRegisterModal = React.useRef();

  const [getLastInfo, setLastInfo] = React.useState(0);

  const [LastMods, setLastMods] = React.useState([]);

  const [loadingCreateRegister, setLoadingCreateRegister] = React.useState(false);


  const GetAuthenticatedProfile = async () => {
    setLoadingNotButton(true);
    try {
      if (userData) {
        let data = await GetData(userData.uid, "users");
        setNotificationArray(data.NotificationIDS ? data.NotificationIDS : []);
      } else {
        setNotificationArray([]);
      }
    } catch (e) {
      console.warn(e);
      setPageState("error");
    } finally {
      setLoadingNotButton(false);
    }
  };

  const GetUserProfile = async () => {
    try {
      if (pageState != "error" && pageState != "loaded") {
        let data = await GetData(user, "users");
        setOwner(data);
        if (!data) {
          setPageState("error");
        } else {
          setPageState("loaded");
          GetMachineData();
        }
      }
    } catch (e) {
      console.warn(e);
      setPageState("error");
    }
  };

  const GetMachineData = async () => {
    try {
      if (pageState != "error" && pageState != "loaded") {
        let data = await GetData(machineName, "machines");
        setMachine(data);
        if (!data) {
          setPageState("error");
        } else {
          setPageState("loaded");
        }
      }
    } catch (e) {
      console.warn(e);
      setPageState("error");
    }
  };

  const GetLastMod = async () => {
    try {
      if (machine.id) {
        let data = [];
        const docRef = collection(firestore, "registers");
        const docSnap = query(
          docRef,
          where("machineId", "==", `${machine.id}`)
        );
        const docs = await getDocs(docSnap);
        docs.forEach((e) => {
          let dt = e.data();
          data.push(dt);
        });

        data.sort(
          (a, b) => a.createdTimestamp.toDate() - b.createdTimestamp.toDate()
        );
        data.reverse();
        let temp = data.slice(0, 3);
        data = temp;
        setLastMods(data);
      }
    } catch (e) {
      console.warn(e);
    }
  };
  React.useEffect(() => {
    GetUserProfile();
  }, []);

  const Load = async (referenceTofile) => {
    let reference = ref(storage, referenceTofile);
    let data = await getDownloadURL(reference);
    return data;
  };

  const Get3d = async () => {
    if (!isValidHttpUrl(link)) {
      let data = await Load(machine.glb);
      setLink(data);
      set3d(true);
      setHave3dImage(true);
    }
  };

  const GetImages = async () => {
    if (machine.images) {
      machine.images.forEach(async (image) => {
        if (!isValidHttpUrl(image)) {
          let reference = ref(storage, image);
          getDownloadURL(reference).then((e) => {
            setTempImage(e);
          });
        }
      });

      setHaveImages(true);
    }
  };

  React.useEffect(() => {
    if (tempImage) {
      setList([...ImageList, tempImage]);
    } else {
      setList([]);
    }
  }, [tempImage]);

  React.useEffect(() => {
    GetImages();
  }, [LastMods]);

  React.useEffect(() => {
    GetAuthenticatedProfile();
  }, [userData]);

  React.useEffect(() => {
    if (machine) {
      //load downloads urls for glb
      if (machine.glb) {
        Get3d();
      }
      //load downloads urls for images
    }
    GetLastMod();

    let isEmpty = Object.keys(machine).length === 0;
    let List = [];
    var GreatherChild = [];
    if (!isEmpty) {
      Object.keys(machine.tableInformation).forEach((item, index) => {
        let data = machine.tableInformation[item];
        List.push(data);
        if (data.child.length > GreatherChild) {
          GreatherChild = [];
          data.child.forEach(() => {
            GreatherChild.push("1");
          });
        }
      });
      setTableInfo(List);
    }
    setTableChilds(GreatherChild);
    setLoaded(true);
  }, [machine]);

  const AddRegister = async (e) => {
    e.preventDefault();
    setLoadingCreateRegister(true)
    try {
      if (!userData) throw new Error("not authenticated");
      let data = [...e.target];

      let Info = {};
      let Os = {};
      let Ss = {};

      data.forEach((element) => {
        if (
          element.nodeName == "INPUT" ||
          element.nodeName == "TEXTAREA" ||
          element.nodeName == "SELECT"
        ) {
          if (element.id.split(" ")[0] == "os") {
            Os[element.id.split(" ")[1]] = element.value;
          }
          if (element.id.split(" ")[0] == "ss") {
            Ss[element.id.split(" ")[1]] = element.value;
          }
        }
      });

      if (Object.keys(Os).length != 0) {
        Info.os = Os;
      }

      if (Object.keys(Ss).length != 0) {
        Info.ss = Ss;
      }

      let date = new Date()
      let NewId = v4() + v4();
      Info.id = NewId;
      Info.ownerId = userData.uid;
      Info.machineId = machine.id;
      Info.ownerEmail = userData.email;
      Info.lastNotification = date;

      if (
        machine.ownerId == userData.uid ||
        machine.permissions.includes(userData.email)
      ) {
        await CreateOrUpdateData(NewId, Info, "registers");
      } else {
        throw new Error("not owner");
      }

      toast.success("Registro Adicionado!", {
        duration: 3000,
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      closeRegisterModal.current.click();
    } catch (e) {
      console.warn(e);
      toast.error("Erro ao Adicionar Registro!", {
        duration: 3000,
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    }finally{
      setLoadingCreateRegister(false)
    }
  };

  const Notifyme = (e) => {
    e.preventDefault();
    toast("Confira suas configurações de notificação", {
      duration: 3000,
      icon: "🔔",
      style: {
        background: "#333",
        color: "#fff",
      },
    });

    if (!userData) {
      toast("Precisa de Log-In!", {
        duration: 3000,
        icon: "😭",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      if (!notificationArray.includes(machineName)) {
        let list = [...notificationArray, machineName];
        setNotificationArray(list);
      }
    }
  };

  const RemoveNotification = (e) => {
    e.preventDefault();
    if (!userData) {
      toast("Precisa de Log-In!", {
        duration: 3000,
        icon: "😭",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      if (notificationArray.includes(machineName)) {
        let list = [...notificationArray];
        list.splice(list.indexOf(machineName, 1));
        setNotificationArray(list);
      }
    }
  };

  React.useEffect(() => {
    if (userData) {
      setLoadingNotButton(true);
      CreateOrUpdateData(
        userData.uid,
        {
          NotificationIDS: notificationArray,
        },
        "users"
      ).then(() => {
        setLoadingNotButton(false);
      });
    }
  }, [notificationArray]);

  return (
    <div>
      {pageState == "loading" ? (
        <LoadingPage />
      ) : pageState == "loaded" ? (
        <div id="Container">
          <div id="Centered">
            <div className="m-auto">
              <div className="py-1"></div>
              <div id="model" className="mb-4 mt-2">
                <h1>
                  {machine.title ? machine.title : "Fresadora universal kfu 2"}
                </h1>
                <h4 className="text-muted">
                  {machine.scope ? machine.scope : "Plano de lubrificação"}
                </h4>
                <p className="">
                  <em className="opacity-25">Criado por:</em>
                  <em className="opacity-75">
                    <Link
                      className="text-decoration-none"
                      to={owner.uid ? `/${owner.uid}` : "/"}
                    >
                      {owner.username ? owner.username : "Ytalo"}.
                    </Link>
                  </em>
                </p>
              </div>
              <div id="table">
                {loaded ? (
                  haveImages && have3dImage ? (
                    !is3d ? (
                      <Carroussel images={ImageList} />
                    ) : (
                      <ModelViwer glb={link} />
                    )
                  ) : haveImages ? (
                    ImageList.length == 0 ? (
                      <LoadingPage />
                    ) : (
                      <Carroussel images={ImageList} />
                    )
                  ) : (
                    <ModelViwer glb={link} />
                  )
                ) : (
                  <div />
                )}
              </div>
              <div>
                {have3dImage && haveImages ? (
                  <div className="form-check form-switch mb-5 mt-2 d-flex justify-content-end">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      onChange={(e) => {
                        set3d(e.target.checked);
                      }}
                      checked={is3d}
                    />
                  </div>
                ) : (
                  <div />
                )}
              </div>
              <div className="d-flex flex-column flex-lg-row mt-3 w-full">
                {/* table of prev manut */}
                {LastMods[0] && (
                  <div className="m-lg-auto mx-2">
                    <select
                      className="form-select form-select-sm mb-2"
                      aria-label=".form-select-sm example"
                      value={getLastInfo}
                      onChange={(e) => {
                        setLastInfo(e.target.value);
                      }}
                    >
                      {LastMods[0] && (
                        <option value="0">Ultima manutenção</option>
                      )}
                      {LastMods[1] && (
                        <option value="1">Penultima manutenção</option>
                      )}
                      {LastMods[2] && (
                        <option value="2">Anti-Penultiuma manutenção</option>
                      )}
                    </select>
                    <div className="mb-5">
                      <RegisterComponent data={LastMods[getLastInfo]} />
                    </div>
                  </div>
                )}
              </div>
              <div id="info" className="d-flex flex-column f  lex-lg-row">
                <div className="m-auto">
                  <a
                    href={owner && `/${owner.uid}/${machine.id}/historico`}
                    target="_blank"
                  >
                    <button
                      type="button"
                      className="btn btn-outline-info w-full mt-2 mb-0 mb-lg-5"
                    >
                      Ver historico de manutenções
                    </button>
                  </a>
                </div>
                <div className="m-auto">
                  {loadingNotButton ? (
                    <button
                      type="button"
                      disabled
                      className="btn btn-outline-warning w-full mt-3 mt-lg-2 mb-5"
                    >
                      <div
                        className="spinner-border text-primary spinner-border-sm"
                        role="status"
                      >
                        <span className="sr-only"></span>
                      </div>
                    </button>
                  ) : notificationArray.length != 0 &&
                    notificationArray.includes(machineName) ? (
                    <button
                      type="button"
                      className="btn btn-outline-warning w-full mt-3 mt-lg-2 mb-5"
                      onClick={RemoveNotification}
                    >
                      <svg
                        className="me-1"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="none"
                          stroke="#6fff00"
                          strokeWidth="2"
                          d="m2 14 7 6L22 4"
                        />
                      </svg>{" "}
                      Você será notificado dessa maquina
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-outline-success w-full mt-3 mt-lg-2 mb-5"
                      onClick={Notifyme}
                    >
                      Notificarme da próxima manutenção
                    </button>
                  )}
                </div>
              </div>
              {tableInfo.length != 0 && (
                <div className="m-lg-auto mx-2 mb-5 table-responsive">
                  <div className="mb-5">
                    <h1 className="display-5 mb-3">Quais óleos ultilizar</h1>
                  </div>
                  <table className="table table-striped-columns table-hover w-full">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        {tableInfo.length != 0 &&
                          tableInfo.map((data, index) => {
                            return (
                              <th scope="col" key={`info table ${index}`}>
                                {data.title}
                              </th>
                            );
                          })}
                      </tr>
                    </thead>
                    <tbody>
                      {tableInfo.length != 0 &&
                        tableChilds.map((data, index) => {
                          return (
                            <tr key={`info table ${index}`}>
                              <th scope="row">{index + 1}</th>
                              {tableInfo.map((dataTable, indexTable) => {
                                if (dataTable.child[index]) {
                                  return (
                                    <td key={`info table ${indexTable}`}>
                                      {dataTable.child[index]}
                                    </td>
                                  );
                                } else {
                                  return (
                                    <td key={`info table ${indexTable}`}></td>
                                  );
                                }
                              })}
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              )}
              {machine.accorditions != 0 && (
                <div className="mb-5 mt-5">
                  <h1 className="display-5 mb-3">Informações Importantes</h1>
                  <div className="accordion" id="accordionExample">
                    {machine.accorditions &&
                      machine.accorditions.map((accorditon, index) => {
                        return (
                          <div
                            className="accordion-item"
                            key={`accordition ${index} ${accorditon.title}`}
                          >
                            <h2
                              className="accordion-header"
                              id={`AccorditionHeading${index}`}
                            >
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#accordition${index}`}
                                aria-controls={`accordition${index}`}
                              >
                                {accorditon.title}
                              </button>
                            </h2>
                            <div
                              id={`accordition${index}`}
                              className="accordion-collapse collapse"
                              aria-labelledby={`AccorditionHeading${index}`}
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                {accorditon.data}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
              <div id="add" className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-outline-primary m-2"
                  data-bs-toggle="modal"
                  data-bs-target="#ShareModal"
                >
                  Compartilhar
                </button>

                {Object.keys(machine).length != 0 &&
                  userData &&
                  (machine.ownerId == userData.uid ||
                    (machine &&
                      machine.permissions.includes(userData.email))) && (
                    <button
                      type="button"
                      className="btn btn-outline-success m-2"
                      data-bs-toggle="modal"
                      data-bs-target="#AddRegister"
                    >
                      Adicionar registro
                    </button>
                  )}
              </div>
              <div
                className="modal fade"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                id="AddRegister"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Adicionar Registro
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
                        <form id="form_register" onSubmit={AddRegister}>
                          <h4>Solicitação de Serviço</h4>
                          <div className="form-check form-switch d-flex justify-content-end">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              id="nulable"
                              value={AnulateSS}
                              onChange={(e) => {
                                setAnulateSS(!AnulateSS);
                              }}
                            />
                            <label
                              className="form-check-label ms-2"
                              htmlFor="nulable"
                            >
                              Anular
                            </label>
                          </div>
                          {!AnulateSS ? (
                            <div className="form-control">
                              <div className="mb-3 d-flex flex-column">
                                <label className="col-form-label">
                                  Solicitante
                                </label>
                                <input
                                  type="text"
                                  required
                                  className="form-control"
                                  id="ss solicitante"
                                  placeholder="solicitante"
                                />
                              </div>
                              <div className="mb-3 d-flex flex-column">
                                <label className="col-form-label">
                                  Responsável
                                </label>
                                <input
                                  type="text"
                                  required
                                  className="form-control"
                                  id="ss responsavel"
                                  placeholder="responsável"
                                />
                              </div>
                              <div className="mb-3 d-flex flex-column">
                                <label className="col-form-label">
                                  Tipo de manutenção
                                </label>
                                <select
                                  className="form-select me-2"
                                  aria-label="Default select example"
                                  id="ss tipoManutencao"
                                >
                                  <option defaultValue value="corretiva">
                                    Corretiva
                                  </option>
                                  <option value="preventiva">Preventiva</option>
                                  <option value="preditiva">Preditiva</option>
                                  <option value="tpm">TPM</option>
                                </select>
                              </div>
                              <div className="mb-3 d-flex flex-column">
                                <label className="col-form-label">
                                  Informações
                                </label>
                                <div className="d-flex">
                                  <div className="d-flex input-group me-2">
                                    <span
                                      className="input-group-text"
                                      id="inputGroup-sizing-default"
                                    >
                                      Setor
                                    </span>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="ss setor"
                                      required
                                      aria-label="Sizing example input"
                                      aria-describedby="inputGroup-sizing-default"
                                    />
                                  </div>
                                  <div className="d-flex input-group ms-2">
                                    <span
                                      className="input-group-text"
                                      id="inputGroup-sizing-default"
                                    >
                                      Máquina
                                    </span>
                                    <input
                                      required
                                      type="text"
                                      className="form-control"
                                      id="ss maquina"
                                      aria-label="Sizing example input"
                                      aria-describedby="inputGroup-sizing-default"
                                    />
                                  </div>
                                </div>
                                <div className="d-flex input-group mt-3">
                                  <span
                                    className="input-group-text"
                                    id="inputGroup-sizing-default"
                                  >
                                    D/H Parou
                                  </span>
                                  <input
                                    type="datetime-local"
                                    required
                                    className="form-control"
                                    id="ss dh-parou"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default"
                                  />
                                </div>
                                <div className="d-flex input-group mt-3">
                                  <span
                                    className="input-group-text"
                                    id="inputGroup-sizing-default"
                                  >
                                    D/H Funcionou
                                  </span>
                                  <input
                                    required
                                    type="datetime-local"
                                    className="form-control"
                                    id="ss dh-functionou"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default"
                                  />
                                </div>
                                <div className="d-flex input-group mt-3">
                                  <span className="input-group-text">
                                    Descrição
                                  </span>
                                  <textarea
                                    className="form-control"
                                    required
                                    aria-label="With textarea"
                                    id="ss descricao"
                                  ></textarea>
                                </div>
                                <div className="d-flex input-group mt-3">
                                  <span
                                    className="input-group-text"
                                    id="inputGroup-sizing-default"
                                  >
                                    Prazo
                                  </span>
                                  <input
                                    type="date"
                                    className="form-control"
                                    id="ss dh-prazo"
                                    required
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default"
                                  />
                                </div>
                                <div className="d-flex input-group mt-3">
                                  <span
                                    className="input-group-text"
                                    id="inputGroup-sizing-default"
                                  >
                                    Financeiro
                                  </span>
                                  <input
                                    type="text"
                                    required
                                    className="form-control"
                                    id="ss financeiro"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default"
                                  />
                                </div>
                                <div className="d-flex input-group mt-3">
                                  <label
                                    className="input-group-text"
                                    htmlFor="prioridade"
                                  >
                                    Prioridade
                                  </label>
                                  <select
                                    className="form-select"
                                    id="ss prioridade"
                                  >
                                    <option defaultValue value="muito-baixa">
                                      Muito Baixa
                                    </option>
                                    <option value="baixa">Baixa</option>
                                    <option value="media">Média</option>
                                    <option value="alta">Alta</option>
                                    <option value="muito-alta">
                                      Muito Alta
                                    </option>
                                  </select>
                                </div>
                                <div className="d-flex input-group mt-3">
                                  <span
                                    className="input-group-text"
                                    id="inputGroup-sizing-default"
                                  >
                                    Controle de Custo
                                  </span>
                                  <input
                                    type="text"
                                    required
                                    className="form-control"
                                    id="ss controle-custo"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="form-control">
                              <h4>Desativado</h4>
                            </div>
                          )}
                          <h4 className="mt-3 mb-3">Ordem de Serviço</h4>
                          <div className="form-control">
                            <div className="mb-3 d-flex flex-column">
                              <label className="col-form-label">
                                Executante
                              </label>
                              <input
                                type="text"
                                required
                                className="form-control"
                                id="os executante"
                                placeholder="Executante"
                              />
                            </div>
                            <div className="mb-3 d-flex flex-column">
                              <label className="col-form-label">
                                Informações
                              </label>
                              <div className="d-flex input-group mt-3">
                                <span
                                  className="input-group-text"
                                  id="inputGroup-sizing-default"
                                >
                                  D/H Inicio
                                </span>
                                <input
                                  required
                                  type="datetime-local"
                                  className="form-control"
                                  id="os dh-inicio"
                                  aria-label="Sizing example input"
                                  aria-describedby="inputGroup-sizing-default"
                                />
                              </div>
                              <div className="d-flex input-group mt-3">
                                <span
                                  className="input-group-text"
                                  id="inputGroup-sizing-default"
                                >
                                  D/H Termino
                                </span>
                                <input
                                  type="datetime-local"
                                  required
                                  className="form-control"
                                  id="os dh-termino"
                                  aria-label="Sizing example input"
                                  aria-describedby="inputGroup-sizing-default"
                                />
                              </div>
                              <div className="d-flex input-group mt-3">
                                <label
                                  className="input-group-text"
                                >
                                  Expira em
                                </label>
                                <select
                                  className="form-select"
                                  id="os expires_day"
                                >
                                  <option defaultValue value="1">
                                    1
                                  </option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                  <option value="7">7</option>
                                  <option value="8">8</option>
                                  <option value="9">9</option>
                                  <option value="10">10</option>
                                  <option value="11">11</option>
                                  <option value="12">12</option>
                                  <option value="13">13</option>
                                  <option value="14">14</option>
                                  <option value="15">15</option>
                                </select>
                                <select
                                  className="form-select"
                                  id="os expires_time"
                                >
                                  <option value="1">dia(s)</option>
                                  <option defaultValue value="2">
                                    semana(as)
                                  </option>
                                  <option value="3">mês(es)</option>
                                </select>
                              </div>
                              <div className="d-flex input-group mt-3">
                                <span
                                  className="input-group-text"
                                  id="inputGroup-sizing-default"
                                >
                                  Tempo
                                </span>
                                <input
                                  type="text"
                                  required
                                  className="form-control"
                                  id="os tempo"
                                  aria-label="Sizing example input"
                                  aria-describedby="inputGroup-sizing-default"
                                />
                              </div>
                              <div className="d-flex input-group mt-3">
                                <span
                                  className="input-group-text"
                                  id="inputGroup-sizing-default"
                                >
                                  Causa
                                </span>
                                <input
                                  type="text"
                                  required
                                  className="form-control"
                                  id="os causa"
                                  aria-label="Sizing example input"
                                  aria-describedby="inputGroup-sizing-default"
                                />
                              </div>
                              <div className="d-flex input-group mt-3">
                                <span className="input-group-text">
                                  Descrição
                                </span>
                                <textarea
                                  className="form-control"
                                  required
                                  aria-label="With textarea"
                                  id="os descrição"
                                ></textarea>
                              </div>
                              <div className="d-flex input-group mt-3">
                                <span className="input-group-text">
                                  Materiais
                                </span>
                                <textarea
                                  className="form-control"
                                  required
                                  aria-label="With textarea"
                                  id="os materiais"
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                          ref={closeRegisterModal}
                        >
                          Fechar
                        </button>
                        <button
                          type="submit"
                          form="form_register"
                          className="btn btn-primary"
                          disabled={loadingCreateRegister}
                        >
                          {loadingCreateRegister ? (
                      <div
                        className="spinner-border text-light spinner-border-sm"
                        role="status"
                      >
                        <span className="sr-only"></span>
                      </div>
                    ) : (
                      "Criar máquina"
                    )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="modal fade"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                id="ShareModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Compartilhar
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
                          <QRCode
                            value={window.location.href}
                            eyeRadius={[
                              [10, 10, 0, 10], // top/left eye
                              [10, 10, 10, 0], // top/right eye
                              [10, 0, 10, 10], // bottom/left
                            ]}
                            logoImage="../../favicon.svg"
                            logoWidth="50"
                            size="250"
                          />
                        </form>
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
            </div>
          </div>
        </div>
      ) : (
        <ErrorPage />
      )}
    </div>
  );
}
