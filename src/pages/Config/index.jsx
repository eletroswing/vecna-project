import * as React from "react";
import { useParams } from "react-router-dom";
import { useFirebaseAuth } from "../../components/FirebaseProvider";

import Error from "../../components/404";
import LoadingPage from "../../components/Loading";
import toast from "react-hot-toast";
import { CreateOrUpdateData, GetData } from "../../utils/FireConnection";

import InputMask from "react-input-mask";

function Content({
  title,
  placeholder = "",
  type = "text",
  notShow,
  set = false,
  value = "",
  mask = "",
  name,
}) {
  const [active, setActive] = React.useState(set);
  const [defVal, setValue] = React.useState(value);

  return (
    <div className="w-full d-flex justify-content-between">
      <div className="d-flex justify-content-center mt-2 ms-2">
        <p className="pe-2">
          <strong>{title}</strong>
        </p>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            id={`${name}_check`}
            type="checkbox"
            role="switch"
            value={active}
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
          />
        </div>
      </div>
      <div className="w-100">
        <InputMask
          type={type}
          className="form-control w-75 m-auto"
          aria-describedby="basic-addon3"
          placeholder={placeholder}
          mask={mask}
          required={active}
          id={`${name}_input`}
          value={defVal}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={notShow ? true : !active}
        />
      </div>
    </div>
  );
}

/*
(
        <div>
          <div className="px-4 py-5 my-5 text-center">
            <img
              className="d-block mx-auto mb-4"
              src="https://cdn.pixabay.com/photo/2015/12/16/17/41/bell-1096280_960_720.png"
              alt=""
              width="72"
              height="72"
            />
            <h1 className="display-5 fw-bold">Centro de Notificações</h1>
            <div className="col-lg-6 mx-auto pt-4">
              <div className="d-grid d-sm-flex flex-column justify-content-sm-center">
                <Content
                  title="WhatsApp:"
                  placeholder="+55 (ddd) x xxxx-xxxx"
                  type="tel"
                />
                <Content
                  title="E-mail:"
                  placeholder="email@email.com"
                  type="email"
                />
                <Content title="Aplicativo:" notShow />
                <Content
                  title="SMS:"
                  placeholder="+55 (ddd) x xxxx-xxxx"
                  type="tel"
                />
              </div>
            </div>
          </div>
        </div>
      ) */

export default function NotificationsEdit() {
  const params = useParams();
  const user = useFirebaseAuth();

  const [loading, setLoading] = React.useState(false);
  const [saveLoading, setSaveLoading] = React.useState(false);
  const [configs, setConfigs] = React.useState({});
  const closeModalButton = React.useRef();

  const GetUserInfo = async () => {
    let data = await GetData(user.uid, "users");
    if (data) {
      if(data.configs){
        setConfigs(data.configs);
      }else{
        let newConf = {
          notification: {
            whatsapp: {
              value: false,
              data: ''
            },
            sms: {
              value: false,
              data: ''
            },
            email: {
              value: false,
              data: ''
            }
          }
        }
        setConfigs(newConf)
        await CreateOrUpdateData(
          user.uid,
          {
            configs: newConf,
          },
          "users"
        )
      }
    }
  };

  React.useEffect(() => {
    if (user) {
      setLoading(true);
      GetUserInfo();
      setLoading(false);
    }else{
      setConfigs({})
    }
  }, [user]);

  const SaveConfigs = async (e) => {
    var ConfigToSave = {};
    let data = [...e.target];

    setSaveLoading(true);

    try {
      data.forEach((element) => {
        let scope = element.id.split("_");
        if (element.nodeName == "INPUT") {
          if (element.type == "checkbox") {
            if (!ConfigToSave[scope[0]]) ConfigToSave[scope[0]] = {};
            if (!ConfigToSave[scope[0]][scope[1]])
              ConfigToSave[scope[0]][scope[1]] = {};
            if (!ConfigToSave[scope[0]][scope[1]]["value"])
              ConfigToSave[scope[0]][scope[1]]["value"] =
                element.value == "true" ? true : false;
          } else {
            if (!ConfigToSave[scope[0]]) ConfigToSave[scope[0]] = {};
            if (!ConfigToSave[scope[0]][scope[1]])
              ConfigToSave[scope[0]][scope[1]] = {};
            if (!ConfigToSave[scope[0]][scope[1]]["data"])
              ConfigToSave[scope[0]][scope[1]]["data"] = element.value;
          }
        }
      });

      //save
      setConfigs(ConfigToSave);
      if (ConfigToSave) {
        await CreateOrUpdateData(
          user.uid,
          {
            configs: ConfigToSave,
          },
          "users"
        ).then(() => {
          toast.success(`Configurações salvas com sucesso!`, {
            duration: 3000,
            style: {
              background: "#333",
              color: "#fff",
            },
          });
          closeModalButton.current.click();
        });
      }
    } catch (e) {
      console.log(e);
      toast.error(`Erro ao salvar configurações!`, {
        duration: 3000,
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <LoadingPage />
      ) : user ? (
        <div className="container px-4 py-5" id="featured-3">
          <div
            className="modal fade"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            id={`ModalNotification`}
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Salvar
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
                      <h3>Deseja salvar alterações?</h3>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <div className="d-flex justify-content-end">
                      <button
                        type="button"
                        data-bs-dismiss="modal"
                        className="btn btn-outline-danger me-2"
                        ref={closeModalButton}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        form="form_config"
                        className="btn btn-outline-success ms-2 me-2"
                        disabled={saveLoading}
                      >
                        {saveLoading ? (
                          <div
                            className="spinner-border text-primary spinner-border-sm"
                            role="status"
                          >
                            <span className="sr-only"></span>
                          </div>
                        ) : (
                          "Salvar"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form
            id="form_config"
            onSubmit={(e) => {
              e.preventDefault();
              SaveConfigs(e);
            }}
          >
            <h2 className="pb-2 border-bottom">Notificações</h2>

            <div className="row g-4 row-cols-1 row-cols-lg-3">
              {Object.keys(configs).length != 0 && (
                <div className="w-100">
                  <Content
                    title="WhatsApp:"
                    name="notification_whatsapp"
                    type="tel"
                    placeholder="(+55) (dd) x xxxx-xxxx"
                    mask="+99 (99) 9 9999-9999"
                    set={configs.notification.whatsapp.value}
                    value={configs.notification.whatsapp.data}
                  />
                  <Content
                    name="notification_email"
                    title="Email:"
                    type="email"
                    notShow
                    set={configs.notification.email.value}
                  />
                </div>
              )}
            </div>
          </form>
          <div
            style={{
              position: "fixed",
              bottom: 0,
              right: 0,
              padding: 40,
            }}
          >
            <a data-bs-toggle="modal" data-bs-target={`#ModalNotification`}>
              <svg
                width="2rem"
                height="2rem"
                fill="#0044ff"
                viewBox="-32 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  filter: "drop-shadow(2px 2px 8px #0000005e)",
                }}
              >
                <path d="m433.941 129.941-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z" />
              </svg>
            </a>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}
