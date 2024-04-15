import { Navigate } from "react-router";
import Home from "../views/app/home";
import RootLayout from "../layout";

import Logout from "../views/app/Logout";

import Consultas from "../views/Consultas";
import Relatorios from "../views/Alocacoes";
import Error404 from "../components/404";
import Equipamentos from "../views/Cadastros/Equipamento";
import SemestresLetivos from "../views/Cadastros/SemestreLetivo";
import Locais from "../views/Cadastros/local";
import Alocacoes from "../views/Alocacoes";
import Professores from "../views/Cadastros/Professor";
import Coordenadorias from "../views/Cadastros/Coordenadoria";
import Cursos from "../views/Cadastros/Curso";
import Alunos from "../views/Cadastros/Aluno";
import Aulas from "../views/Cadastros/Aula";
import Disciplinas from "../views/Cadastros/Disciplina";
import Turmas from "../views/Cadastros/Turma";

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  permissions: string;
  children?: RouteConfig[];
}

const routes: RouteConfig[] = [
  // { path: "/login", element: <Login />, permissions: "" },
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
      //Professores
      { path: "Cadastros/Coordenadorias", element: <Coordenadorias />, permissions: "" },
      //Professores
      { path: "Cadastros/Professores", element: <Professores />, permissions: "" },
      //Cursos
      { path: "Cadastros/Cursos", element: <Cursos />, permissions: "" },

      { path: "Cadastros/Turmas", element: <Turmas />, permissions: "" },

      //Alunos
      { path: "Cadastros/Alunos", element: <Alunos />, permissions: "" },
      
      //Aulas
      { path: "Cadastros/Aulas", element: <Aulas />, permissions: "" },
      //Aulas
      { path: "Cadastros/Disciplinas", element: <Disciplinas />, permissions: "" },
      
      //Eventos 
      { path: "Alocações/Eventos", element: <Alocacoes />, permissions: "" },
      // {
      //   path: "*",
      //   permissions: "",
      //   element: (
      //     <>
      //       {" "}
      //       <Navigate to="/404" replace />
      //       <Error404 />
      //     </>
      //   ),
      // },
    ],
  },
];

export default routes;
