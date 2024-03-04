import { Navigate } from "react-router";
import Home from "../views/app/home";
import RootLayout from "../layout";
import Login from "../views/app/Login";
import Logout from "../views/app/Logout";
import PCMSO from "../views/PCMSO";
import CadastroPCMSO from "../views/PCMSO/CadastroPCMSO";
import CadastroUsuario from "../views/Cadastros/Usuario/CadastroUsuario";
import PerguntasFrequentes from "../views/PerguntasFrequentes";
import CadastroItemPCMSO from "../views/PCMSO/ItemPCMSO/CadastroItemPCMSO";
import ItemPCMSO from "../views/PCMSO/ItemPCMSO";
import CategoriaPerguntasFrequentes from "../views/PerguntasFrequentes/categoria";
import Usuarios from "../views/Cadastros/Usuario";
import Exames from "../views/Cadastros/Exames";
import CadastroExame from "../views/Cadastros/Exames/CadastroExame";
import PGR from "../views/PGR";
import Consultas from "../views/Consultas";
import Relatorios from "../views/Relatorios";
import Error404 from "../components/404";

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  permissions: string;
  children?: RouteConfig[];
}


const routes: RouteConfig[] = [
  { path: "/login", element: <Login />, permissions: "" },
  { path: "/logout", element: <Logout />, permissions: "" },
  { 
    path: "",
    element: <RootLayout />,
    permissions: "",
    children: [
      // Inicio
      { path: "Inicio", element: <Home />, permissions: "" },

      //Cadastros
      { path: "Cadastros/Usuários", element: <Usuarios />, permissions: "" },
      { path: "Cadastros/Usuários/Cadastrar", element: <CadastroUsuario />, permissions: "" },
      { path: "Cadastros/Usuários/Cadastrar/:id", element: <CadastroUsuario />, permissions: "" },
      
      { path: "Cadastros/Exames", element: <Exames />, permissions: "" },
      { path: "Cadastros/Exames/Cadastrar", element: <CadastroExame />, permissions: "" },
      
      //Consultas
      { path: "Consultas", element: <Consultas />, permissions: "" },

      //PGR
      { path: "PGR", element: <PGR />, permissions: "" },

      //PCMSO
      { path: "PCMSO", element: <PCMSO />, permissions: "" },
      { path: "PCMSO/Cadastrar", element: <CadastroPCMSO />, permissions: "" },
      { path: "PCMSO/Editar", element: <CadastroPCMSO />, permissions: "" },
      
      //Relatórios
      { path: "Relatórios", element: <Relatorios />, permissions: "",},

      //Perguntas Frequentes
      { path: "Perguntas Frequentes", element: <PerguntasFrequentes />, permissions: "",},
      { path: "Perguntas Frequentes/:titulo", element: <CategoriaPerguntasFrequentes />, permissions: "",},
      
      //PCMSO
      { path: "PCMSO/Cadastrar/Adicionar itens ao PCMSO", element: <ItemPCMSO />, permissions: "",},
      { path: "PCMSO/Cadastrar/Adicionar itens ao PCMSO/Cadastrar", element: <CadastroItemPCMSO />, permissions: "",},
      { path: "PCMSO/Cadastrar/Adicionar itens ao PCMSO/Editar", element: <CadastroItemPCMSO />, permissions: "",},
      { path: "PCMSO/Cadastrar/Adicionar itens ao PCMSO/Clonar Novo Item PCMSO", element: <CadastroItemPCMSO />, permissions: "",},
      { path: "*", permissions: "",  element: (<> <Navigate to="/404" replace /><Error404 /></>),},
    ],
  },
];

export default routes;
