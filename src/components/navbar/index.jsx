import * as React from "react";
import "./style.css";
import { toast } from "react-hot-toast";

import { useFirebaseAuth } from "../FirebaseProvider";
import { Login, Logout } from "../../utils/LogUtils";

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
          src="./../../../public/google-logo.png"
        />
        Entrar com Google
      </button>
    </div>
  );
}

function MakeLogout(e){
  e.preventDefault();
  let logout = Logout();
  if (logout === undefined) {
    toast.success("Logout realizado com sucesso!", {
      duration: 4000,
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
};


function ActionProfile() {
  const user = useFirebaseAuth();

  return (
    <div>
      <a
        href="#"
        className="d-block link-light text-decoration-none dropdown-toggle show"
        id="dropdownUser1"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        aria-expanded="true"
      >
        <img
          src={user?.photoURL}
          alt="mdo"
          width="40"
          height="40"
          referrerPolicy="no-referrer"
          className="rounded-circle"
        />
      </a>
    </div>
  );
}

//lg
export default function Navbar() {
  const user = useFirebaseAuth();

  return (
    <div>
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Opções
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <button type="button" data-bs-dismiss="modal" className="btn btn-primary w-100 " onClick={MakeLogout}>Sair</button>
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark px-0 px-sm-5">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="d-block d-md-none ">
            {user == undefined ? <ActionLogin /> : <ActionProfile />}
          </div>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand d-none d-md-block" href="#">
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
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Máquinas
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/me">
                  Perfil
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="d-none d-md-block text-nowrap">
          {user == undefined ? <ActionLogin /> : <ActionProfile />}
        </div>
      </nav>
    </div>
  );
}
