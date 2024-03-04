import React, { useState } from "react";
import { Button, Modal } from "antd";
import "./styles.css";
import { CardCadastro } from "../../components/CardCadastro";
import { SecurityScanOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

interface Question {
  id: number;
  question: string;
}

interface QuestionsByCategory {
  [category: string]: Question[];
}

const PerguntasFrequentes = () => {
  const [showModalPerguntasFreq, setShowModalPerguntasFreq] = useState(false);
  const [isModalHelp, setIsModalHelp] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [category, setCategory] = useState<string>("");

  const navigate = useNavigate();

  const questions: QuestionsByCategory = {
    PCMSO: [
      { id: 1, question: "Como faço para inserir um PCMSO?" },
      { id: 2, question: "Como faço para clonar PGR?" },
      { id: 2, question: "Como faço para clonar itens de um PCMSO" },
      { id: 2, question: "Como faço para inserir um dossiê eletrônico?" },
    ],
    Usuário: [{ id: 3, question: "Como redefinir minha senha?" }],
    Segurança: [{ id: 4, question: "Como configurar as opções de segurança?" }],
    Cadastros: [
      { id: 1, question: "Como faço para cadastrar um novo usuário?" },
      { id: 2, question: "Como faço para editar um usuário?" },
    ],
  };

  const handleQuestionClick = (category: string, question: Question) => {
    setSelectedQuestion(question);
    setCategory(category);
    navigate(`/Perguntas Frequentes/${question.question}`);
  };

  const renderQuestions = () => {
    return Object.entries(questions).map(([category, questionList]) => (
      <div>
        <CardCadastro titulo={category} icone={<SecurityScanOutlined />}>
          <div>
            {questionList &&
              questionList.map((q: Question) => (
                <Button
                  key={q.id}
                  type="link"
                  className="question-link questions-container"
                  onClick={() => handleQuestionClick(category, q)}
                >
                  {q.question}
                </Button>
              ))}
          </div>
        </CardCadastro>
      </div>
    ));
  };


  return <>{renderQuestions()}</>;
};

export default PerguntasFrequentes;
