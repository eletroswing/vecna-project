import * as React from "react";
import "./style.css";
import { Link, useLocation } from "react-router-dom";
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
          src="https://imagensemoldes.com.br/wp-content/uploads/2020/04/imagem-google-logo-com-fundo-transparente-1.png"
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
        console.log(e);
        if (location.pathname === e.to) {
          return (
            <Link
              class="nav-link text-white active"
              aria-current="page"
              to={e.to}
            >
              {e.name}
            </Link>
          );
        }else{
          return (
            <Link
              class="nav-link text-white-50"
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
      <div class="dropdown text-end">
        <a
          href="#"
          class="d-block link-light text-decoration-none dropdown-toggle show"
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
            class="rounded-circle"
          />
        </a>
        <ul
          class="dropdown-menu text-small"
          aria-labelledby="dropdownUser1"
          data-popper-placement="bottom-end"
        >
          <li>
            <a class="dropdown-item" href="" onClick={MakeLogout}>
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

//lg
export default function Navbar() {
  const user = useFirebaseAuth();

  return (
    <div>
      <nav class="p-3 mb-3 bg-dark border-bottom">
        <div class="container-fluid">
          <div class="d-flex flex-wrap align-items-center justify-content-start">
            <div className="nav col-auto me-auto mb-2 justify-content-center mb-md-0 px-3">
              <a
                class="btn btn-outline-dark text-white-50 d-block d-sm-none"
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
                  class="feather feather-menu"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </a>
              <div className="d-none d-sm-block">
                <div className="d-flex flex-row">
                  <a className="text-white ps-3" href="#">
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
                  <nav class="nav">
                    <ReturnLinks className="d-flex flex-row" />
                  </nav>
                </div>
              </div>
            </div>
            {user == undefined ? <ActionLogin /> : <ActionProfile />}
          </div>
        </div>
        <div class="collapse" id="collapseExample">
          <nav class="nav d-block px-5">
            <ReturnLinks />
          </nav>
        </div>
      </nav>
    </div>
  );
}
