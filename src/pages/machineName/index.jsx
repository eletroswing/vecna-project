import * as React from "react";
import { useParams } from "react-router-dom";
import "./style.css";

function Carroussel() {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide w-100"
      data-bs-ride="true"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <svg
            className="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
            width="800"
            height="400"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder: First slide"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#777"></rect>
            <text x="50%" y="50%" fill="#555" dy=".3em">
              First slide
            </text>
          </svg>
        </div>
        <div className="carousel-item">
          <svg
            className="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
            width="800"
            height="400"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder: Second slide"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#777"></rect>
            <text x="50%" y="50%" fill="#555" dy=".3em">
              Second slide
            </text>
          </svg>
        </div>
        <div className="carousel-item">
          <svg
            className="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
            width="800"
            height="400"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder: Third slide"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#777"></rect>
            <text x="50%" y="50%" fill="#555" dy=".3em">
              Third slide
            </text>
          </svg>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

function ModelViwer() {
  return (
    <div>
      <model-viewer
        id="ModelViwer"
        src="https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb"
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        enable-pan
      ></model-viewer>
    </div>
  );
}

export default function Machine() {
  let {user, machineName} = useParams();
  const [is3d, set3d] = React.useState(false);

  return (
    <div id="Container">
      <div id="Centered">
        <div className="m-auto">
          <div className="py-1">
          </div>
          <div id="model" className="mb-4 mt-2">
            <h1>Fresadora universal Kfu 2</h1>
            <h4 className="text-muted">Plano de lubrificação</h4>
            <p className="opacity-25"><em>Criado por: {user}.</em></p>
          </div>
          <div id="table">{!is3d ? <Carroussel /> : <ModelViwer />}</div>
          {
            // [ ]: tranform this table in components
          }
          <div className="d-flex flex-column flex-lg-row mt-3 w-full">
            {/* table of prev manut */}
            <div className="m-lg-auto mx-2">
              <select
                className="form-select form-select-sm mb-2"
                aria-label=".form-select-sm example"
              >
                <option value="1">Ultima manutenção</option>
                <option value="2">Penultima manutenção</option>
                <option value="3">Anti-Penultiuma manutenção</option>
              </select>
              <table className="table table-striped-columns w-full">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* table of next manut */}
            <div className="m-lg-auto mx-2">
              <select
                className="form-select form-select-sm mb-2"
                aria-label=".form-select-sm example"
              > 
                <option value="1">Proxima manutenção</option>
                <option value="2">Segunda próxima manutenção</option>
                <option value="3">Terceita próxima manutenção</option>
              </select>
              <table className="table table-striped-columns w-full">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div id="info" className="d-flex flex-column flex-lg-row">
            <div className="m-auto">
              <button type="button" className="btn btn-outline-info w-full mt-2 mb-0 mb-lg-5">
                Ver historico de manutenções
              </button>
            </div>
            <div className="m-auto">
              <button
                type="button"
                className="btn btn-outline-warning w-full mt-3 mt-lg-2 mb-5"
              >
                Notificarme da próxima manutenção
              </button>
            </div>
          </div>
          <div className="mb-5">
            <h1 className="display-5 mb-3">Informações Importantes</h1>
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Accordion Item #1
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <strong>This is the first item's accordion body.</strong> It
                    is shown by default, until the collapse plugin adds the
                    appropriate classNamees that we use to style each element.
                    These classNamees control the overall appearance, as well as
                    the showing and hiding via CSS transitions. You can modify
                    any of this with custom CSS or overriding our default
                    variables. It's also worth noting that just about any HTML
                    can go within the <code>.accordion-body</code>, though the
                    transition does limit overflow.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Accordion Item #2
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <strong>This is the second item's accordion body.</strong>{" "}
                    It is hidden by default, until the collapse plugin adds the
                    appropriate classNamees that we use to style each element.
                    These classNamees control the overall appearance, as well as
                    the showing and hiding via CSS transitions. You can modify
                    any of this with custom CSS or overriding our default
                    variables. It's also worth noting that just about any HTML
                    can go within the <code>.accordion-body</code>, though the
                    transition does limit overflow.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Accordion Item #3
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <strong>This is the third item's accordion body.</strong> It
                    is hidden by default, until the collapse plugin adds the
                    appropriate classNamees that we use to style each element.
                    These classNamees control the overall appearance, as well as
                    the showing and hiding via CSS transitions. You can modify
                    any of this with custom CSS or overriding our default
                    variables. It's also worth noting that just about any HTML
                    can go within the <code>.accordion-body</code>, though the
                    transition does limit overflow.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="add" className="mb-5 d-flex mx-5 mx-lg-0">
            <button type="button" className="ms-auto btn btn-outline-success">
              Adicionar registro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
