import * as React from 'react';
import { useParams } from 'react-router-dom';
import './style.css';

export default function Machine() {
  let params = useParams();

  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Nome da maquina: {params.machineName}
      </h1>
    </div>
  );
}
