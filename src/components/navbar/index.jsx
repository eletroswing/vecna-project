import * as React from "react";
import "./style.css";
import { toast } from 'react-hot-toast';

import { useFirebaseAuth } from "../FirebaseProvider";
import { Login, Logout } from "../../utils/LogUtils"

function ActionLogin() {
  const MakeLogin = () => {
    
    Login()
    
  }
  return (
    <div className="text-end">
      <button type="button" className="btn btn-outline-light me-2" onClick={MakeLogin}>
        Entrar com uma conta Google
      </button>
    </div>
  );
}

function ActionProfile() {
  const user = useFirebaseAuth();

  const MakeLogout = (e) => {
    e.preventDefault();
    let logout = Logout()
    if(logout === undefined){
      toast.success("Logout realizado com sucesso!", {
        duration: 4000,
        style: {
          background: '#333',
          color: '#fff',
        },
      })
    }else{
      toast.error("Não foi possível realizar o logout!", {
        duration: 4000,
        style: {
          background: '#333',
          color: '#fff',
        },
      })
    }
  }

  return (
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
          height="40"
          referrerPolicy="no-referrer"
          className="rounded-circle"
        />
      </a>
      <ul
        className="dropdown-menu text-small "
        aria-labelledby="dropdownUser1"
        data-popper-placement="bottom-start"
      >
        <li>
          <p className="h5 ms-3">
            {user?.displayName}
          </p>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <a className="dropdown-item" href="#" onClick={MakeLogout}>
            Sign out
          </a>
        </li>
      </ul>
    </div>
  );
}

export default function Navbar() {
  const user = useFirebaseAuth();
  
  return (
    <div>
      <header className="p-3 bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
            >
              <svg
                className="bi me-2 bi-wrench-adjustable-circle"
                width="50"
                height="40"
                role="img"
                aria-label="Bootstrap"
                fill="currentColor"
                viewBox="0 0 16 16"
                onClick={(e) => {e.preventDefault()}}
              >
                <path d="M12.496 8a4.491 4.491 0 0 1-1.703 3.526L9.497 8.5l2.959-1.11c.027.2.04.403.04.61Z"/>
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-1 0a7 7 0 1 0-13.202 3.249l1.988-1.657a4.5 4.5 0 0 1 7.537-4.623L7.497 6.5l1 2.5 1.333 3.11c-.56.251-1.18.39-1.833.39a4.49 4.49 0 0 1-1.592-.29L4.747 14.2A7 7 0 0 0 15 8Zm-8.295.139a.25.25 0 0 0-.288-.376l-1.5.5.159.474.808-.27-.595.894a.25.25 0 0 0 .287.376l.808-.27-.595.894a.25.25 0 0 0 .287.376l1.5-.5-.159-.474-.808.27.596-.894a.25.25 0 0 0-.288-.376l-.808.27.596-.894Z"/>
              </svg>
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <a href="/" className="nav-link px-2 text-secondary">
                  Home
                </a>
              </li>
              <li>
                <a href="/" className="nav-link px-2 text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="/" className="nav-link px-2 text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/" className="nav-link px-2 text-white">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/" className="nav-link px-2 text-white">
                  About
                </a>
              </li>
            </ul>

            {user == undefined ? <ActionLogin /> : <ActionProfile />}
          </div>
        </div>
      </header>
    </div>
  );
}
