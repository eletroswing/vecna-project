import * as React from "react";
import { useParams } from "react-router-dom";
import { useFirebaseAuth } from "../../components/FirebaseProvider";

import Error from "../../components/404";

function Content({title, placeholder="", type="text", notShow}) {
    const [active, setActive] = React.useState(false)

  return (
   <div className="" >
     <div className="d-flex justify-content-center">
      <p className="pe-2"><strong>{title}</strong></p>
        <div className="form-check form-switch">
            <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            value={active}
            onChange={(e) => setActive(e.target.checked)}
            />
      </div>
    </div>
    {(active && !notShow) && <input type={type} className="form-control w-50 m-auto" id="basic-url" aria-describedby="basic-addon3" placeholder={placeholder} required />}
   </div>
  );
}

export default function NotificationsEdit() {
  const params = useParams();
  const user = useFirebaseAuth();

  const GetUserInfo = async () => {};

  React.useEffect(() => {
    GetUserInfo();
  }, []);

  return (
    <div>
      {user ? (
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
                <Content title="WhatsApp:" placeholder="+55 (ddd) x xxxx-xxxx" type="tel" />
                <Content title="E-mail:" placeholder="email@email.com" type="email" />
                <Content title="Aplicativo:" notShow />
                <Content title="SMS:" placeholder="+55 (ddd) x xxxx-xxxx" type="tel" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}
