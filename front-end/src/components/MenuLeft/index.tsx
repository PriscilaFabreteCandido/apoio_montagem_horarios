import React, { useEffect, useState } from "react";
import {
  ApartmentOutlined,
  AuditOutlined,
  BarChartOutlined,
  BookOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloudServerOutlined,
  ContactsOutlined,
  DatabaseOutlined,
  ExperimentOutlined,
  FileSearchOutlined,
  FileTextOutlined,
  FundProjectionScreenOutlined,
  FundViewOutlined,
  HeatMapOutlined,
  HomeOutlined,
  HourglassOutlined,
  IdcardOutlined,
  LaptopOutlined,
  MedicineBoxOutlined,
  PaperClipOutlined,
  PlayCircleOutlined,
  QuestionCircleOutlined,
  SafetyCertificateOutlined,
  SearchOutlined,
  SettingOutlined,
  ShopOutlined,
  SolutionOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined,
  VideoCameraOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import "./styles.css";
import { Menu } from "antd";
import transferir from "../../assets/images/ifes.png";
import logo from "../../assets/images/logo2_menor.png";
import { User, clearLoggedInUser, saveLoggedInUser, getLoggedInUser } from '../../context/AuthService';
import { useNavigate, useLocation } from "react-router-dom";

interface MenuItem {
  key: React.Key;
  uri?: string | "";
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: MenuItem[];
  type?: "group";
}

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  uri?: string | "",
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    uri: uri || "",
  };
}

const items: MenuProps["items"] = [
  getItem("Início", "inicio", <HomeOutlined />, "/Inicio"),
  getItem("Cadastros", "cadastros", <CheckCircleOutlined />, "/Cadastros", [
    getItem("Alunos", "alunos", <TeamOutlined />, "/Cadastros/Alunos"),
    getItem("Aulas", "aulas", <ClockCircleOutlined />, "/Cadastros/Aulas"),
    getItem("Turmas", "turmas", <FundViewOutlined />, "/Cadastros/Turmas"),
    getItem("Cursos", "cursos", <FundViewOutlined />, "/Cadastros/Cursos"),
    getItem(
      "Disciplinas",
      "disciplinas",
      <BookOutlined />,
      "/Cadastros/Disciplinas"
    ),
    getItem(
      "Coordenadoria",
      "coordenadoria",
      <ApartmentOutlined />,
      "/Cadastros/Coordenadorias"
    ),
    getItem(
      "Coordenadores de Turno",
      "coordenadoriaTurno",
      <UserSwitchOutlined />,
      "/Cadastros/Coordenadores de Turno"
    ),
    getItem(
      "Equipamentos",
      "equipamento",
      <LaptopOutlined />,
      "/Cadastros/Equipamentos"
    ),
    getItem("Locais", "Locais", <ShopOutlined />, "/Cadastros/Locais"),
    getItem(
      "Professores",
      "professores",
      <ContactsOutlined />,
      "/Cadastros/Professores"
    ),
    getItem(
      "Horários de Aula",
      "Horarios",
      <ClockCircleOutlined />,
      "/Cadastros/Horarios"
    ),
    getItem(
      "Semestre Letivos",
      "semestreLetivo",
      <HourglassOutlined />,
      "/Cadastros/Semestres Letivos"
    ),
  ]),
  getItem("Consultas abertas", "consultas", <FileTextOutlined />, "", [
    getItem(
      "Horário",
      "horario",
      <FileTextOutlined />,
      "/Consultas"
    ),
  ]),
  getItem("Alocações", "alocacoes", <PlayCircleOutlined />, "/PGR", [
    getItem("Eventos", "evento", <BarChartOutlined />, "/Alocações/Eventos"),
    getItem("Logs", "logs", <BarChartOutlined />, "/Alocações/logs"),
  ]),
];

function MenuLeft({ isIconClicked }: any) {
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<any[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  const updateUserType = () => {
    const loggedInUser = getLoggedInUser();
    if (loggedInUser) {
      setUser(loggedInUser);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    updateUserType();
    const currentPath = location.pathname;

    const selectedItem = items?.find((item: any) =>
      currentPath.startsWith(item.uri || "")
    );

    if (selectedItem) {
      setDefaultSelectedKeys([selectedItem?.key?.toString()]);
    } else {
      setDefaultSelectedKeys([""]);
    }
  }, [location.pathname, navigate]);

  function encontrarItemDoMenu(items: any[], targetKey: React.Key): void {
    var selectedItem: any = null;
    if (!items || items.length <= 0) return;

    for (const item of items) {
      if (item.key === targetKey) {
        selectedItem = item;
        return selectedItem;
      }

      if (item.children && item.children.length > 0) {
        selectedItem = encontrarItemDoMenu(item.children, targetKey);
        if (selectedItem) return selectedItem;
      }
    }
  }

  const onClick: MenuProps["onClick"] = (e: any) => {
    //e.preventDefault();
    var selectedItem: any = encontrarItemDoMenu(items ? items : [], e.key);
    if (selectedItem && selectedItem.uri) {
      navigate(selectedItem.uri);
    }
  };

  const renderMenuItems = () => {
    if (!user || user.userType == 'Convidado') {
      return items!.filter(item => item!.key === 'consultas' || item!.key === 'inicio')
    } else {
      return items;
    }
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          padding: "1rem",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderInlineEnd: "1px solid rgba(5, 5, 5, 0.06)",
        }}
        className="logo"
      >
        <img
          src={isIconClicked ? transferir : logo}
          alt="Descrição da imagem"
          style={{ width: "100%", height: "auto", }}
        />
      </div>

      {defaultSelectedKeys && defaultSelectedKeys.length > 0 && (
        <div
          style={{
            height: "calc(100% - 6rem)",
            overflow: "auto",
            width: "100%",

          }}
        >
          <Menu
            onClick={onClick}
            style={{ height: "100%" }}
            defaultSelectedKeys={defaultSelectedKeys}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            inlineCollapsed={!isIconClicked}
            items={renderMenuItems()}
          ></Menu>
        </div>
      )}
    </>
  );
}

export default MenuLeft;
