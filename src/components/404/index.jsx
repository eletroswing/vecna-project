import * as React from "react";

export default function ErrorPage() {
  return (
    <div>
      <br />
      <br />
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        id="main"
      >
        <h1 className="mr-3 pr-3 align-top border-right inline-block align-content-center">
          404
        </h1>
        <h2 className="font-weight-normal lead" id="desc">
          A página não foi encontrada!
        </h2>
      </div>
    </div>
  );
}
