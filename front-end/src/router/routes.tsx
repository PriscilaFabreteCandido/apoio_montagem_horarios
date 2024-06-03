import { Navigate } from "react-router";
import Home from "../views/app/home";
import Login from "../views/app/Login";
import RootLayout from "../layout";

import Logout from "../views/app/Logout";
import { User, clearLoggedInUser, saveLoggedInUser, getLoggedInUser } from '../context/AuthService';
import Consultas from "../views/Consultas/ProximaAula";
import Relatorios from "../views/Alocacoes";
import Error403 from "../components/403";
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
import HorariosAula from "../views/Cadastros/HorariosAula";
import ProximaAula from  "../views/Consultas/ProximaAula";
import CoordenadoresTurno from "../views/Cadastros/CoordenadoresTurno";
import Logs from  "../views/Consultas/Logs";

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  permissions: string;
  children?: RouteConfig[];
}

const isUserAdmin = () => {
  const user = getLoggedInUser();
  return user && user.userType == 'Administrador';
};

const isAdminRoute = (routePath: string) => {
  const adminPrefixes = ['Cadastros', 'Alocações', 'Relatórios'];
  return adminPrefixes.some(prefix => routePath.startsWith(`${prefix}`));
};

const applyAdminRestriction = (routes: RouteConfig[]) => {
  routes.forEach(route => {
    if (isAdminRoute(route.path)) {
      route.element = isUserAdmin() ? route.element : <Error403 />;
    }
    if (route.children) {
      applyAdminRestriction(route.children);
    }
  });
};

const routes: RouteConfig[] = [
  { path: "/logout", element: <Logout />, permissions: "" },
  {
    path: "",
    element: <RootLayout />,
    permissions: "",
    children: [
      //Login
      { path: "Login", element: <Login />, permissions: "" },

      //Inicio
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
      //Turmas
      { path: "Cadastros/Turmas", element: <Turmas />, permissions: "" },
        //Turmas
      { path: "Cadastros/Coordenadores de Turno", element: <CoordenadoresTurno />, permissions: "" },
      
      //Alunos
      { path: "Cadastros/Alunos", element: <Alunos />, permissions: "" },
      
      //Aulas
      { path: "Cadastros/Aulas", element: <Aulas />, permissions: "" },
      //Aulas
      { path: "Cadastros/Disciplinas", element: <Disciplinas />, permissions: "" },

      { path: "Cadastros/Horarios", element: <HorariosAula />, permissions: "" },
      
      { path: "Consultas/Proxima Aula", element: <ProximaAula />, permissions: "" },
      //Eventos 
      { path: "Alocações/Eventos", element: <Alocacoes />, permissions: "" },
      { path: "Alocações/Logs", element: <Logs />, permissions: "" },
    ],
  },
];

applyAdminRestriction(routes);

export default routes;
