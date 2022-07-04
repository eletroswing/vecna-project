import * as React from "react";

import Card from "../Card";

export default function CardList(props) {
  return (
    <div className="">
      <div className="container-fluid d-flex justify-content-center flex-wrap">
        {props.card ? (
          props.card.map((cardData) => {
            if (props.authorData) {
              return (
                <Card
                  authorData={props.authorData}
                  key={cardData.id}
                  cardLink={`/${cardData.ownerId}/${cardData.id}`}
                  cardTitle={cardData.title}
                  authorId={cardData.ownerId}
                  data={cardData}
                />
              );
            }else{

              return (
                <Card
                key={cardData.id}
                cardLink={`/${cardData.ownerId}/${cardData.id}`}
                cardTitle={cardData.title}
                authorId={cardData.ownerId}
                data={cardData}
                />
                );
              }
          })
        ) : (
          <div></div>
        )}
      </div>
      {/*<nav aria-label="..." className="mt-4 d-flex justify-content-center">
        <ul className="pagination">
          <li className="page-item disabled">
            <span className="page-link">Previous</span>
          </li>
          <li className="page-item active">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item" aria-current="page">
            <span className="page-link">2</span>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
  </nav>*/}
    </div>
  );
}
