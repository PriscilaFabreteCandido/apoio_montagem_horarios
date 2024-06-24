import React, { useState, useEffect, useRef } from "react";
import { Select, Input, Button, Modal } from "antd";
import { get } from "../../../api/axios";
import { message } from "antd/lib";
import JsBarcode from "jsbarcode";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import imgifes from "../../../assets/images/ifes.png";
import { PrinterOutlined } from '@ant-design/icons';
import logo from "../../../assets/images/logo-ifes-branco-no-borders.png"

const { Option } = Select;

interface PeriodoAcademico {
  id: number;
  ano: number;
  periodo: string;
  formato: string;
}

interface Aula {
  id: number;
  diaSemana: string;
  horarios: { id: number; horaInicio: string; horaFim: string }[];
  disciplina: { id: number; nome: string; sigla: string };
  professor: { id: number; nome: string };
  local: { id: number; descricao: string };
}

interface Aluno {
  id: number;
  nome: string;
  matricula: string;
  turma: { id: number; nome: string };
  curso: {
    id: number;
    nome: string;
    coordenadoria: { id: number; descricao: string };
  };
  aulas: Aula[] | null;
}

interface Professor {
  id: number;
  nome: string;
  matricula: string;
}

const HorarioTable = () => {
  const [periodosLetivos, setPeriodosLetivos] = useState<PeriodoAcademico[]>(
    []
  );
  const [periodoSelecionado, setPeriodoSelecionado] =
    useState<PeriodoAcademico | null>(null);
  const [matricula, setMatricula] = useState<string>("");
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [professor, setProfessor] = useState<Professor | null>(null);
  const [aulas, setAulas] = useState<Aula[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const horarioRef = useRef(null);
  const [email, setEmail] = useState('');
  const [isEmailInputVisible, setIsEmailInputVisible] = useState(false);
  const [periodo, setPeriodo] = useState('');


  useEffect(() => {
    setPeriodosAcademicos();
  }, []);

  const setPeriodosAcademicos = async () => {
    try {
      const response = await get("periodos");
      setPeriodosLetivos(response);
    } catch (error) {
      console.error("Erro ao obter períodos acadêmicos:", error);
    }
  };

  const handlePeriodoChange = (value: number) => {
    const periodoSelecionado = periodosLetivos.find((periodo) => periodo.id === value);
    if (periodoSelecionado) {
      setPeriodoSelecionado(periodoSelecionado);
      const periodoFormatado = renderPeriodoAcademico(periodoSelecionado);
      setPeriodo(periodoFormatado);
      console.log("Período acadêmico selecionado:", periodoFormatado);
    } else {
      setPeriodoSelecionado(null);
      setPeriodo('');
    }

    console.log("Mostrando periodo: " + periodo);
  };

  const carregarTabela = async () => {
    try {
      const response = await get(
        `aulas/aluno/${matricula}/${periodoSelecionado?.formato}/${periodoSelecionado?.periodo}/${periodoSelecionado?.ano}`
      );
      console.log("Próximas aulas:", response);
      setAulas(response);
    } catch (error: any) {
      showError(
        "Erro ao processar o formulário: " + error.response.data.message
      );
      console.error("Erro ao obter próxima aula:", error);
    }
  };

  const handleImprimirMatriculaClick = () => {
    setIsModalVisible(true); // Mostrar o modal ao clicar no botão
  };

  const handleModalOk = () => {
    setIsModalVisible(false); // Fechar o modal
    handleImprimirEtiquetasClick();
    console.log(`Quantidade de etiquetas: ${selectedQuantity}`);
    // Adicione aqui o código para realizar a ação de impressão com a quantidade de etiquetas selecionada
  };


  const handleVerProximaAulaClick = async () => {
    // Verificar se o período acadêmico foi selecionado
    if (!periodoSelecionado) {
      showError("Por favor, selecione um período acadêmico.");
      return;
    }

    // Verificar se o campo de matrícula está vazio
    if (matricula.trim() === "") {
      showError("Por favor, insira a matrícula do aluno.");
      return;
    }

    try {
      handleLimparAulasClick();
      const professorResponse = await get(`professores/matricula/${matricula}`);
      console.log("Dados do professor:", professorResponse);
      setProfessor(professorResponse);
      renderizarTabelaProfessor(); // Chamada para renderizar a tabela do professor
      //generateBarcode(matricula);
      carregarTabela();
      return;
    } catch (error) {
      handleLimparAulasClick();
    }

    try {
      handleLimparAulasClick();
      const alunoResponse = await get(`alunos/matricula/${matricula}`);
      console.log("Dados do aluno:", alunoResponse);
      setAluno(alunoResponse);
      renderizarTabelaAluno(); // Chamada para renderizar a tabela do aluno
      //generateBarcode(matricula);
      carregarTabela();
      return;
    } catch (error) {
      handleLimparAulasClick();
    }

    showError("Matrícula não encontrada.");
  };

  const generatePDF = async () => {
    if (!horarioRef.current) return null;

    const canvas = await html2canvas(horarioRef.current);
    const pageWidth = 1300;
    const pageHeight = 450;
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: [pageWidth, pageHeight],
    });

    const imgWidth = 1200;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let solicitante = '';

    const x = (pageWidth - imgWidth) / 2;

    // Cabeçalho
    pdf.setFillColor(44, 102, 60);
    pdf.setTextColor(255);
    pdf.setFontSize(20);
    pdf.rect(0, 0, pageWidth, 30, 'F');
    pdf.text("Horário de Aulas", pageWidth / 2, 20, { align: 'center' });

    pdf.setTextColor(0);
    pdf.setFontSize(10);

    if (professor) {
      solicitante = professor.nome;
      pdf.setFillColor(227, 227, 227);
      pdf.rect(x, 40, imgWidth, 20, 'F');
      pdf.text(`Professor: ${professor.nome}`, x + 10, 50);
      pdf.setFillColor(227, 227, 227);
      pdf.rect(x, 60, imgWidth, 20, 'F');
      pdf.text(`Siape: ${professor.matricula}`, x + 10, 70);
    } else {
      solicitante = aluno!.nome;
      pdf.setFillColor(227, 227, 227);
      pdf.rect(x, 40, imgWidth, 20, 'F');
      pdf.text(`Aluno: ${aluno?.nome}`, x + 10, 50);
      pdf.setFillColor(227, 227, 227);
      pdf.rect(x, 60, imgWidth, 20, 'F');
      pdf.text(`Matrícula: ${aluno?.matricula}`, x + 10, 70);
      pdf.setFillColor(227, 227, 227);
      pdf.rect(x, 80, imgWidth, 20, 'F');
      pdf.text(`Curso: ${aluno?.curso.nome}`, x + 10, 90);
      pdf.setFillColor(227, 227, 227);
      pdf.rect(x, 100, imgWidth, 20, 'F');
      pdf.text(`Turma: ${aluno?.turma.nome}`, x + 10, 110);
    }

    // Adiciona a imagem capturada como tabela
    const margins = { top: 150, bottom: 60, left: 40, right: 40 };
    pdf.addImage(imgData, 'PNG', margins.left, margins.top, imgWidth, imgHeight);

    // Rodapé
    const imgWidthFooter = 37;
    const imgHeightFooter = 17;
    const xFooter = pageWidth - imgWidthFooter - 10;
    const yFooter = pageHeight - imgHeightFooter - 10;
    pdf.addImage(imgifes, 'PNG', xFooter, yFooter, imgWidthFooter, imgHeightFooter);

    return { pdf, solicitante };
  };

  // Função para baixar o PDF
  const handleBaixarPDFClick = async () => {
    const result = await generatePDF();
    if (result) {
      const { pdf, solicitante } = result;
      pdf.save(`horario_${solicitante}.pdf`);
    }
  };

  const handleEnviarPDFClick = async () => {
    const result = await generatePDF();
    if (result) {
      const { pdf, solicitante } = result;
      const pdfBlob = pdf.output('blob');
      const file = new File([pdfBlob], `horario_${solicitante}.pdf`, { type: 'application/pdf' });

      const formData = new FormData();
      formData.append('source', 'seu-email@dominio.com');
      formData.append('target', email);
      formData.append('subject', 'Horário de Aulas');
      formData.append('message', `Olá ${solicitante}, segue em anexo os horários de aula referente ao período ${periodo}.`);
      formData.append('attachment', file);

      fetch('http://localhost:8080/api/emails/send-email', {
        method: 'POST',
        body: formData,
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Ocorreu um erro ao enviar o email.');
          }
          alert('Email enviado com sucesso!');
        })
        .catch(error => {
          console.error('Erro ao enviar email:', error);
          alert('Ocorreu um erro ao enviar o email.');
        });
    }
  };





  const showError = (errorMessage: string) => {
    message.error(errorMessage);
  };

  const handleLimparAulasClick = () => {
    setAulas([]);
    setAluno(null);
    setProfessor(null);
    setMatricula('');
  };

  const renderPeriodoAcademico = (periodoAcademico: PeriodoAcademico) => {
    if (periodoAcademico) {
      if (periodoAcademico.formato === "ANUAL") {
        return `${periodoAcademico.ano}`;
      } else {
        return `${periodoAcademico.ano}/${periodoAcademico.periodo}`;
      }
    }
    return "";
  };

  const renderProfessorAbreviado = (nome: string) => {
    const partesNome = nome.split(" ");
    if (partesNome.length >= 2) {
      // Pegar a primeira letra do primeiro nome
      const primeiroNome = partesNome[0];
      // Pegar as iniciais do restante do nome
      const iniciaisRestanteNome = partesNome
        .slice(1)
        .map((parte) => parte.charAt(0))
        .join("");
      return primeiroNome + " " + iniciaisRestanteNome;
    }
    return nome; // Retorna o nome original se não for possível abreviar
  };

  const renderDescricaoLocalAbreviada = (descricao: string) => {
    const palavras = descricao.split(" ");
    if (palavras.length >= 2) {
      // Pegar as primeiras 4 letras da primeira palavra
      const primeiraPalavraAbreviada = palavras[0].substring(0, 4);
      // Pegar a segunda palavra
      const segundaPalavra = palavras[1];
      return primeiraPalavraAbreviada + " " + segundaPalavra;
    }
    return descricao; // Retorna a descrição original se não for possível abreviar
  };

  const handleQuantityChange = (value: number) => {
    setSelectedQuantity(value); // Atualizar a quantidade selecionada
  };

  const handleModalCancel = () => {
    setIsModalVisible(false); // Fechar o modal
  };


  const renderizarTabela = () => {
    // Array para armazenar as células da tabela
    const tabela: JSX.Element[] = [];

    // Dias da semana e horários da tabela
    const diasSemana = ["SEG", "TER", "QUA", "QUI", "SEX"];
    const horarios = [
      { inicio: "07:00", fim: "07:50" },
      { inicio: "07:50", fim: "08:40" },
      { inicio: "08:40", fim: "09:30" },
      { inicio: "09:50", fim: "10:40" },
      { inicio: "10:40", fim: "11:30" },
      { inicio: "11:30", fim: "12:20" },
      { inicio: "13:00", fim: "13:50" },
      { inicio: "13:50", fim: "14:40" },
      { inicio: "14:40", fim: "15:30" },
      { inicio: "15:50", fim: "16:40" },
      { inicio: "16:40", fim: "17:30" },
      { inicio: "17:30", fim: "18:20" },
      { inicio: "18:50", fim: "19:35" },
      { inicio: "19:35", fim: "20:20" },
      { inicio: "20:30", fim: "21:15" },
      { inicio: "21:15", fim: "22:00" },
    ];

    // Iterar sobre os dias da semana e horários
    diasSemana.forEach((dia) => {
      const celulas = horarios.map((horario) => {
        // Encontrar a aula correspondente ao dia e horário atual
        const aulaCorrespondente = aulas.find((aula) => {
          const diaAula = aula.diaSemana.substring(0, 3); // Pegar as 3 primeiras letras do dia da aula
          return (
            diaAula === dia &&
            aula.horarios.some(
              (h) =>
                h.horaInicio.substring(0, 5) === horario.inicio &&
                h.horaFim.substring(0, 5) === horario.fim
            )
          );
        });

        // Extrair as três primeiras letras da disciplina ou renderizar uma célula vazia
        const disciplinaAbreviada = aulaCorrespondente
          ? aulaCorrespondente.disciplina.sigla
          : "";
        // Abreviar o nome do professor
        const nomeProfessorAbreviado = aulaCorrespondente
          ? renderProfessorAbreviado(aulaCorrespondente.professor.nome)
          : "";
        // Abreviar a descrição do local
        const descricaoLocalAbreviada = aulaCorrespondente
          ? renderDescricaoLocalAbreviada(aulaCorrespondente.local.descricao)
          : "";

        // Renderizar as informações na célula
        return (
          <td key={`${dia}-${horario.inicio}`} className="info-cell">
            {nomeProfessorAbreviado}
            <br />
            {disciplinaAbreviada}
            <br />
            {descricaoLocalAbreviada}
          </td>
        );
      });
      // Adicionar a linha da tabela ao array
      tabela.push(
        <tr key={dia}>
          <td>{dia}</td>
          {celulas}
        </tr>
      );
    });

    return tabela;
  };

  const renderizarTabelaProfessor = () => {
    if (professor) {
      return (
        <table className="table-container info-table">
          <tbody>
            <tr>
              <th>Professor</th>
              <td>{professor.nome}</td>
            </tr>
            <tr>
              <th>Matrícula</th>
              <td>{professor.matricula}</td>
            </tr>
          </tbody>
        </table>
      );
    }
    return null;
  };

  const renderizarTabelaAluno = () => {
    if (aluno) {
      return (
        <table className="table-container info-table">
          <tbody>
            <tr>
              <th>Aluno</th>
              <td>{aluno.nome}</td>
            </tr>
            <tr>
              <th>Matrícula</th>
              <td>{aluno.matricula}</td>
            </tr>
            <tr>
              <th>Curso</th>
              <td>{aluno.curso.nome}</td>
            </tr>
            <tr>
              <th>Turma</th>
              <td>{aluno.turma.nome}</td>
            </tr>
          </tbody>
        </table>
      );
    }
    return null;
  };

  const generateBarcode = (matricula: string) => {
    const canvas = document.getElementById("barcode") as HTMLCanvasElement | null;
    if (canvas) {
      JsBarcode(canvas, matricula, {
        format: "CODE128",
        displayValue: false,
      });
    }
  };

  const formatarDataHora = () => {
    const now = new Date();

    // Obtendo dia, mês, ano, horas, minutos e segundos
    const dia = String(now.getDate()).padStart(2, '0');
    const mes = String(now.getMonth() + 1).padStart(2, '0'); // Mês é baseado em zero
    const ano = now.getFullYear();
    const horas = String(now.getHours()).padStart(2, '0');
    const minutos = String(now.getMinutes()).padStart(2, '0');
    const segundos = String(now.getSeconds()).padStart(2, '0');

    // Montando a string no formato desejado
    const dataHoraFormatada = `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;

    return dataHoraFormatada;
  };


  const handleImprimirHorarioClick = () => {
    const nomePessoa = aluno?.nome || professor?.nome;
    const matriculaPessoa = aluno?.matricula || professor?.matricula;
    if (!matriculaPessoa) {
      showError("Aluno ou professor não encontrado ou matrícula indefinida.");
      return;
    }

    const printWindow = window.open("", "_blank");

    // Objeto para traduzir abreviações de dias da semana para nomes completos

    const styles = `
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 20px;
        padding: 20px;
      }
      .periodo {
        margin-top: 20px;
        font-size: 14px;
      }
      .info {
        margin-top: 10px;
        font-weight: bold;
      }
      .titulo {
        font-weight: bold;
        margin-bottom: 10px;
        font-size: 16px;
      }
      .titulo-principal {
        text-align: center;
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 10px;
      }
      .section {
        margin-top: 30px; /* Espaço maior entre os dias da semana */
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      th {
        background-color: #f2f2f2;
        font-weight: bold;
      }
  
      /* Estilos específicos para impressão */
      @media print {
        @page {
          size: 80mm 300mm; /* Tamanho da página para a impressora térmica */
          margin: 0;
        }
        body {
          margin: 0;
          padding: 10px;
          font-family: Arial, sans-serif;
        }
        .periodo {
          margin-top: 20px;
          font-size: 14px;
        }
        .info {
          margin-top: 10px;
          font-weight: bold;
        }
        .logoIfes img {
        max-width: 100%;
        height: auto;
        object-fit: contain;
        filter: invert(100%);
        margin: 0 0 18px 0;
        }
        .titulo {
          font-weight: bold;
          margin-bottom: 5px;
          font-size: 16px;
        }
        .titulo-principal {
          text-align: center;
          font-weight: bold;
          font-size: 18px;
          margin-bottom: 10px;
        }
        .section {
          margin-top: 30px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: center; /* Centralizar o conteúdo das células */
        }
        th {
          background-color: #f2f2f2;
          font-weight: bold;
        }
      }
    </style>
  `;

    let horarioContent = `
  <html>
    <head>
      <title>Horário</title>
      ${styles} <!-- Incluindo estilos CSS -->
    </head>
    <body>
      <div class="logoIfes">
          <img src="${logo}" alt="Logo IFES" />
      </div>
      <div class="periodo">
        <div class="titulo-principal">Horários das Aulas</div>
        </br>
        <div class="info">
          ${aluno ? `Aluno:` : `Professor:`} ${nomePessoa}
        </div>
        <div class="info">
          Matrícula: ${matriculaPessoa}
        </div>
        <div class="info">
          Data/hora impressão: ${formatarDataHora()}
        </div>
      </div>
`;

    // Aqui continua o código para adicionar os dias da semana com espaçamento e tabelas...




    // Agrupar aulas por dia da semana
    const aulasPorDia: { [dia: string]: Aula[] } = aulas.reduce((acc: { [dia: string]: Aula[] }, aula) => {
      const dia = aula.diaSemana.substring(0, 3);
      if (!acc[dia]) acc[dia] = [];
      acc[dia].push(aula);
      return acc;
    }, {});

    const nomeDias = {
      SEG: "Segunda-feira",
      TER: "Terça-feira",
      QUA: "Quarta-feira",
      QUI: "Quinta-feira",
      SEX: "Sexta-feira"
    };

    const diasSemana = ["SEG", "TER", "QUA", "QUI", "SEX"];
    diasSemana.forEach((diaAbreviado) => {
      const nomeDia = nomeDias[diaAbreviado as keyof typeof nomeDias];


      if (aulasPorDia[diaAbreviado]) {
        horarioContent += `
          <div class="section">
            <div class="titulo">${nomeDia}</div>
            <table>
              <thead>
                <tr>
                  <th>Horário</th>
                  <th>Disciplina</th>
                  <th>Professor</th>
                  <th>Local</th>
                </tr>
              </thead>
              <tbody>
        `;

        aulasPorDia[diaAbreviado].forEach((aula) => {
          aula.horarios.forEach((horario) => {
            horarioContent += `
              <tr>
                <td>${horario.horaInicio.substring(0, 5)} ${horario.horaFim.substring(0, 5)}</td>
                <td>${aula.disciplina.sigla}</td>
                <td>${renderProfessorAbreviado(aula.professor.nome)}</td>
                <td>${renderDescricaoLocalAbreviada(aula.local.descricao)}</td>
              </tr>
            `;
          });
        });

        horarioContent += `
            </tbody>
          </table>
        </div>
        `;
      }
    });

    // Fechamento do conteúdo do HTML para impressão
    horarioContent += `
        </body>
      </html>
    `;

    printWindow?.document.write(horarioContent);
    printWindow?.document.close();
    printWindow?.print();
  };



  const handleImprimirEtiquetasClick = () => {
    const matricula = aluno?.matricula || professor?.matricula;
    if (!matricula) {
      showError("Aluno ou professor não encontrado ou matrícula indefinida.");
      return;
    }

    const larguraEtiqueta = 38; // Largura individual da etiqueta em mm
    const larguraTotal = 3 * larguraEtiqueta; // Largura total em mm

    const printWindow = window.open("", "_blank", `width=${larguraTotal}mm`);

    let etiquetasContent = `
        <html>
            <head>
                <title>Etiquetas</title>
                <style>
                    @media print {
                        @page {
                            size: ${larguraTotal}mm 22mm;
                            margin: 0;
                        }
                        body {
                            margin: 0;
                            padding: 0;
                            display: flex;
                            justify-content: space-between;
                            flex-wrap: nowrap;
                        }
                        .etiqueta {
                          width: ${larguraEtiqueta}mm;
                          height: 75px; /* Defina uma altura fixa para a etiqueta */
                          box-sizing: border-box;
                          display: flex;
                          flex-direction: column;
                          align-items: center;
                          justify-content: center;
                          text-align: center;
                      }
                      
                        img {
                            width: 95%;
                            height: auto;
                        }
                        .matricula-text {
                          font-size: 12px;
                          font-weight: bold;
                      }
                      
                    }
                </style>
            </head>
            <body>
    `;

    for (let i = 0; i < selectedQuantity; i++) {
      const canvas = document.createElement("canvas");
      JsBarcode(canvas, matricula, {
        format: "CODE128",
        displayValue: false,
      });

      const imageData = canvas.toDataURL("image/png");

      etiquetasContent += `
          <div class="etiqueta">
              <img src="${imageData}" />
              <div class="matricula-text">${matricula}</div>
          </div>
      `;
    }

    etiquetasContent += `
            </body>
        </html>
    `;

    printWindow?.document.write(etiquetasContent);
    printWindow?.document.close();
    printWindow?.print();
  };


  return (
    <div>
      <style>
        {`
                .table-container {
                    border: 2px solid black;
                    border-collapse: collapse;
                    width: 100%;
                }
                
                th, td {
                    border: 1px solid black;
                    padding: 8px;
                    text-align: center;
                }
                
                th {
                    background-color: #f2f2f2;
                    font-weight: bold;
                }

                .info-table {
                    width: auto;
                    margin-top: 10px;
                    margin-bottom: 50px;
                }

                .info-cell {
                    font-size: 12px; // Defina o tamanho da fonte desejado  
                }
            `}
      </style>
      <div style={{ marginBottom: "16px" }}>
        <Select
          style={{ width: 200, marginRight: "16px" }}
          onChange={handlePeriodoChange}
        >
          {Array.isArray(periodosLetivos) &&
            periodosLetivos.map((periodo) => (
              <Option key={periodo.id} value={periodo.id}>
                {renderPeriodoAcademico(periodo)}
              </Option>
            ))}
        </Select>
        <Input
          placeholder="Matrícula"
          style={{ width: 200, marginRight: "16px" }}
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
          onPressEnter={handleVerProximaAulaClick}
        />
<Button type="primary" onClick={handleVerProximaAulaClick}>
  Ver aulas
</Button>
<Button
  type="primary"
  onClick={handleLimparAulasClick}
  style={{ marginLeft: "16px" }}
>
  Limpar
</Button>
{(aluno || professor) && (
  <Button
    type="primary"
    onClick={handleImprimirMatriculaClick}
    style={{ marginLeft: "16px", backgroundColor: '#1890ff', borderColor: '#1890ff' }}
    icon={<PrinterOutlined style={{ fontSize: '16px' }} />}
  >
    Imprimir matrícula
  </Button>
)}
{(aluno || professor) && (
  <Button
    type="primary"
    onClick={handleImprimirHorarioClick}
    style={{ marginLeft: "16px", backgroundColor: '#1890ff', borderColor: '#1890ff' }} // Cor verde para o botão "Imprimir horário"
    icon={<PrinterOutlined style={{ fontSize: '16px' }} />}
  >
    Imprimir horário
  </Button>
)}
<Modal
  title="Selecione a quantidade de etiquetas"
  visible={isModalVisible}
  onOk={handleModalOk}
  onCancel={handleModalCancel}
>
  <Select
    defaultValue={1}
    style={{ width: 120 }}
    onChange={handleQuantityChange}
  >
    <Option value={1}>1</Option>
    <Option value={2}>2</Option>
    <Option value={3}>3</Option>
  </Select>
</Modal>
{(aluno || professor) && (
  <>
    <Button
      type="primary"
      onClick={handleBaixarPDFClick}
      style={{ marginLeft: "16px", background: "#cc0b00" }}
    >
      Baixar PDF
    </Button>
    <Button
      type="primary"
      onClick={() => setIsEmailInputVisible(true)}
      style={{ marginLeft: "16px", background: "#cc0b00" }}
    >
      Enviar PDF por e-mail
    </Button>
            {isEmailInputVisible && (
              <div style={{ marginTop: '16px' }}>
                <Input
                  placeholder="Digite o e-mail"
                  style={{ width: 300, marginRight: '10px' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="primary" onClick={handleEnviarPDFClick}>
                  Enviar
                </Button>
              </div>
            )}
          </>
        )}
        <Modal
          title="Selecione a quantidade de etiquetas"
          visible={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
        >
          <Select
            defaultValue={1}
            style={{ width: 120 }}
            onChange={handleQuantityChange}
          >
            <Option value={1}>1</Option>
            <Option value={2}>2</Option>
            <Option value={3}>3</Option>
          </Select>
        </Modal>
      </div>
      {aluno && renderizarTabelaAluno()}
      {professor && renderizarTabelaProfessor()}
      <table ref={horarioRef} className="table-container">
        <thead>
          <tr>
            <th></th>
            <th colSpan={6}>MATUTINO</th>
            <th colSpan={6}>VESPERTINO</th>
            <th colSpan={4}>NOTURNO</th>
          </tr>
          <tr>
            <th></th>
            <th>
              07:00 <br /> 07:50
            </th>
            <th>
              07:50 <br /> 08:40
            </th>
            <th>
              08:40 <br /> 09:30
            </th>
            <th>
              09:50 <br /> 10:40
            </th>
            <th>
              10:40 <br /> 11:30
            </th>
            <th>
              11:30 <br /> 12:20
            </th>
            <th>
              13:00 <br /> 13:50
            </th>
            <th>
              13:50 <br /> 14:40
            </th>
            <th>
              14:40 <br /> 15:30
            </th>
            <th>
              15:50 <br /> 16:40
            </th>
            <th>
              16:40 <br /> 17:30
            </th>
            <th>
              17:30 <br /> 18:20
            </th>
            <th>
              18:50 <br /> 19:35
            </th>
            <th>
              19:35 <br /> 20:20
            </th>
            <th>
              20:30 <br /> 21:15
            </th>
            <th>
              21:15 <br /> 22:00
            </th>
          </tr>
        </thead>
        <tbody>{renderizarTabela()}</tbody>
      </table>
      <canvas id="barcode"></canvas>
    </div>
  );
};
export default HorarioTable;