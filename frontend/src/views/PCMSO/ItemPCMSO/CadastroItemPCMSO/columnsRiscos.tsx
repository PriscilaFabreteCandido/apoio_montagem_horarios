import React from 'react';
import { Space, Tooltip, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const columnsRiscos = [
  {
    title: 'Classe de Risco',
    dataIndex: 'classeDeRisco',
    key: 'classeDeRisco',
    render: (text: any, risco: any) => (
        <span style={{ color: risco.cor }}>{text}</span>
      ),
  },
  {
    title: 'Perigo/Fator de Risco',
    dataIndex: 'perigoFatorDeRisco',
    key: 'perigoFatorDeRisco',
  },
  {
    title: 'Código E-Social',
    dataIndex: 'codigoESocial',
    key: 'codigoESocial',
  },
  {
    title: 'Exposição',
    dataIndex: 'exposicao',
    key: 'exposicao',
  }
];

export default columnsRiscos;
