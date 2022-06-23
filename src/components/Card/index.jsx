import * as React from "react";
import "./style.css";

export default function Card(props) {
  return (
    <div>
      <div id="Card">
        <img
          src="https://cdn4.buysellads.net/uu/1/50798/1565723204-1548360785-Authentic2.jpg"
          id="CardImage"
          alt="..."
        />
        <div class="card-body" id="CardContent">
          <h5 class="card-title" id="CardTitle">Card title</h5>
          <p class="card-text text-wrap">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" class="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </div>
  );
}
