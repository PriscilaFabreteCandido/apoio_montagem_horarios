#Estrutura de pastas

`assets`: Serve para armazenar imagens(imagens leves), icones, etc.

`components`: Componentes reutilizáveis da aplicação. Componentes que são unidades para sua aplicação, um button, um dropsown, um model, etc.

`hooks`: Essa pasta é utilizada para armazenar hooks que são genéricos, têm interação com hooks do React(useState, useEffect)
e normalmente reutilizáveis e qualquer projeto, exemplos: useScreenSize, useLocalStorage, useSessionStorage, useUserActive.

`pages`: As pages são as páginas que usam vários componentes. É essa página que o usuário vai ver.


`services`: Aqui ficam as configurações de HTTP clientes

`store`: Ficam as definições de state managers, context api, zustand, redux

`types`: Armazena as tipagens de typescript(types e interfaces) que são comuns em várias áreas do projeto.

`util`: Funções utilitárias como formartCurrenty, convert, etc..
