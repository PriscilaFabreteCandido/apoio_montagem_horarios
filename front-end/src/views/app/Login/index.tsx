import { EyeInvisibleOutlined, EyeOutlined, UserOutlined } from "@ant-design/icons";
import "./styles.css";
import logo from "../../../assets/images/ifes.png";
import { useNavigate } from "react-router";
import { get, post, put, remove } from "../../../api/axios";
import {
  Button,
  Input,
  Table,
  Tooltip,
  Modal,
  Form,
  message,
  Popconfirm,
  Space,
} from "antd";

import { useState } from "react";
import passaporteImg from "../../../assets/images/Ifes-Colatina.jpg";

export default function Login() {
  const [password, setPassword] = useState<any>("");
  const [username, setUserName] = useState<any>("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginForm] = Form.useForm();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const navigate = useNavigate();

  const realizarLogin = async (event: any) => {
    event.preventDefault();
    const values = loginForm.getFieldsValue();

    const userData = {
      login: values.login,
      password: values.password
    };
  
    try {
      const response = await post("/auth/login", userData);
      const token = response.token;
      localStorage.setItem("token", token);
  
      navigate("/Inicio");
    } catch (error) {
      console.error('Erro ao realizar login:', error);
    }
  };

  return (
    <div id="ifes-login" style={{ display: "flex" }}>
      <div className="wrapper">
        <div className="formContainer">
          <form action="">
            <div className="logoLogin">
              <img src={logo} alt="" />
            </div>

            <h1
              style={{
                marginBottom: "10px",
                position: "relative",
                bottom: "20px",
                paddingTop: '1rem'
              }}
            >
              Controle de Acesso
            </h1>
            <Form form={loginForm} layout="vertical">
              <div className="input-box" style={{ marginTop: "0rem" }}>
                <Form.Item
                  name="login"
                  label="Siape"
                  rules={[
                    { required: true, message: "Por favor, insira o nome da coordenadoria!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>

              <div className="input-box">
                <Form.Item
                  name="password"
                  label="Senha"
                  rules={[
                    { required: true, message: "Por favor, insira uma senha!" },
                  ]}
                >
                  <Input type="password" />
                </Form.Item>
              </div>

              <label htmlFor="" className="label-remember">
                Esqueceu sua senha?
              </label>

              <div className="remember-forgot">
                <label htmlFor="">
                  <input type="checkbox" /> Lembrar de mim?
                </label>
              </div>

              <button
                type="submit"
                className="btn"
                onClick={(event) => realizarLogin(event)}
              >
                Login
              </button>
            </Form>
          </form>
        </div>
      </div>
    </div>
  );
}
