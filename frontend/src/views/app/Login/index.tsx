import { EyeInvisibleOutlined, EyeOutlined, UserOutlined } from "@ant-design/icons";
import "./styles.css";
import logo from "../../../assets/images/ifes.png";
import { useNavigate } from "react-router";
import UseProvideAuth from "../../../hooks/useProvideAuth";
import { useState } from "react";
import passaporteImg from "../../../assets/images/Ifes-Colatina.jpg";

export default function Login() {
  const useProvideAuth = UseProvideAuth() as any;
  const [password, setPassword] = useState<any>("");
  const [username, setUserName] = useState<any>("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const navigate = useNavigate();

  const realizarLogin = (event: any) => {
    event.preventDefault();
    navigate("/Inicio");
    useProvideAuth.signin(password, username);
  };

  return (
    <div id="senai-login" style={{ display: "flex" }}>
      <div className="wrapper">
        <div className="image-container">
                    <img
            src={passaporteImg} // Substitua com o caminho da sua imagem
            alt="Imagem"
          />

        </div>

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

            <div className="input-box" style={{ marginTop: "0rem" }}>
              <input type="email" name="" id="" placeholder="Email" required />
              <UserOutlined className="icon" />
            </div>

            <div className="input-box">
              <input
                type={passwordVisible ? "text" : "password"}
                name=""
                id=""
                placeholder="Senha"
                required
              />
              {passwordVisible ? (
                <EyeInvisibleOutlined
                  className="icon"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <EyeOutlined
                  className="icon"
                  onClick={togglePasswordVisibility}
                />
              )}
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
          </form>
        </div>
      </div>
    </div>
  );
}
