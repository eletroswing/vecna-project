import * as React from "react";

export default function News() {
  return (
    <div style={{overflowX: "hidden"}}>
      <div className="container col-xxl-8 px-4 pt-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src="https://getbootstrap.com/docs/5.2/examples/heroes/bootstrap-themes.png"
              className="d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold lh-1 mb-3">
              Projeto XXXXX: A revolução da manutenção industrial.
            </h1>
            <p className="lead">
              Pensado de manutentores, para outros, procurando aumentar a
              facilidade ao registrar manutenções mecânicas em máquinas
              indústriais e fazer um upgrade em seus registros.
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <a href="#prices">
                <button
                  type="button"
                  className="btn btn-primary btn-lg px-4 me-md-2"
                >
                  Precificação
                </button>
              </a>
              <a href="#sobre">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-lg px-4"
                >
                  Sobre
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div id="sobre" className="row align-items-md-stretch p-5">
        <div className="col-md-6 mt-3 mb-2">
          <div className="h-100 p-5 bg-light border rounded-3">
            <h2>Fácil de usar!</h2>
            <p>
              &emsp; A aplicação foi pensada para ser ultilizada da melhor e mais fácil forma possível, funcionando em qualquer plataforma e dispensando a necessidade de um treinamento ao manutentor. 
              <br />
              &emsp; Foi pensado para conectar donos de máquinas e manutentores, independende da empresa ou do equipamento, tornando assim, uma ferramenta transparente com seu público.
            </p>
          </div>
        </div>
        <div className="col-md-6 mt-3 mb-2">
          <div className="h-100 p-5 bg-light border rounded-3">
            <h2>Notas de atualização</h2>
            <p>
              &emsp; - Adicionado a página: para configurar notificações <br />
              &emsp; - Adicionado a página: news <br />
              &emsp; - Adicionado acesso ao menu: link para a página news <br />
              &emsp; - Adicionado acesso ao menu de contexto: acesso para a página notificações <br />
              &emsp; - Em desenvolvimento: Precificação <br />
              &emsp; - Em desenvolvimento: Notificação <br />
              &emsp; - Em desenvolvimento: Otimização <br />
              &emsp; - Em desenvolvimento: Edição das máquinas e dos cards <br />
              &emsp; - Em desenvolvimento: Mudança no design dos cards <br />
              &emsp; - Estilização: Agora o menu de dispositivos móveis é adaptado ao dispositivo pela lateral <br />
            </p>
          </div>
        </div>
      </div>
      <div className="container px-4 py-5" id="hanging-icons">
        <h2 className="pb-2 border-bottom">Visão, diferenciais e conduta</h2>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="col d-flex align-items-start">
            <div className="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-toggles2"
              >
                <path d="M9.465 10H12a2 2 0 1 1 0 4H9.465c.34-.588.535-1.271.535-2 0-.729-.195-1.412-.535-2z" />
                <path d="M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 1a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm.535-10a3.975 3.975 0 0 1-.409-1H4a1 1 0 0 1 0-2h2.126c.091-.355.23-.69.41-1H4a2 2 0 1 0 0 4h2.535z" />
                <path d="M14 4a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
              </svg>
            </div>
            <div>
              <h2>Visão</h2>
              <p>
                Se tornar referência na indústria pela qualidade da ferramenta e ser, além de amplamente adotada, ser amplamente elogiada e melhorada cada vez mais.
              </p>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <div className="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-cpu-fill"
              >
                <path d="M6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
                <path d="M5.5.5a.5.5 0 0 0-1 0V2A2.5 2.5 0 0 0 2 4.5H.5a.5.5 0 0 0 0 1H2v1H.5a.5.5 0 0 0 0 1H2v1H.5a.5.5 0 0 0 0 1H2v1H.5a.5.5 0 0 0 0 1H2A2.5 2.5 0 0 0 4.5 14v1.5a.5.5 0 0 0 1 0V14h1v1.5a.5.5 0 0 0 1 0V14h1v1.5a.5.5 0 0 0 1 0V14h1v1.5a.5.5 0 0 0 1 0V14a2.5 2.5 0 0 0 2.5-2.5h1.5a.5.5 0 0 0 0-1H14v-1h1.5a.5.5 0 0 0 0-1H14v-1h1.5a.5.5 0 0 0 0-1H14v-1h1.5a.5.5 0 0 0 0-1H14A2.5 2.5 0 0 0 11.5 2V.5a.5.5 0 0 0-1 0V2h-1V.5a.5.5 0 0 0-1 0V2h-1V.5a.5.5 0 0 0-1 0V2h-1V.5zm1 4.5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3A1.5 1.5 0 0 1 6.5 5z" />
              </svg>
            </div>
            <div>
              <h2>Diferenciais</h2>
              <p>
                Uma ferramenta diferente de tudo já visto, pois não é focada na empresa, e sim no manutentor, ajudando no registro das manutenções, realização do plano de manutenção, contato entre manutentores, etc
              </p>
              
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <div className="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M5.33 3.271a3.5 3.5 0 0 1 4.472 4.474L20.647 18.59l-2.122 2.121L7.68 9.867a3.5 3.5 0 0 1-4.472-4.474L5.444 7.63a1.5 1.5 0 1 0 2.121-2.121L5.329 3.27zm10.367 1.884 3.182-1.768 1.414 1.414-1.768 3.182-1.768.354-2.12 2.121-1.415-1.414 2.121-2.121.354-1.768zm-7.071 7.778 2.121 2.122-4.95 4.95A1.5 1.5 0 0 1 3.58 17.99l.097-.107 4.95-4.95z" />
              </svg>
            </div>
            <div>
              <h2>Conduta</h2>
              <p>
                Ser totalmente transparente ao público com as manutenções e registros, buscando sempre evoluir e melhorar, sem problemas, sem erros.
              </p>
              
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center text-center">
      <p><em><mark>Sistema de precificação ainda em desenvolvimento e em planejamento</mark></em></p>

      </div>
      <div
        id="features"
        className="row row-cols-1 row-cols-md-3 mb-3 text-center p-5"
        >
        <div className="col p-4">
          <div className="card mb-4 rounded-3 shadow-sm">
            <div className="card-header py-3">
              <h4 className="my-0 fw-normal">Grátis</h4>
            </div>
            <div className="card-body">
              <h1 className="card-title pricing-card-title">
                $0<small className="text-muted fw-light">/mo</small>
              </h1>
              <ul className="list-unstyled mt-3 mb-4">
                <li>X máquina</li>
                <li>X registros</li>
                <li>X GB of storage</li>
                <li>Help center access</li>
              </ul>
              <button
                type="button"
                className="w-100 btn btn-lg btn-outline-primary mt-4"
              >
                Entrar de Graça
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card mb-4 rounded-3 shadow-sm">
            <div className="card-header py-3">
              <h4 className="my-0 fw-normal">Pro</h4>
            </div>
            <div className="card-body">
              <h1 className="card-title pricing-card-title">
                $XX<small className="text-muted fw-light">/mo</small>
              </h1>
              <ul className="list-unstyled mt-3 mb-4">
                <li>X máquina</li>
                <li>X registros</li>
                <li>X GB of storage</li>
                <li>Priority email support</li>
                <li>Help center access</li>
              </ul>
              <button type="button" className="w-100 btn btn-lg btn-primary">
                Começar
              </button>
            </div>
          </div>
        </div>
        <div className="col p-4">
          <div className="card mb-4 rounded-3 shadow-sm border-primary">
            <div className="card-header py-3 text-bg-primary border-primary">
              <h4 className="my-0 fw-normal">Empresarial</h4>
            </div>
            <div className="card-body">
              <h1 className="card-title pricing-card-title">
                $XXX<small className="text-muted fw-light">/mo</small>
              </h1>
              <ul className="list-unstyled mt-3 mb-4">
                <li>X máquina</li>
                <li>X registros</li>
                <li>X GB of storage</li>
                <li>Phone and email support</li>
                <li>Help center access</li>
              </ul>
              <button type="button" className="w-100 btn btn-lg btn-primary">
                Entre em contato
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="prices">
        <h2 className="display-6 text-center mb-4">Compare os planos</h2>

        <div className="table-responsive p-5">
          <table className="table text-center">
            <thead>
              <tr>
                <th style={{ width: "34%" }}></th>
                <th style={{ width: "22%" }}>Grátis</th>
                <th style={{ width: "22%" }}>Pro</th>
                <th style={{ width: "22%" }}>Empresarial</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="text-start">
                  Público
                </th>
                <td>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="none"
                      stroke="#000"
                      strokeWidth="2"
                      d="m2 14 7 6L22 4"
                    />
                  </svg>
                </td>
                <td>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="none"
                      stroke="#000"
                      strokeWidth="2"
                      d="m2 14 7 6L22 4"
                    />
                  </svg>
                </td>
                <td>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="none"
                      stroke="#000"
                      strokeWidth="2"
                      d="m2 14 7 6L22 4"
                    />
                  </svg>
                </td>
              </tr>
              
            </tbody>

            <tbody>
              <tr>
                <th scope="row" className="text-start">
                  Permissões
                </th>
                <td>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="none"
                      stroke="#000"
                      strokeWidth="2"
                      d="m2 14 7 6L22 4"
                    />
                  </svg>
                </td>
                <td>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="none"
                      stroke="#000"
                      strokeWidth="2"
                      d="m2 14 7 6L22 4"
                    />
                  </svg>
                </td>
                <td>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="none"
                      stroke="#000"
                      strokeWidth="2"
                      d="m2 14 7 6L22 4"
                    />
                  </svg>
                </td>
              </tr>
              <tr>
                <th scope="row" className="text-start">
                  Compartilhamento
                </th>
                <td></td>
                <td>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="none"
                      stroke="#000"
                      strokeWidth="2"
                      d="m2 14 7 6L22 4"
                    />
                  </svg>
                </td>
                <td>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="none"
                      stroke="#000"
                      strokeWidth="2"
                      d="m2 14 7 6L22 4"
                    />
                  </svg>
                </td>
              </tr>
              <tr>
                <th scope="row" className="text-start">
                  Ativos ilimitados
                </th>
                <td></td>
                <td>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="none"
                      stroke="#000"
                      strokeWidth="2"
                      d="m2 14 7 6L22 4"
                    />
                  </svg>
                </td>
                <td>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="none"
                      stroke="#000"
                      strokeWidth="2"
                      d="m2 14 7 6L22 4"
                    />
                  </svg>
                </td>
              </tr>
              <tr>
                <th scope="row" className="text-start">
                  Privado
                </th>
                <td></td>
                <td>
                  
                </td>
                <td>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="none"
                      stroke="#000"
                      strokeWidth="2"
                      d="m2 14 7 6L22 4"
                    />
                  </svg>
                </td>
              </tr>
              <tr>
                <th scope="row" className="text-start">
                  Segurança extra
                </th>
                <td></td>
                <td></td>
                <td>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="none"
                      stroke="#000"
                      strokeWidth="2"
                      d="m2 14 7 6L22 4"
                    />
                  </svg>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* <div className="container px-4 py-5" id="custom-cards">
        <h2 className="pb-2 border-bottom">Custom cards</h2>

        <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
          <div className="col">
            <div
              className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
              style="background-image: url('unsplash-photo-1.jpg');"
            >
              <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                  Short title, long jacket
                </h2>
                <ul className="d-flex list-unstyled mt-auto">
                  <li className="me-auto">
                    <img
                      src="https://github.com/twbs.png"
                      alt="Bootstrap"
                      width="32"
                      height="32"
                      className="rounded-circle border border-white"
                    />
                  </li>
                  <li className="d-flex align-items-center me-3">
                    <svg className="bi me-2" width="1em" height="1em">
                      <use xlink:href="#geo-fill"></use>
                    </svg>
                    <small>Earth</small>
                  </li>
                  <li className="d-flex align-items-center">
                    <svg className="bi me-2" width="1em" height="1em">
                      <use xlink:href="#calendar3"></use>
                    </svg>
                    <small>3d</small>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col">
            <div
              className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
              style="background-image: url('unsplash-photo-2.jpg');"
            >
              <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                  Much longer title that wraps to multiple lines
                </h2>
                <ul className="d-flex list-unstyled mt-auto">
                  <li className="me-auto">
                    <img
                      src="https://github.com/twbs.png"
                      alt="Bootstrap"
                      width="32"
                      height="32"
                      className="rounded-circle border border-white"
                    />
                  </li>
                  <li className="d-flex align-items-center me-3">
                    <svg className="bi me-2" width="1em" height="1em">
                      <use xlink:href="#geo-fill"></use>
                    </svg>
                    <small>Pakistan</small>
                  </li>
                  <li className="d-flex align-items-center">
                    <svg className="bi me-2" width="1em" height="1em">
                      <use xlink:href="#calendar3"></use>
                    </svg>
                    <small>4d</small>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col">
            <div
              className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
              style="background-image: url('unsplash-photo-3.jpg');"
            >
              <div className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                  Another longer title belongs here
                </h2>
                <ul className="d-flex list-unstyled mt-auto">
                  <li className="me-auto">
                    <img
                      src="https://github.com/twbs.png"
                      alt="Bootstrap"
                      width="32"
                      height="32"
                      className="rounded-circle border border-white"
                    />
                  </li>
                  <li className="d-flex align-items-center me-3">
                    <svg className="bi me-2" width="1em" height="1em">
                      <use xlink:href="#geo-fill"></use>
                    </svg>
                    <small>California</small>
                  </li>
                  <li className="d-flex align-items-center">
                    <svg className="bi me-2" width="1em" height="1em">
                      <use xlink:href="#calendar3"></use>
                    </svg>
                    <small>5d</small>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
