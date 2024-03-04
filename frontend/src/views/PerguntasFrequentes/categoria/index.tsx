import React from "react";
import { useParams } from "react-router-dom";

const CategoriaPerguntasFrequentes = () => {
  const { question } = useParams();

  return (
    <>
      <h2>{question}</h2>
      <ol>
        <li>Passo 1</li>
        <li>Passo 2</li>
        <li>Passo 3</li>
      </ol>
    </>
  );
};

export default CategoriaPerguntasFrequentes;
