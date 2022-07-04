import * as React from "react";
import "./style.css";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useFirebaseAuth } from "../FirebaseProvider";
import { Login, Logout } from "../../utils/LogUtils";

import { CreateOrUpdateData, UploadFile } from "../../utils/FireConnection";

import { v4 } from "uuid";

function ActionLogin() {
  const MakeLogin = () => {
    Login();
  };
  return (
    <div className="text-end">
      <button
        type="button"
        className="btn btn-outline-light me-2 justify-content-center"
        onClick={MakeLogin}
      >
        <img
          width="20px"
          className="me-2"
          src="/google.svg"
        />
        Entrar com Google
      </button>
    </div>
  );
}

function MakeLogout(e) {
  e.preventDefault();
  let logout = Logout();
  if (logout === undefined) {
    toast.success("Logout realizado com sucesso!", {
      duration: 3000,
      style: {
        background: "#333",
        color: "#fff",
      },
    });
  } else {
    toast.error("Não foi possível realizar o logout!", {
      duration: 4000,
      style: {
        background: "#333",
        color: "#fff",
      },
    });
  }
}

function ReturnLinks({ className }) {
  const location = useLocation();

  const links = [
    { name: "Máquinas", to: "/" },
    { name: "Perfil", to: "/me" },
  ];

  return (
    <div className={className}>
      {links.map((e) => {
        if (location.pathname === e.to) {
          return (
            <Link
              key={e.to}
              className="nav-link text-white active"
              aria-current="page"
              to={e.to}
            >
              {e.name}
            </Link>
          );
        } else {
          return (
            <Link
              key={e.to}
              className="nav-link text-white-50"
              aria-current="page"
              to={e.to}
            >
              {e.name}
            </Link>
          );
        }
      })}
    </div>
  );
}

function ActionProfile() {
  const user = useFirebaseAuth();
  return (
    <div>
      <div className="dropdown text-end">
        <a
          href="#"
          className="d-block link-light text-decoration-none dropdown-toggle show"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="true"
        >
          <img
            src={user?.photoURL}
            alt="mdo"
            width="40"
            referrerPolicy="no-referrer"
            height="40"
            className="rounded-circle"
          />
        </a>
        <ul
          className="dropdown-menu text-small"
          aria-labelledby="dropdownUser1"
          data-popper-placement="bottom-end"
        >
          <li>
            <a
              className="dropdown-item"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Criar Nova Máquina
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" onClick={MakeLogout}>
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function ModalLoading(props) {
  return (
    <div>
      <div className="modal-body">
        <div className="progress">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow={props.percentage}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: `${props.percentage}%` }}
          >
            {props.text}
          </div>
        </div>
      </div>
    </div>
  );
}

function EditableCollumn(props) {
  const [oilChild, setOilChild] = React.useState([]);
  let id = props.id;

  return (
    <div className="form-control border-0">
      <input
        type="input"
        className="form-control mb-2"
        placeholder="Titulo da coluna"
        id={`table title ${id}`}
        required
      />

      <div>
        {oilChild.map((item, index) => {
          return (
            <div key={index} className="mt-2 d-flex">
              {item.component}
              <div className="align-self-center">
                <button
                  type="button"
                  className="btn-close"
                  id={`info close ${item.id}`}
                  aria-label="Close"
                  onClick={(e) => {
                    let list = [...oilChild];
                    list.splice(index, 1);
                    setOilChild(list);
                  }}
                ></button>
              </div>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={(e) => {
          setOilChild([
            ...oilChild,
            {
              id: `table info ${id} ${oilChild.length}`,
              component: (
                <input
                  type="input"
                  className="form-control mb-2"
                  placeholder="Adicionar informação"
                  id={`table info ${id} ${oilChild.length}`}
                  required
                />
              ),
            },
          ]);
        }}
      >
        Adicionar linha
      </button>
    </div>
  );
}

export default function Navbar() {
  const user = useFirebaseAuth();
  const [isModalLoading, setModalLoading] = React.useState(false);
  const [LoadingPercentage, setLoadingPercentage] = React.useState(0);
  const [LoadingText, setLoadingText] = React.useState("carregando...");

  const [emailInput, setEmailInput] = React.useState([]);
  const [accordInput, setAccordInput] = React.useState([]);
  const [oilInformation, setOilInformation] = React.useState([]);

  const FilesRef = React.createRef();
  const ModelRef = React.createRef();

  const HandleFileChange = (e) => {
    let target = e.target.id;
    if (target == "model") {
      FilesRef.current.required = false;
    } else ModelRef.current.required = false;
  };

  const CreateMachine = async (e = null) => {
    if (e == null || e == undefined) return;

    //FIXME: Bug - quando é enviado somente imagens do carrossel, as imagens nao são mostradas - bug await 
    //FIXME: Bug - O icone de perfil demora muito pra carregar, botar um loading enqunato é carregado

    var PermEmails = [];
    var TableData = {};
    var Images = [];
    var glb = "";
    var Thumb = "";
    var MTitle = "";
    var AccorditionTitle = "";
    var AccorditionData = "";
    var Accorditions = [];
    var Notification = {};

    var DataToCreate = {};

    try {
      setModalLoading(true);

      setLoadingPercentage(5);
      setLoadingText("Começando o envio...");

      let data = [...e.target];
      data.forEach(async (element) => {
        if (
          element.nodeName == "INPUT" ||
          element.nodeName == "TEXTAREA" ||
          element.nodeName == "SELECT"
        ) {
          if (element.id == "title") {
            MTitle = element.value;
            setLoadingPercentage(10);
            setLoadingText("Titulo...");
          }
          if (
            element.id.split(" ")[0] == "notification" &&
            element.id.split(" ")[1] == "number"
          ) {
            Notification.number = element.value;
            setLoadingPercentage(15);
            setLoadingText("Notificações...");
          }
          if (
            element.id.split(" ")[0] == "notification" &&
            element.id.split(" ")[1] == "timespace"
          ) {
            Notification.timespace = element.value;
            setLoadingPercentage(15);
            setLoadingText("Notificações...");
          }
          if (element.id.split(" ")[0] == "email") {
            PermEmails.push(element.value);
            setLoadingPercentage(20);
            setLoadingText("Permissões...");
          }
          if (
            element.id.split(" ")[0] == "data" &&
            element.id.split(" ")[1] == "title"
          ) {
            AccorditionTitle = element.value;
            setLoadingPercentage(25);
            setLoadingText("Titulo das instruções...");
          }
          if (
            element.id.split(" ")[0] == "data" &&
            element.id.split(" ")[1] == "obs"
          ) {
            AccorditionData = element.value;
            setLoadingPercentage(25);
            setLoadingText("Explicação das instruções...");
          }
          if (AccorditionData !== "" && AccorditionTitle !== "") {
            setLoadingPercentage(30);
            setLoadingText("Adicionando a lista...");
            Accorditions.push({
              title: AccorditionTitle,
              data: AccorditionData,
            });
            AccorditionTitle = "";
            AccorditionData = "";
          }
          if (element.id == "files") {
            setLoadingPercentage(35);
            setLoadingText("Enviando as fotos...");
            if (element.files) {
              let files = [...element.files];
              files.forEach(async (file, index) => {
                setLoadingText(`Enviando as fotos ${index}...`);
                let reference = `${user.uid}/${v4() + v4()}`;
                Images.push(reference);
                await UploadFile(reference, file);
              });
            }
          }
          if (
            element.id.split(" ")[0] == "table" &&
            element.id.split(" ")[1] == "title"
          ) {
            TableData[element.id.split(" ")[2]] = {title: element.value, child: []};
          }
  
          if (
            element.id.split(" ")[0] == "table" &&
            element.id.split(" ")[1] == "info"
          ) {
            TableData[element.id.split(" ")[2]].child.push(element.value)
          }
          if (element.id == "thumbnail") {
            setLoadingPercentage(70);
            setLoadingText("Enviando a thumbnail...");
            if (element.files[0]) {
              let file = element.files[0];
              let reference = `${user.uid}/${v4() + v4()}`;
              Thumb = reference;
              await UploadFile(reference, file);
            }
          }
          if (element.id == "model") {
            if (element.files[0]) {
              setLoadingPercentage(80);
              setLoadingText("Enviando o arquivo 3d...");
              let file = element.files[0];
              let reference = `${user.uid}/${v4() + v4()}`;
              glb = reference;
              await UploadFile(reference, file);
            }
          }
        }
      });
      let newId = v4() + v4() + v4() + v4();
      setLoadingPercentage(90);
      setLoadingText("Gerando os dados...");
      DataToCreate = {
        permissions: PermEmails,
        tableInformation: TableData,
        images: [...Images],
        glb: glb,
        thumbnail: Thumb,
        title: MTitle,
        accorditions: Accorditions,
        notification: Notification,
        id: newId,
        ownerId: user.uid,
        ownerEmail: user.email,
      };

      setLoadingPercentage(99);
      setLoadingText("Criando no servidor...");
      await CreateOrUpdateData(newId, DataToCreate, "machines");

      setLoadingPercentage(100);
      setLoadingText("Enviado!");

      setModalLoading(false);
      toast.success("Máquina criada com sucesso!", {
        duration: 3000,
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    } catch (e) {
      setLoadingPercentage(0);
      setModalLoading(false);
      toast.error("Houve um erro ao criar a máquina!", {
        duration: 3000,
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div id="Container">
      <div
        className="modal fade"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Criar uma Nova Máquina
              </h5>
              {isModalLoading ? (
                <div />
              ) : (
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              )}
            </div>
            {isModalLoading ? (
              <ModalLoading percentage={LoadingPercentage} text={LoadingText} />
            ) : (
              <div>
                <div className="modal-body">
                  <form
                    id="form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      CreateMachine(e);
                    }}
                  >
                    <div className="mb-3">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Nome da máquina:
                      </label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        id="title"
                        placeholder="..."
                      />
                    </div>
                    <div className="">
                      <div className="mb-3">
                        <label htmlFor="thumbnail" className="col-form-label">
                          Thumbnail:
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          className="form-control"
                          id="thumbnail"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="files" className="col-form-label">
                          Imagens:
                        </label>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          className="form-control"
                          id="files"
                          placeholder="..."
                          ref={FilesRef}
                          onChange={HandleFileChange}
                          required={true}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="message-text"
                          className="col-form-label"
                        >
                          Arquivos 3d:
                        </label>
                        <input
                          type="file"
                          accept=".glb"
                          onChange={HandleFileChange}
                          className="form-control"
                          id="model"
                          placeholder="..."
                          ref={ModelRef}
                          required={true}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="col-form-label">
                          Notificar a cada:
                        </label>
                        <div className="d-flex">
                          <select
                            className="form-select me-2"
                            aria-label="Default select example"
                            id="notification number"
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
                            aria-label="Default select example"
                            id="notification timespace"
                          >
                            <option value="1">dia(s)</option>
                            <option defaultValue value="2">
                              semana(as)
                            </option>
                            <option value="3">mês(es)</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                          Emails Permitidos:
                        </label>
                        {emailInput.map((component, index) => {
                          return (
                            <div key={component.id} className="d-flex">
                              {component.component}
                              <div className="align-self-center">
                                <button
                                  type="button"
                                  className="btn-close"
                                  id={`EmailClose${component.id}`}
                                  aria-label="Close"
                                  onClick={(e) => {
                                    let list = [...emailInput];
                                    list.splice(index, 1);
                                    setEmailInput(list);
                                  }}
                                ></button>
                              </div>
                            </div>
                          );
                        })}
                        <div className="form-control border-0">
                          <button
                            type="button"
                            className="btn btn-primary btn-sm mt-2"
                            onClick={(e) => {
                              e.preventDefault();
                              let id_for_input = v4();
                              setEmailInput([
                                ...emailInput,
                                {
                                  id: id_for_input,
                                  component: (
                                    <input
                                      type="email"
                                      className="form-control mt-2 mb-2"
                                      id={`email ${id_for_input}`}
                                      required
                                      placeholder="email@email.com  "
                                    />
                                  ),
                                },
                              ]);
                            }}
                          >
                            Adicionar Email
                          </button>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                          Instruções:
                        </label>
                        {accordInput.map((component, index) => {
                          return (
                            <div key={component.id} className="d-flex">
                              <div className="form-control mt-2">
                                {component.componentTitle}
                                {component.componentData}
                              </div>
                              <div className="align-self-center">
                                <button
                                  type="button"
                                  className="btn-close"
                                  id={`EmailClose${component.id}`}
                                  aria-label="Close"
                                  onClick={(e) => {
                                    let list = [...accordInput];
                                    list.splice(index, 1);
                                    setAccordInput(list);
                                  }}
                                ></button>
                              </div>
                            </div>
                          );
                        })}
                        <div className="form-control border-0">
                          <button
                            type="button"
                            className="btn btn-primary btn-sm mt-2"
                            onClick={(e) => {
                              e.preventDefault();
                              let id_for_input = v4();
                              setAccordInput([
                                ...accordInput,
                                {
                                  id: id_for_input,
                                  componentTitle: (
                                    <div className="form-control border-0">
                                      <input
                                        type="input"
                                        className="form-control mb-2"
                                        id={`data title ${id_for_input}`}
                                        placeholder="Titulo da instrução"
                                        required
                                      />
                                    </div>
                                  ),
                                  componentData: (
                                    <div className="form-control border-0">
                                      <textarea
                                        type="input"
                                        className="form-control mb-2"
                                        id={`data obs ${id_for_input}`}
                                        placeholder="Dados da instrução"
                                        required
                                      />
                                    </div>
                                  ),
                                },
                              ]);
                            }}
                          >
                            Adicionar Instrução
                          </button>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                          Informação de lubrificação:
                        </label>
                        {oilInformation.map((component, index) => {
                          return (
                            <div key={component.id} className="d-flex">
                              <div className="form-control mt-2">
                                {component.component}
                              </div>
                              <div className="align-self-center">
                                <button
                                  type="button"
                                  className="btn-close"
                                  id={`table component ${component.id}`}
                                  aria-label="Close"
                                  onClick={(e) => {
                                    let list = [...oilInformation];
                                    list.splice(index, 1);
                                    setOilInformation(list);
                                  }}
                                ></button>
                              </div>
                            </div>
                          );
                        })}
                        <div className="form-control border-0">
                          <button
                            type="button"
                            className="btn btn-primary btn-sm mt-2"
                            onClick={(e) => {
                              e.preventDefault();
                              let id_for_input = v4();
                              setOilInformation([
                                ...oilInformation,
                                {
                                  id: id_for_input,
                                  component: (
                                    <div className="form-control border-0">
                                      <EditableCollumn id={`${id_for_input}`} />
                                    </div>
                                  ),
                                },
                              ]);
                            }}
                          >
                            Adicionar Campo de tabela
                          </button>
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
                  >
                    Fechar
                  </button>
                  <button type="submit" form="form" className="btn btn-primary">
                    Criar máquina
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <nav className="p-3 mb-5 bg-dark border-bottom fixed-top user-select-none">
        <div className="container-fluid">
          <div className="d-flex flex-wrap align-items-center justify-content-start">
            <div className="nav col-auto me-auto mb-2 justify-content-center mb-md-0 px-3">
              <a
                className="btn btn-outline-dark text-white-50 d-block d-sm-none"
                data-bs-toggle="collapse"
                href="#collapseExample"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                <svg
                  width="32px"
                  height="32px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="feather feather-menu"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </a>
              <div className="d-none d-sm-block">
                <div className="d-flex flex-row">
                  <a className="text-white ps-3">
                    <svg
                      className="bi me-2 bi-wrench-adjustable-circle"
                      width="50"
                      height="40"
                      role="img"
                      aria-label="Bootstrap"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <path d="M12.496 8a4.491 4.491 0 0 1-1.703 3.526L9.497 8.5l2.959-1.11c.027.2.04.403.04.61Z" />
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-1 0a7 7 0 1 0-13.202 3.249l1.988-1.657a4.5 4.5 0 0 1 7.537-4.623L7.497 6.5l1 2.5 1.333 3.11c-.56.251-1.18.39-1.833.39a4.49 4.49 0 0 1-1.592-.29L4.747 14.2A7 7 0 0 0 15 8Zm-8.295.139a.25.25 0 0 0-.288-.376l-1.5.5.159.474.808-.27-.595.894a.25.25 0 0 0 .287.376l.808-.27-.595.894a.25.25 0 0 0 .287.376l1.5-.5-.159-.474-.808.27.596-.894a.25.25 0 0 0-.288-.376l-.808.27.596-.894Z" />
                    </svg>
                  </a>
                  <nav className="nav">
                    <ReturnLinks className="d-flex flex-row" />
                  </nav>
                </div>
              </div>
            </div>
            {user == undefined ? <ActionLogin /> : <ActionProfile />}
          </div>
        </div>
        <div className="collapse" id="collapseExample">
          <nav className="nav d-block px-5">
            <ReturnLinks />
          </nav>
        </div>
      </nav>
    </div>
  );
}
