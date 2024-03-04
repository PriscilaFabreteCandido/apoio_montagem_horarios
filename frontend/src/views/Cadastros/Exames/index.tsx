import { Button, Input, Select, Switch, Table, Typography } from "antd";
import React from "react";
import "./styles.css";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { CardFooter } from "../../../components/CardFooter";
import data from "./data";
import columns from "./columnsDefs";

export default function Exames() {
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <CardFooter>
        <div className="flex justify-content-between">
          {/* Filtros */}
          <div className="flex filtros-card">
            <Input placeholder="Código E-social" style={{ width: "200px" }} />
            <Input placeholder="Exame" style={{ width: "200px" }} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              <Typography.Text style={{ marginRight: "8px" }}>
                Ativo:
              </Typography.Text>
              <Switch defaultChecked />
            </div>
          </div>

          <div>
            <Button
              className="senai-btn-success"
              onClick={() => {
                navigate("/Cadastros/Exames/Cadastrar");
              }}
            >
              <PlusOutlined className="senai-icon" />
              Adicionar
            </Button>
          </div>
        </div>
      </CardFooter>

      <Table columns={columns} dataSource={data} />
    </>
  );
}
