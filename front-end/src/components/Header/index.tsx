import React, { useRef, useState, useEffect } from "react";
import "./styles.css";
import {
  BellOutlined,
  FormOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoreOutlined,
  SecurityScanOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { User, clearLoggedInUser, saveLoggedInUser, getLoggedInUser } from '../../context/AuthService';
import { Button, FloatButton, Menu, MenuProps, message } from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import { useNavigate } from "react-router";

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

const itemsMenu: MenuProps["items"] = [
  getItem("Entrar no sistema", "entrar", <LoginOutlined />, "/Login"),
  getItem("Sair da Aplicação", "sair", <LogoutOutlined />, "/Login"),
  getItem(
    "Gerenciar Usuários",
    "gerenciarusers",
    <UserOutlined  />,
    "/Users"
  ),
];

function Header({ onIconClick }: any) {
  const [collapsed, setCollapsed] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const menuRef = useRef<HTMLDivElement | null>({} as any);
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    onIconClick(!collapsed);
  };

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
  }, []); 

  const handleMenuClick = (item: any) => {
    // Adicione aqui a lógica específica para lidar com cliques no menu, se necessário.
    // Por padrão, apenas feche o menu.
    setMenuVisible(false);
  };

  const handleDocumentClick = (event: MouseEvent) => {
    // Verifique se o clique foi fora do menu
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuVisible(false);
    }
  };

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

  const onClick: MenuProps["onClick"] = (e) => {
    var selectedItem: any = encontrarItemDoMenu(
      itemsMenu ? itemsMenu : [],
      e.key
    );
    if (selectedItem && selectedItem.uri) {
      if (selectedItem.key == 'sair'){
        const userJSON = localStorage.getItem("userLogado");

        if (userJSON){
          clearLoggedInUser();
          navigate(selectedItem.uri);

          window.location.reload();
          message.success("Logout efetuado com sucesso!");
        }
      } else {
        navigate(selectedItem.uri);
      } 
    }
  };

  const renderMenuItems = () => {
    if (user) {
      return itemsMenu!.filter(item => item!.key != 'entrar');
    } else {
      return itemsMenu!.filter(item => item!.key == 'entrar');
    }
  };

  return (
    <>
      <div
        className="header-ifes flex"
        style={{ justifyContent: "space-between", padding: "0 1.85rem" }}
      >
        <div>
          <Button onClick={toggleCollapsed} className="transparent-button">
            {!collapsed ? (
              <MenuUnfoldOutlined
                style={{ fontSize: "16px", color: "white" }}
              />
            ) : (
              <MenuFoldOutlined style={{ fontSize: "16px", color: "white" }} />
            )}
          </Button>
        </div>

        <div className="flex gap-1">
          {/* Informações do Usuário */}
          {user && (
          <> 
          <UserOutlined
            className="white-icon"
            style={{ fontSize: "1.25rem" }}
          />
          
          <div className="cor-white info-user flex flex-column btn-info-user">
            <h6 className="font-14" style={{ marginTop: "15px" }}>
              { user?.login }
            </h6>
            <small>
              { user?.userType }
            </small>
          </div>
          </>
          )}

          {/* Botão de Ação Adicional (se aplicável) */}
            {/* Separador */}
            <div className="separador"></div>
            
          <Button
            onClick={() => setMenuVisible(!menuVisible)}
            style={{
              background: "transparent",
              padding: "0rem",
              border: "none",
              position: "relative",
              top: "16px",
              left: "-1px",
            }}
          >
            <SettingOutlined  style={{ fontSize: "1.2rem", color: "white" }} />
          </Button>
        </div>
      </div>

      {menuVisible && (
        <Menu
          onClick={onClick}
          className="menu-content"
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={renderMenuItems()}
        ></Menu>
      )}
    </>
  );
}

export default Header;
