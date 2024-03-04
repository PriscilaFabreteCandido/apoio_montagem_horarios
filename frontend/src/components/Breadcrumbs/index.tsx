import { Breadcrumb } from 'antd';
import React from 'react';
import './styles.css';

import { useNavigate, useLocation } from 'react-router-dom';

export default function Breadcrumbs() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const handleNavigate = (path: any) => {
    navigate(path);
  };

  // Verificar se a rota atual é desconhecida (404)
  const is404 = pathnames.some(path => path === '404');

  // Se for 404, não renderizar o Breadcrumb
  if (is404) {
    return null;
  }

  return (
    <Breadcrumb>
      {pathnames.map((path, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const decodedPath = decodeURIComponent(path);

        // Verificar se há uma rota para o elemento do breadcrumb
        const hasRoute = routeTo !== '/Cadastros';
        //index === pathnames.length - 1

        return (
          <Breadcrumb.Item key={path}>
            {!hasRoute ?  (
              <span style={{ color: '#511B9E' }}>{decodedPath}</span>
            ) : (
              <a style={{ color: '#511B9E' }} href={routeTo} onClick={() => handleNavigate(routeTo)}>
                {decodedPath}
              </a>
            )}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}
