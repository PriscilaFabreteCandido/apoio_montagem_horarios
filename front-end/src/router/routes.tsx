import { Navigate } from "react-router";
import Home from "../views/app/home";
import RootLayout from "../layout";
import Login from "../views/app/Login";
import Logout from "../views/app/Logout";

import Consultas from "../views/Consultas";
import Relatorios from "../views/Alocacoes";
import Error404 from "../components/404";
import Equipamentos from "../views/Cadastros/Equipamento";
import SemestresLetivos from "../views/Cadastros/SemestreLetivo";
import Locais from "../views/Cadastros/Equipamento";
import Alocacoes from "../views/Alocacoes";

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

      {
        path: "Cadastros/Equipamentos",
        element: <Equipamentos />,
        permissions: "",
      },

      //Consultas
      { path: "Consultas", element: <Consultas />, permissions: "" },

      //Relatórios
      { path: "Relatórios", element: <Relatorios />, permissions: "" },

      //Semestre Letivo
      { path: "Cadastros/Semestres Letivos", element: <SemestresLetivos />, permissions: "" },
      
      //Locais
      { path: "Cadastros/Locais", element: <Locais />, permissions: "" },

      //Eventos 
      { path: "Alocações/Eventos", element: <Alocacoes />, permissions: "" },
      {
        path: "*",
        permissions: "",
        element: (
          <>
            {" "}
            <Navigate to="/404" replace />
            <Error404 />
          </>
        ),
      },
    ],
  },
];

export default routes;