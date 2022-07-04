import * as React from "react";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { QRCode } from "react-qrcode-logo";

import { GetData } from "../../utils/FireConnection";
import ErrorPage from "../../components/404";
import LoadingPage from "../../components/Loading";

export default function CaRdView() {
  const componentRef = React.useRef();
  const component2Ref = React.useRef();
  const params = useParams();

  const [data, setData] = React.useState({});
  const [owner, setOwner] = React.useState({});
  const [machineInfo, setMachineInfo] = React.useState({});

  const [loading, setLoading] = React.useState(true);

  const GetRegisterOwnerInfo = async () => {
    let dt = await GetData(params.user, "users");
    setOwner(dt);
  };

  const GetMachineInfo = async () => {
    let dt = await GetData(params.machineName, "machines");
    setMachineInfo(dt);
  };

  const GetInfo = async () => {
    let dt = await GetData(params.register, "registers");
    setData(dt);
    setLoading(false);
  };

  React.useEffect(() => {
    GetInfo();
    GetRegisterOwnerInfo();
    GetMachineInfo();
  }, []);

  return (
    <div className="d-flex justify-content-center text-center">
      {loading ? (
        <LoadingPage />
      ) : data ? (
        <div>
          <ReactToPrint
            trigger={() => (
              <button type="button" className="btn btn-outline-primary">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 30 30"
                  data-name="24 - Save"
                  className="me-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#033a8e"
                >
                  <path
                    data-name="Path 272"
                    d="M30 9.652a3 3 0 0 0-.962-2.2L21.854.8a3 3 0 0 0-2.038-.8H3a3 3 0 0 0-3 3v24a3 3 0 0 0 3 3h24a3 3 0 0 0 3-3Zm-2 0V27a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16.816a1 1 0 0 1 .68.266l7.183 6.652a1 1 0 0 1 .321.734Z"
                    fillRule="evenodd"
                  />
                  <path
                    data-name="Path 273"
                    d="M16 1a1 1 0 0 0-1-1H6.6a1 1 0 0 0-1 1v2.667a3 3 0 0 0 3 3H13a3 3 0 0 0 3-3V1Zm-2 1v1.667a1 1 0 0 1-1 1H8.6a1 1 0 0 1-1-1V2H14Z"
                    fillRule="evenodd"
                  />
                  <path
                    data-name="Path 274"
                    d="M22.215 21.667a3 3 0 0 0-3-3h-8.43a3 3 0 0 0-3 3V29a1 1 0 0 0 1 1h12.43a1 1 0 0 0 1-1Zm-2 0V28H9.785v-6.333a1 1 0 0 1 1-1h8.43a1 1 0 0 1 1 1Z"
                    fillRule="evenodd"
                  />
                </svg>
                Imprimir
              </button>
            )}
            content={() => componentRef.current}
          />
          <div>
            <div className="">
              {/* Solicitação de serviço */}
              {data && (
                <div ref={componentRef}>
                  <div className="border mt-2 rounded-2 mx-2 text-center">
                    <h1 className="text-black m-2">Solicitação de Serviço</h1>
                    <div className="">
                      <p>
                        <strong>Solicitante: </strong>
                        {data && data.ss["solicitante"]}
                      </p>
                      <p>
                        <strong>Setor: </strong>
                        {data && data.ss["setor"]}
                      </p>
                      <p>
                        <strong>Tipo de manutenção: </strong>
                        {data && data.ss["tipoManutencao"]}
                      </p>
                      <p>
                        <strong>Responsável: </strong>
                        {data && data.ss["responsavel"]}
                      </p>
                      <p>
                        <strong>Prioridade: </strong>
                        {data && data.ss["prioridade"]}
                      </p>
                      <p>
                        <strong>Máquina: </strong>
                        {data && data.ss["maquina"]}
                      </p>
                      <p>
                        <strong>Financeiro: </strong>
                        {data && data.ss["financeiro"]}
                      </p>
                      <p>
                        <strong>Prazo: </strong>
                        {data && data.ss["dh-prazo"].replace("T", " , ")}
                      </p>
                      <p>
                        <strong>Data e Hora parou: </strong>
                        {data && data.ss["dh-parou"].replace("T", " , ")}
                      </p>
                      <p>
                        <strong>Data e Hora funcionou: </strong>
                        {data && data.ss["dh-functionou"].replace("T", " , ")}
                      </p>
                      <p>
                        <strong>Controle de custss: </strong>
                        {data && data.ss["controle-custo"]}
                      </p>
                      <p>
                        <strong>Descrição: </strong>
                        {data && data.ss["descricao"]}
                      </p>
                    </div>
                  </div>
                  <div className="m-5 text-center">
                    <p className="h6">
                      Registro de:{" "}
                      <a
                        className="text-decoration-none"
                        href={`/${params.user}`}
                      >
                        {owner && owner.username}
                      </a>{" "}
                      em{" "}
                      {data &&
                        data.createdTimestamp
                          .toDate()
                          .toLocaleDateString("pt-BR")}
                      , as{" "}
                      {data &&
                        data.createdTimestamp
                          .toDate()
                          .toLocaleTimeString("pt-BR")}
                    </p>
                    <p className="h6">
                      Email:{" "}
                      <a className="text-decoration-none">
                        {owner && owner.email}
                      </a>
                    </p>
                    <p className="h6">
                      Máquina de destino:{" "}
                      <a
                        className="text-decoration-none"
                        href={`/${params.user}/${params.machineName}`}
                      >
                        {machineInfo && machineInfo.title}
                      </a>
                    </p>

                    <QRCode
                      value={window.location.href}
                      eyeRadius={[
                        [10, 10, 0, 10], // top/left eye
                        [10, 10, 10, 0], // top/right eye
                        [10, 0, 10, 10], // bottom/left
                      ]}
                      logoImage="/favicon.svg"
                      logoWidth="50"
                      size="200"
                    />
                  </div>
                </div>
              )}
              {/* Ordem de serviço */}
              <ReactToPrint
                trigger={() => (
                  <button type="button" className="btn btn-outline-primary">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 30 30"
                      data-name="24 - Save"
                      className="me-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#033a8e"
                    >
                      <path
                        data-name="Path 272"
                        d="M30 9.652a3 3 0 0 0-.962-2.2L21.854.8a3 3 0 0 0-2.038-.8H3a3 3 0 0 0-3 3v24a3 3 0 0 0 3 3h24a3 3 0 0 0 3-3Zm-2 0V27a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16.816a1 1 0 0 1 .68.266l7.183 6.652a1 1 0 0 1 .321.734Z"
                        fillRule="evenodd"
                      />
                      <path
                        data-name="Path 273"
                        d="M16 1a1 1 0 0 0-1-1H6.6a1 1 0 0 0-1 1v2.667a3 3 0 0 0 3 3H13a3 3 0 0 0 3-3V1Zm-2 1v1.667a1 1 0 0 1-1 1H8.6a1 1 0 0 1-1-1V2H14Z"
                        fillRule="evenodd"
                      />
                      <path
                        data-name="Path 274"
                        d="M22.215 21.667a3 3 0 0 0-3-3h-8.43a3 3 0 0 0-3 3V29a1 1 0 0 0 1 1h12.43a1 1 0 0 0 1-1Zm-2 0V28H9.785v-6.333a1 1 0 0 1 1-1h8.43a1 1 0 0 1 1 1Z"
                        fillRule="evenodd"
                      />
                    </svg>
                    Imprimir
                  </button>
                )}
                content={() => component2Ref.current}
              />
              <div ref={component2Ref}>
                <div className="border mt-2 rounded-2 mx-2 text-center">
                  <h1 className="text-black m-2 ">Ordem de Serviço</h1>
                  <p className="h3 mb-4">{machineInfo.title}</p>
                  <div className="">
                    <p>
                      <strong>Causa: </strong>
                      {data && data.os["causa"]}
                    </p>
                    <p>
                      <strong>Executante: </strong>
                      {data && data.os["executante"]}
                    </p>
                    <p>
                      <strong>Data e Hora de Início: </strong>
                      {data && data.os["dh-inicio"].replace("T", " , ")}
                    </p>
                    <p>
                      <strong>Data e Hora de Término: </strong>
                      {data && data.os["dh-termino"].replace("T", " , ")}
                    </p>
                    <p>
                      <strong>Tempo: </strong>
                      {data && data.os["tempo"]}
                    </p>
                    <p>
                      <strong>Descrição: </strong>
                      {data && data.os["descrição"]}
                    </p>
                    <p>
                      <strong>Materiais: </strong>
                      {data && data.os["materiais"]}
                    </p>
                  </div>
                </div>
                <div className="m-5 text-center">
                  <p className="h6">
                    Registro de:{" "}
                    <a
                      className="text-decoration-none"
                      href={`/${params.user}`}
                    >
                      {owner && owner.username}
                    </a>{" "}
                    em{" "}
                    {data &&
                      data.createdTimestamp
                        .toDate()
                        .toLocaleDateString("pt-BR")}
                    , as{" "}
                    {data &&
                      data.createdTimestamp
                        .toDate()
                        .toLocaleTimeString("pt-BR")}
                  </p>
                  <p className="h6">
                    Email:{" "}
                    <a className="text-decoration-none">
                      {owner && owner.email}
                    </a>
                  </p>
                  <p className="h6">
                    Máquina de destino:{" "}
                    <a
                      className="text-decoration-none"
                      href={`/${params.user}/${params.machineName}`}
                    >
                      {machineInfo && machineInfo.title}
                    </a>
                  </p>

                  <QRCode
                    value={window.location.href}
                    eyeRadius={[
                      [10, 10, 0, 10], // top/left eye
                      [10, 10, 10, 0], // top/right eye
                      [10, 0, 10, 10], // bottom/left
                    ]}
                    logoImage="/favicon.svg"
                    logoWidth="50"
                    size="200"
                  />
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
