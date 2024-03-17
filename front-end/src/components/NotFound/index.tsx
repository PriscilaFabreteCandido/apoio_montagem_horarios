// NotFound.js
import { Button, Result } from "antd";
import React from "react";

function NotFound() {
  return (
    <Result
      status="403"
      title="Acesso Negado ou Página Não Encontrada"
      subTitle="Desculpe, você não está autorizado a acessar esta página ou ela não existe."
    />
  );
}

export default NotFound;
