import * as React from "react";
import { GetData } from "./../../utils/FireConnection";
import "./style.css";

export default function Card(props) {
  if((props.authorId == null || props.authorId == undefined) && (props.authorData == null || props.authorData == undefined)){
    throw new Error("Need to pass id or user data to card")
  }

  const [authorData, setAuthorData] = React.useState({} || null);

  const GetUserData = async () => {
    setAuthorData(await GetData(props.authorId, "users"));
  };

  
  React.useEffect(() => {
    if(props.authorData !== null && props.authorData !== undefined){
      setAuthorData(props.authorData)
    }else{
      GetUserData();
    }
  }, []);
  return (
    <div className="">
      <div id="Card">
        {/* This is for general click in card */}
        <div>
          <a
            className="text-black text-decoration-none"
            href={props.cardLink ? props.cardLink : "#"}
          >
            <img
              src={
                props.cardImage
                  ? props.cardImage
                  : "https://cdn4.buysellads.net/uu/1/50798/1565723204-1548360785-Authentic2.jpg"
              }
              id="CardImage"
              referrerPolicy="no-referrer"
              alt="..."
            />
            <div className="card-body user-select-none" id="CardContent">
              <h5 className="card-title" id="CardTitle">
                <strong>
                  {props.cardTitle
                    ? props.cardTitle
                    : "Fresadora universal KFU-2"}
                </strong>
              </h5>
            </div>
          </a>
        </div>
        {/* and this for open author's profile */}
        <div>
          <a
            className="text-black text-decoration-none"
            href={authorData.uid ? authorData.uid : "#"}
          >
            <div className="card-body" id="CardContent">
              <div className="d-flex aling-center user-select-none">
                <img
                  src={
                    authorData.picture
                      ? authorData.picture
                      : "https://via.placeholder.com/150"
                  }
                  alt="mdo"
                  width="40"
                  referrerPolicy="no-referrer"
                  height="40"
                  className="rounded-circle"
                />
                <h6 className="my-auto ms-2" href="">
                  {authorData.username ? authorData.username : "Nome do autor"}
                </h6>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
