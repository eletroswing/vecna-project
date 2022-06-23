import * as React from 'react';
import { useParams } from 'react-router-dom';
import './style.css';

export default function User() {
  let params = useParams();

  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Nome do usuario: {params.user}
      </h1>
    </div>
  );
}
