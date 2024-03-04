import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider, ThemeConfig } from "antd";
import ptBR from "antd/lib/locale/pt_BR"; // Importar o pacote de idioma pt-BR
import { AuthProvider } from "./context/AuthProvider";
//import 'antd/dist/reset.css';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const config = {
  token: {
    colorPrimary: "#04652F",
    colorSecondary: "#E5EDEA",
    colorSuccess: "#6EC936",
    colorInfo: "#45bfd6",
    colorWarning: "#f3ab15",
    colorHelp: "#511b9e",
    colorDanger: "#DC2626",
    //fontFamily: "Roboto, Montserrat, sans-serif",
    fontSize: 16,
    fontSizeIcon: 16,
    fontFamilyCode: "monospace",
  },
};

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ConfigProvider locale={ptBR} theme={config}>
        <App />
      </ConfigProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
