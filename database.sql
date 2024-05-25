PGDMP                         |            sistema_academico    15.4    15.4 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    31236    sistema_academico    DATABASE     �   CREATE DATABASE sistema_academico WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';
 !   DROP DATABASE sistema_academico;
                postgres    false            �            1259    31237    acao    TABLE       CREATE TABLE public.acao (
    id bigint NOT NULL,
    local_realizacao character varying(255),
    nome character varying(255),
    qtd_participantes integer,
    qtd_vagas integer,
    instituicao_id bigint,
    projeto_id bigint,
    tipo_acao_id bigint
);
    DROP TABLE public.acao;
       public         heap    postgres    false            �            1259    31242    acao_id_seq    SEQUENCE     t   CREATE SEQUENCE public.acao_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.acao_id_seq;
       public          postgres    false    214            �           0    0    acao_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.acao_id_seq OWNED BY public.acao.id;
          public          postgres    false    215            �            1259    31243    aluno    TABLE     �   CREATE TABLE public.aluno (
    curso_id bigint,
    id bigint NOT NULL,
    turma_id bigint,
    matricula character varying(255),
    nome character varying(255)
);
    DROP TABLE public.aluno;
       public         heap    postgres    false            �            1259    31248    aluno_id_seq    SEQUENCE     u   CREATE SEQUENCE public.aluno_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.aluno_id_seq;
       public          postgres    false    216            �           0    0    aluno_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.aluno_id_seq OWNED BY public.aluno.id;
          public          postgres    false    217            �            1259    31249    aula    TABLE     �   CREATE TABLE public.aula (
    numero_aulas integer,
    disciplina_id bigint,
    id bigint NOT NULL,
    local_id bigint,
    periodo_academico_id bigint,
    professor_id bigint,
    turma_id bigint,
    dia_semana character varying(255)
);
    DROP TABLE public.aula;
       public         heap    postgres    false            �            1259    31252 
   aula_aluno    TABLE     ^   CREATE TABLE public.aula_aluno (
    aluno_id bigint NOT NULL,
    aula_id bigint NOT NULL
);
    DROP TABLE public.aula_aluno;
       public         heap    postgres    false            �            1259    31255    aula_horario    TABLE     b   CREATE TABLE public.aula_horario (
    aula_id bigint NOT NULL,
    horario_id bigint NOT NULL
);
     DROP TABLE public.aula_horario;
       public         heap    postgres    false            �            1259    31258    aula_id_seq    SEQUENCE     t   CREATE SEQUENCE public.aula_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.aula_id_seq;
       public          postgres    false    218            �           0    0    aula_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.aula_id_seq OWNED BY public.aula.id;
          public          postgres    false    221            �            1259    31259    coordenador_turno    TABLE     c   CREATE TABLE public.coordenador_turno (
    id bigint NOT NULL,
    nome character varying(255)
);
 %   DROP TABLE public.coordenador_turno;
       public         heap    postgres    false            �            1259    31262    coordenador_turno_id_seq    SEQUENCE     �   CREATE SEQUENCE public.coordenador_turno_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.coordenador_turno_id_seq;
       public          postgres    false    222            �           0    0    coordenador_turno_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.coordenador_turno_id_seq OWNED BY public.coordenador_turno.id;
          public          postgres    false    223            �            1259    31263    coordenadoria    TABLE     d   CREATE TABLE public.coordenadoria (
    id bigint NOT NULL,
    descricao character varying(255)
);
 !   DROP TABLE public.coordenadoria;
       public         heap    postgres    false            �            1259    31266    coordenadoria_id_seq    SEQUENCE     }   CREATE SEQUENCE public.coordenadoria_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.coordenadoria_id_seq;
       public          postgres    false    224            �           0    0    coordenadoria_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.coordenadoria_id_seq OWNED BY public.coordenadoria.id;
          public          postgres    false    225            �            1259    31267    curso    TABLE     t   CREATE TABLE public.curso (
    coordenadoria_id bigint,
    id bigint NOT NULL,
    nome character varying(255)
);
    DROP TABLE public.curso;
       public         heap    postgres    false            �            1259    31270    curso_id_seq    SEQUENCE     u   CREATE SEQUENCE public.curso_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.curso_id_seq;
       public          postgres    false    226            �           0    0    curso_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.curso_id_seq OWNED BY public.curso.id;
          public          postgres    false    227            �            1259    31271 
   disciplina    TABLE     �   CREATE TABLE public.disciplina (
    curso_id bigint,
    id bigint NOT NULL,
    nome character varying(255),
    sigla character varying(255)
);
    DROP TABLE public.disciplina;
       public         heap    postgres    false            �            1259    31276    disciplina_id_seq    SEQUENCE     z   CREATE SEQUENCE public.disciplina_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.disciplina_id_seq;
       public          postgres    false    228            �           0    0    disciplina_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.disciplina_id_seq OWNED BY public.disciplina.id;
          public          postgres    false    229            �            1259    31277    equipamento    TABLE     b   CREATE TABLE public.equipamento (
    id bigint NOT NULL,
    descricao character varying(255)
);
    DROP TABLE public.equipamento;
       public         heap    postgres    false            �            1259    31280    equipamento_id_seq    SEQUENCE     {   CREATE SEQUENCE public.equipamento_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.equipamento_id_seq;
       public          postgres    false    230            �           0    0    equipamento_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.equipamento_id_seq OWNED BY public.equipamento.id;
          public          postgres    false    231            �            1259    31281    evento    TABLE     �   CREATE TABLE public.evento (
    data date,
    hora_fim time(6) without time zone,
    hora_inicio time(6) without time zone,
    id bigint NOT NULL,
    descricao character varying(255)
);
    DROP TABLE public.evento;
       public         heap    postgres    false            �            1259    31284    evento_id_seq    SEQUENCE     v   CREATE SEQUENCE public.evento_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.evento_id_seq;
       public          postgres    false    232            �           0    0    evento_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.evento_id_seq OWNED BY public.evento.id;
          public          postgres    false    233            �            1259    31285    funcao    TABLE     X   CREATE TABLE public.funcao (
    id bigint NOT NULL,
    nome character varying(255)
);
    DROP TABLE public.funcao;
       public         heap    postgres    false            �            1259    31288    funcao_id_seq    SEQUENCE     v   CREATE SEQUENCE public.funcao_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.funcao_id_seq;
       public          postgres    false    234            �           0    0    funcao_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.funcao_id_seq OWNED BY public.funcao.id;
          public          postgres    false    235                       1259    31508    historico_aula    TABLE     �   CREATE TABLE public.historico_aula (
    id bigint NOT NULL,
    data_hora_modificacao timestamp(6) without time zone,
    descricao character varying(255),
    usuario character varying(255)
);
 "   DROP TABLE public.historico_aula;
       public         heap    postgres    false                        1259    31507    historico_aula_id_seq    SEQUENCE     ~   CREATE SEQUENCE public.historico_aula_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.historico_aula_id_seq;
       public          postgres    false    257            �           0    0    historico_aula_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.historico_aula_id_seq OWNED BY public.historico_aula.id;
          public          postgres    false    256            �            1259    31289    horario_aula    TABLE     �   CREATE TABLE public.horario_aula (
    hora_fim time(6) without time zone,
    hora_inicio time(6) without time zone,
    id bigint NOT NULL
);
     DROP TABLE public.horario_aula;
       public         heap    postgres    false            �            1259    31292    horario_aula_id_seq    SEQUENCE     |   CREATE SEQUENCE public.horario_aula_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.horario_aula_id_seq;
       public          postgres    false    236            �           0    0    horario_aula_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.horario_aula_id_seq OWNED BY public.horario_aula.id;
          public          postgres    false    237            �            1259    31293    instituicao    TABLE     
  CREATE TABLE public.instituicao (
    id bigint NOT NULL,
    avenida character varying(255),
    cep character varying(255),
    descricao character varying(255),
    nome character varying(255),
    numero character varying(255),
    rua character varying(255)
);
    DROP TABLE public.instituicao;
       public         heap    postgres    false            �            1259    31298    instituicao_id_seq    SEQUENCE     {   CREATE SEQUENCE public.instituicao_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.instituicao_id_seq;
       public          postgres    false    238            �           0    0    instituicao_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.instituicao_id_seq OWNED BY public.instituicao.id;
          public          postgres    false    239            �            1259    31299    local    TABLE     t   CREATE TABLE public.local (
    capacidade integer,
    id bigint NOT NULL,
    descricao character varying(255)
);
    DROP TABLE public.local;
       public         heap    postgres    false            �            1259    31302    local_equipamento    TABLE     �   CREATE TABLE public.local_equipamento (
    quantidade integer,
    equipamento_id bigint,
    id bigint NOT NULL,
    local_id bigint
);
 %   DROP TABLE public.local_equipamento;
       public         heap    postgres    false            �            1259    31305    local_equipamento_id_seq    SEQUENCE     �   CREATE SEQUENCE public.local_equipamento_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.local_equipamento_id_seq;
       public          postgres    false    241            �           0    0    local_equipamento_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.local_equipamento_id_seq OWNED BY public.local_equipamento.id;
          public          postgres    false    242            �            1259    31306    local_id_seq    SEQUENCE     u   CREATE SEQUENCE public.local_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.local_id_seq;
       public          postgres    false    240            �           0    0    local_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.local_id_seq OWNED BY public.local.id;
          public          postgres    false    243            �            1259    31307    periodo_academico    TABLE     B  CREATE TABLE public.periodo_academico (
    ano integer,
    data_fim date,
    data_inicio date,
    id bigint NOT NULL,
    formato character varying(255),
    periodo character varying(255),
    CONSTRAINT periodo_academico_formato_check CHECK (((formato)::text = ANY (ARRAY[('SEMESTRAL'::character varying)::text, ('ANUAL'::character varying)::text]))),
    CONSTRAINT periodo_academico_periodo_check CHECK (((periodo)::text = ANY (ARRAY[('PRIMEIRO_PERIODO'::character varying)::text, ('SEGUNDO_PERIODO'::character varying)::text, ('NENHUM'::character varying)::text])))
);
 %   DROP TABLE public.periodo_academico;
       public         heap    postgres    false            �            1259    31314    periodo_academico_id_seq    SEQUENCE     �   CREATE SEQUENCE public.periodo_academico_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.periodo_academico_id_seq;
       public          postgres    false    244            �           0    0    periodo_academico_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.periodo_academico_id_seq OWNED BY public.periodo_academico.id;
          public          postgres    false    245            �            1259    31315    pessoa    TABLE     Z  CREATE TABLE public.pessoa (
    id bigint NOT NULL,
    cpf character varying(255),
    dt_nascimento date,
    email character varying(255),
    matricula character varying(255),
    nivel_escolaridade character varying(255),
    nome character varying(255),
    senha character varying(255),
    funcao_id bigint,
    instituicao_id bigint
);
    DROP TABLE public.pessoa;
       public         heap    postgres    false            �            1259    31320    pessoa_id_seq    SEQUENCE     v   CREATE SEQUENCE public.pessoa_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.pessoa_id_seq;
       public          postgres    false    246            �           0    0    pessoa_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.pessoa_id_seq OWNED BY public.pessoa.id;
          public          postgres    false    247            �            1259    31321 	   professor    TABLE     �   CREATE TABLE public.professor (
    coordenador boolean,
    coordenadoria_id bigint,
    id bigint NOT NULL,
    matricula character varying(255),
    nome character varying(255)
);
    DROP TABLE public.professor;
       public         heap    postgres    false            �            1259    31326    professor_id_seq    SEQUENCE     y   CREATE SEQUENCE public.professor_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.professor_id_seq;
       public          postgres    false    248            �           0    0    professor_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.professor_id_seq OWNED BY public.professor.id;
          public          postgres    false    249            �            1259    31327    projeto    TABLE     Y   CREATE TABLE public.projeto (
    id bigint NOT NULL,
    nome character varying(255)
);
    DROP TABLE public.projeto;
       public         heap    postgres    false            �            1259    31330    projeto_id_seq    SEQUENCE     w   CREATE SEQUENCE public.projeto_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.projeto_id_seq;
       public          postgres    false    250            �           0    0    projeto_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.projeto_id_seq OWNED BY public.projeto.id;
          public          postgres    false    251            �            1259    31331 	   tipo_acao    TABLE     [   CREATE TABLE public.tipo_acao (
    id bigint NOT NULL,
    nome character varying(255)
);
    DROP TABLE public.tipo_acao;
       public         heap    postgres    false            �            1259    31334    tipo_acao_id_seq    SEQUENCE     y   CREATE SEQUENCE public.tipo_acao_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.tipo_acao_id_seq;
       public          postgres    false    252            �           0    0    tipo_acao_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.tipo_acao_id_seq OWNED BY public.tipo_acao.id;
          public          postgres    false    253            �            1259    31335    turma    TABLE     W   CREATE TABLE public.turma (
    id bigint NOT NULL,
    nome character varying(255)
);
    DROP TABLE public.turma;
       public         heap    postgres    false            �            1259    31338    turma_id_seq    SEQUENCE     u   CREATE SEQUENCE public.turma_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.turma_id_seq;
       public          postgres    false    254            �           0    0    turma_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.turma_id_seq OWNED BY public.turma.id;
          public          postgres    false    255            �           2604    31339    acao id    DEFAULT     b   ALTER TABLE ONLY public.acao ALTER COLUMN id SET DEFAULT nextval('public.acao_id_seq'::regclass);
 6   ALTER TABLE public.acao ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214            �           2604    31340    aluno id    DEFAULT     d   ALTER TABLE ONLY public.aluno ALTER COLUMN id SET DEFAULT nextval('public.aluno_id_seq'::regclass);
 7   ALTER TABLE public.aluno ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216            �           2604    31341    aula id    DEFAULT     b   ALTER TABLE ONLY public.aula ALTER COLUMN id SET DEFAULT nextval('public.aula_id_seq'::regclass);
 6   ALTER TABLE public.aula ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    218            �           2604    31342    coordenador_turno id    DEFAULT     |   ALTER TABLE ONLY public.coordenador_turno ALTER COLUMN id SET DEFAULT nextval('public.coordenador_turno_id_seq'::regclass);
 C   ALTER TABLE public.coordenador_turno ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    222            �           2604    31343    coordenadoria id    DEFAULT     t   ALTER TABLE ONLY public.coordenadoria ALTER COLUMN id SET DEFAULT nextval('public.coordenadoria_id_seq'::regclass);
 ?   ALTER TABLE public.coordenadoria ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    225    224            �           2604    31344    curso id    DEFAULT     d   ALTER TABLE ONLY public.curso ALTER COLUMN id SET DEFAULT nextval('public.curso_id_seq'::regclass);
 7   ALTER TABLE public.curso ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    227    226            �           2604    31345    disciplina id    DEFAULT     n   ALTER TABLE ONLY public.disciplina ALTER COLUMN id SET DEFAULT nextval('public.disciplina_id_seq'::regclass);
 <   ALTER TABLE public.disciplina ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    229    228            �           2604    31346    equipamento id    DEFAULT     p   ALTER TABLE ONLY public.equipamento ALTER COLUMN id SET DEFAULT nextval('public.equipamento_id_seq'::regclass);
 =   ALTER TABLE public.equipamento ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    231    230            �           2604    31347 	   evento id    DEFAULT     f   ALTER TABLE ONLY public.evento ALTER COLUMN id SET DEFAULT nextval('public.evento_id_seq'::regclass);
 8   ALTER TABLE public.evento ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    233    232            �           2604    31348 	   funcao id    DEFAULT     f   ALTER TABLE ONLY public.funcao ALTER COLUMN id SET DEFAULT nextval('public.funcao_id_seq'::regclass);
 8   ALTER TABLE public.funcao ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    235    234            �           2604    31511    historico_aula id    DEFAULT     v   ALTER TABLE ONLY public.historico_aula ALTER COLUMN id SET DEFAULT nextval('public.historico_aula_id_seq'::regclass);
 @   ALTER TABLE public.historico_aula ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    256    257    257            �           2604    31349    horario_aula id    DEFAULT     r   ALTER TABLE ONLY public.horario_aula ALTER COLUMN id SET DEFAULT nextval('public.horario_aula_id_seq'::regclass);
 >   ALTER TABLE public.horario_aula ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    237    236            �           2604    31350    instituicao id    DEFAULT     p   ALTER TABLE ONLY public.instituicao ALTER COLUMN id SET DEFAULT nextval('public.instituicao_id_seq'::regclass);
 =   ALTER TABLE public.instituicao ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    239    238            �           2604    31351    local id    DEFAULT     d   ALTER TABLE ONLY public.local ALTER COLUMN id SET DEFAULT nextval('public.local_id_seq'::regclass);
 7   ALTER TABLE public.local ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    243    240            �           2604    31352    local_equipamento id    DEFAULT     |   ALTER TABLE ONLY public.local_equipamento ALTER COLUMN id SET DEFAULT nextval('public.local_equipamento_id_seq'::regclass);
 C   ALTER TABLE public.local_equipamento ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    242    241            �           2604    31353    periodo_academico id    DEFAULT     |   ALTER TABLE ONLY public.periodo_academico ALTER COLUMN id SET DEFAULT nextval('public.periodo_academico_id_seq'::regclass);
 C   ALTER TABLE public.periodo_academico ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    245    244            �           2604    31354 	   pessoa id    DEFAULT     f   ALTER TABLE ONLY public.pessoa ALTER COLUMN id SET DEFAULT nextval('public.pessoa_id_seq'::regclass);
 8   ALTER TABLE public.pessoa ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    247    246            �           2604    31355    professor id    DEFAULT     l   ALTER TABLE ONLY public.professor ALTER COLUMN id SET DEFAULT nextval('public.professor_id_seq'::regclass);
 ;   ALTER TABLE public.professor ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    249    248            �           2604    31356 
   projeto id    DEFAULT     h   ALTER TABLE ONLY public.projeto ALTER COLUMN id SET DEFAULT nextval('public.projeto_id_seq'::regclass);
 9   ALTER TABLE public.projeto ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    251    250            �           2604    31357    tipo_acao id    DEFAULT     l   ALTER TABLE ONLY public.tipo_acao ALTER COLUMN id SET DEFAULT nextval('public.tipo_acao_id_seq'::regclass);
 ;   ALTER TABLE public.tipo_acao ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    253    252            �           2604    31358    turma id    DEFAULT     d   ALTER TABLE ONLY public.turma ALTER COLUMN id SET DEFAULT nextval('public.turma_id_seq'::regclass);
 7   ALTER TABLE public.turma ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    255    254            �          0    31237    acao 
   TABLE DATA           �   COPY public.acao (id, local_realizacao, nome, qtd_participantes, qtd_vagas, instituicao_id, projeto_id, tipo_acao_id) FROM stdin;
    public          postgres    false    214   ��       �          0    31243    aluno 
   TABLE DATA           H   COPY public.aluno (curso_id, id, turma_id, matricula, nome) FROM stdin;
    public          postgres    false    216   ��       �          0    31249    aula 
   TABLE DATA           �   COPY public.aula (numero_aulas, disciplina_id, id, local_id, periodo_academico_id, professor_id, turma_id, dia_semana) FROM stdin;
    public          postgres    false    218   ��       �          0    31252 
   aula_aluno 
   TABLE DATA           7   COPY public.aula_aluno (aluno_id, aula_id) FROM stdin;
    public          postgres    false    219   ��       �          0    31255    aula_horario 
   TABLE DATA           ;   COPY public.aula_horario (aula_id, horario_id) FROM stdin;
    public          postgres    false    220   N�       �          0    31259    coordenador_turno 
   TABLE DATA           5   COPY public.coordenador_turno (id, nome) FROM stdin;
    public          postgres    false    222   ��       �          0    31263    coordenadoria 
   TABLE DATA           6   COPY public.coordenadoria (id, descricao) FROM stdin;
    public          postgres    false    224   ��       �          0    31267    curso 
   TABLE DATA           ;   COPY public.curso (coordenadoria_id, id, nome) FROM stdin;
    public          postgres    false    226   D�       �          0    31271 
   disciplina 
   TABLE DATA           ?   COPY public.disciplina (curso_id, id, nome, sigla) FROM stdin;
    public          postgres    false    228   ��       �          0    31277    equipamento 
   TABLE DATA           4   COPY public.equipamento (id, descricao) FROM stdin;
    public          postgres    false    230   f�       �          0    31281    evento 
   TABLE DATA           L   COPY public.evento (data, hora_fim, hora_inicio, id, descricao) FROM stdin;
    public          postgres    false    232   ��       �          0    31285    funcao 
   TABLE DATA           *   COPY public.funcao (id, nome) FROM stdin;
    public          postgres    false    234   ��       �          0    31508    historico_aula 
   TABLE DATA           W   COPY public.historico_aula (id, data_hora_modificacao, descricao, usuario) FROM stdin;
    public          postgres    false    257   ��       �          0    31289    horario_aula 
   TABLE DATA           A   COPY public.horario_aula (hora_fim, hora_inicio, id) FROM stdin;
    public          postgres    false    236   ��       �          0    31293    instituicao 
   TABLE DATA           U   COPY public.instituicao (id, avenida, cep, descricao, nome, numero, rua) FROM stdin;
    public          postgres    false    238   M�       �          0    31299    local 
   TABLE DATA           :   COPY public.local (capacidade, id, descricao) FROM stdin;
    public          postgres    false    240   j�       �          0    31302    local_equipamento 
   TABLE DATA           U   COPY public.local_equipamento (quantidade, equipamento_id, id, local_id) FROM stdin;
    public          postgres    false    241   ��       �          0    31307    periodo_academico 
   TABLE DATA           ]   COPY public.periodo_academico (ano, data_fim, data_inicio, id, formato, periodo) FROM stdin;
    public          postgres    false    244   -�       �          0    31315    pessoa 
   TABLE DATA           �   COPY public.pessoa (id, cpf, dt_nascimento, email, matricula, nivel_escolaridade, nome, senha, funcao_id, instituicao_id) FROM stdin;
    public          postgres    false    246   y�       �          0    31321 	   professor 
   TABLE DATA           W   COPY public.professor (coordenador, coordenadoria_id, id, matricula, nome) FROM stdin;
    public          postgres    false    248   ��       �          0    31327    projeto 
   TABLE DATA           +   COPY public.projeto (id, nome) FROM stdin;
    public          postgres    false    250   N�       �          0    31331 	   tipo_acao 
   TABLE DATA           -   COPY public.tipo_acao (id, nome) FROM stdin;
    public          postgres    false    252   k�       �          0    31335    turma 
   TABLE DATA           )   COPY public.turma (id, nome) FROM stdin;
    public          postgres    false    254   ��       �           0    0    acao_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.acao_id_seq', 1, false);
          public          postgres    false    215            �           0    0    aluno_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.aluno_id_seq', 4, true);
          public          postgres    false    217                        0    0    aula_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.aula_id_seq', 14, true);
          public          postgres    false    221                       0    0    coordenador_turno_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.coordenador_turno_id_seq', 5, true);
          public          postgres    false    223                       0    0    coordenadoria_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.coordenadoria_id_seq', 3, true);
          public          postgres    false    225                       0    0    curso_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.curso_id_seq', 3, true);
          public          postgres    false    227                       0    0    disciplina_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.disciplina_id_seq', 5, true);
          public          postgres    false    229                       0    0    equipamento_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.equipamento_id_seq', 3, true);
          public          postgres    false    231                       0    0    evento_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.evento_id_seq', 6, true);
          public          postgres    false    233                       0    0    funcao_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.funcao_id_seq', 1, false);
          public          postgres    false    235                       0    0    historico_aula_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.historico_aula_id_seq', 18, true);
          public          postgres    false    256            	           0    0    horario_aula_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.horario_aula_id_seq', 96, true);
          public          postgres    false    237            
           0    0    instituicao_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.instituicao_id_seq', 1, false);
          public          postgres    false    239                       0    0    local_equipamento_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.local_equipamento_id_seq', 17, true);
          public          postgres    false    242                       0    0    local_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.local_id_seq', 6, true);
          public          postgres    false    243                       0    0    periodo_academico_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.periodo_academico_id_seq', 1, true);
          public          postgres    false    245                       0    0    pessoa_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.pessoa_id_seq', 1, false);
          public          postgres    false    247                       0    0    professor_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.professor_id_seq', 6, true);
          public          postgres    false    249                       0    0    projeto_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.projeto_id_seq', 1, false);
          public          postgres    false    251                       0    0    tipo_acao_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.tipo_acao_id_seq', 1, false);
          public          postgres    false    253                       0    0    turma_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.turma_id_seq', 1, true);
          public          postgres    false    255            �           2606    31360    acao acao_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.acao
    ADD CONSTRAINT acao_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.acao DROP CONSTRAINT acao_pkey;
       public            postgres    false    214            �           2606    31362    aluno aluno_matricula_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.aluno
    ADD CONSTRAINT aluno_matricula_key UNIQUE (matricula);
 C   ALTER TABLE ONLY public.aluno DROP CONSTRAINT aluno_matricula_key;
       public            postgres    false    216            �           2606    31364    aluno aluno_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.aluno
    ADD CONSTRAINT aluno_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.aluno DROP CONSTRAINT aluno_pkey;
       public            postgres    false    216            �           2606    31366    aula aula_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.aula
    ADD CONSTRAINT aula_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.aula DROP CONSTRAINT aula_pkey;
       public            postgres    false    218            �           2606    31368 (   coordenador_turno coordenador_turno_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.coordenador_turno
    ADD CONSTRAINT coordenador_turno_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.coordenador_turno DROP CONSTRAINT coordenador_turno_pkey;
       public            postgres    false    222            �           2606    31370     coordenadoria coordenadoria_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.coordenadoria
    ADD CONSTRAINT coordenadoria_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.coordenadoria DROP CONSTRAINT coordenadoria_pkey;
       public            postgres    false    224            �           2606    31372    curso curso_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.curso
    ADD CONSTRAINT curso_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.curso DROP CONSTRAINT curso_pkey;
       public            postgres    false    226            �           2606    31374    disciplina disciplina_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.disciplina
    ADD CONSTRAINT disciplina_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.disciplina DROP CONSTRAINT disciplina_pkey;
       public            postgres    false    228            �           2606    31376    equipamento equipamento_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.equipamento
    ADD CONSTRAINT equipamento_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.equipamento DROP CONSTRAINT equipamento_pkey;
       public            postgres    false    230            �           2606    31378    evento evento_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.evento
    ADD CONSTRAINT evento_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.evento DROP CONSTRAINT evento_pkey;
       public            postgres    false    232            �           2606    31380    funcao funcao_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.funcao
    ADD CONSTRAINT funcao_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.funcao DROP CONSTRAINT funcao_pkey;
       public            postgres    false    234                       2606    31515 "   historico_aula historico_aula_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.historico_aula
    ADD CONSTRAINT historico_aula_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.historico_aula DROP CONSTRAINT historico_aula_pkey;
       public            postgres    false    257            �           2606    31382    horario_aula horario_aula_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.horario_aula
    ADD CONSTRAINT horario_aula_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.horario_aula DROP CONSTRAINT horario_aula_pkey;
       public            postgres    false    236                       2606    31384    instituicao instituicao_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.instituicao
    ADD CONSTRAINT instituicao_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.instituicao DROP CONSTRAINT instituicao_pkey;
       public            postgres    false    238                       2606    31386 (   local_equipamento local_equipamento_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.local_equipamento
    ADD CONSTRAINT local_equipamento_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.local_equipamento DROP CONSTRAINT local_equipamento_pkey;
       public            postgres    false    241                       2606    31388    local local_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.local
    ADD CONSTRAINT local_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.local DROP CONSTRAINT local_pkey;
       public            postgres    false    240                       2606    31390 (   periodo_academico periodo_academico_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.periodo_academico
    ADD CONSTRAINT periodo_academico_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.periodo_academico DROP CONSTRAINT periodo_academico_pkey;
       public            postgres    false    244            	           2606    31392    pessoa pessoa_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.pessoa
    ADD CONSTRAINT pessoa_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.pessoa DROP CONSTRAINT pessoa_pkey;
       public            postgres    false    246                       2606    31394    professor professor_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.professor
    ADD CONSTRAINT professor_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.professor DROP CONSTRAINT professor_pkey;
       public            postgres    false    248                       2606    31396    projeto projeto_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.projeto
    ADD CONSTRAINT projeto_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.projeto DROP CONSTRAINT projeto_pkey;
       public            postgres    false    250                       2606    31398    tipo_acao tipo_acao_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.tipo_acao
    ADD CONSTRAINT tipo_acao_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.tipo_acao DROP CONSTRAINT tipo_acao_pkey;
       public            postgres    false    252                       2606    31400    turma turma_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.turma
    ADD CONSTRAINT turma_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.turma DROP CONSTRAINT turma_pkey;
       public            postgres    false    254                       2606    31401     acao fk1s25iusvo60bsc6dbnihttkyo    FK CONSTRAINT     �   ALTER TABLE ONLY public.acao
    ADD CONSTRAINT fk1s25iusvo60bsc6dbnihttkyo FOREIGN KEY (projeto_id) REFERENCES public.projeto(id);
 J   ALTER TABLE ONLY public.acao DROP CONSTRAINT fk1s25iusvo60bsc6dbnihttkyo;
       public          postgres    false    3341    250    214                       2606    31406     aula fk21ymvtyrbs7epotql5wjpkhfm    FK CONSTRAINT     �   ALTER TABLE ONLY public.aula
    ADD CONSTRAINT fk21ymvtyrbs7epotql5wjpkhfm FOREIGN KEY (disciplina_id) REFERENCES public.disciplina(id);
 J   ALTER TABLE ONLY public.aula DROP CONSTRAINT fk21ymvtyrbs7epotql5wjpkhfm;
       public          postgres    false    218    3319    228            $           2606    31411 -   local_equipamento fk84kyjqnf0f0rslaljmh5iyv2x    FK CONSTRAINT     �   ALTER TABLE ONLY public.local_equipamento
    ADD CONSTRAINT fk84kyjqnf0f0rslaljmh5iyv2x FOREIGN KEY (local_id) REFERENCES public.local(id);
 W   ALTER TABLE ONLY public.local_equipamento DROP CONSTRAINT fk84kyjqnf0f0rslaljmh5iyv2x;
       public          postgres    false    241    240    3331                        2606    31416 (   aula_horario fk933inwqwupcodrdtyxl5pa9hj    FK CONSTRAINT     �   ALTER TABLE ONLY public.aula_horario
    ADD CONSTRAINT fk933inwqwupcodrdtyxl5pa9hj FOREIGN KEY (aula_id) REFERENCES public.aula(id);
 R   ALTER TABLE ONLY public.aula_horario DROP CONSTRAINT fk933inwqwupcodrdtyxl5pa9hj;
       public          postgres    false    3311    220    218                       2606    31421     aula fk9dvd4nr6beh0lp2vp3v82xfn4    FK CONSTRAINT     �   ALTER TABLE ONLY public.aula
    ADD CONSTRAINT fk9dvd4nr6beh0lp2vp3v82xfn4 FOREIGN KEY (professor_id) REFERENCES public.professor(id);
 J   ALTER TABLE ONLY public.aula DROP CONSTRAINT fk9dvd4nr6beh0lp2vp3v82xfn4;
       public          postgres    false    248    3339    218                       2606    31426 !   aluno fk9o09o8qj4x9uf9okvf622jyec    FK CONSTRAINT     �   ALTER TABLE ONLY public.aluno
    ADD CONSTRAINT fk9o09o8qj4x9uf9okvf622jyec FOREIGN KEY (curso_id) REFERENCES public.curso(id);
 K   ALTER TABLE ONLY public.aluno DROP CONSTRAINT fk9o09o8qj4x9uf9okvf622jyec;
       public          postgres    false    3317    216    226            !           2606    31431 (   aula_horario fk9rkax0r3yakq17k2xnfbxwtc3    FK CONSTRAINT     �   ALTER TABLE ONLY public.aula_horario
    ADD CONSTRAINT fk9rkax0r3yakq17k2xnfbxwtc3 FOREIGN KEY (horario_id) REFERENCES public.horario_aula(id);
 R   ALTER TABLE ONLY public.aula_horario DROP CONSTRAINT fk9rkax0r3yakq17k2xnfbxwtc3;
       public          postgres    false    236    220    3327                       2606    31436 !   aluno fkehtgr8rih20h4gomh4dd4sbxu    FK CONSTRAINT     �   ALTER TABLE ONLY public.aluno
    ADD CONSTRAINT fkehtgr8rih20h4gomh4dd4sbxu FOREIGN KEY (turma_id) REFERENCES public.turma(id);
 K   ALTER TABLE ONLY public.aluno DROP CONSTRAINT fkehtgr8rih20h4gomh4dd4sbxu;
       public          postgres    false    3345    216    254                       2606    31441     aula fkhi0x3urb19d0o1j9st2cdkp01    FK CONSTRAINT     �   ALTER TABLE ONLY public.aula
    ADD CONSTRAINT fkhi0x3urb19d0o1j9st2cdkp01 FOREIGN KEY (periodo_academico_id) REFERENCES public.periodo_academico(id);
 J   ALTER TABLE ONLY public.aula DROP CONSTRAINT fkhi0x3urb19d0o1j9st2cdkp01;
       public          postgres    false    3335    244    218            %           2606    31446 -   local_equipamento fkjae5bgc8b30ebob6ku94aakc0    FK CONSTRAINT     �   ALTER TABLE ONLY public.local_equipamento
    ADD CONSTRAINT fkjae5bgc8b30ebob6ku94aakc0 FOREIGN KEY (equipamento_id) REFERENCES public.equipamento(id);
 W   ALTER TABLE ONLY public.local_equipamento DROP CONSTRAINT fkjae5bgc8b30ebob6ku94aakc0;
       public          postgres    false    230    3321    241            "           2606    31451 !   curso fkjo0mcmwgirdnfxcwq2y6fy11h    FK CONSTRAINT     �   ALTER TABLE ONLY public.curso
    ADD CONSTRAINT fkjo0mcmwgirdnfxcwq2y6fy11h FOREIGN KEY (coordenadoria_id) REFERENCES public.coordenadoria(id);
 K   ALTER TABLE ONLY public.curso DROP CONSTRAINT fkjo0mcmwgirdnfxcwq2y6fy11h;
       public          postgres    false    3315    226    224                       2606    31456     aula fkjvf4kup1uubq8y4hldrijp2ro    FK CONSTRAINT     �   ALTER TABLE ONLY public.aula
    ADD CONSTRAINT fkjvf4kup1uubq8y4hldrijp2ro FOREIGN KEY (turma_id) REFERENCES public.turma(id);
 J   ALTER TABLE ONLY public.aula DROP CONSTRAINT fkjvf4kup1uubq8y4hldrijp2ro;
       public          postgres    false    218    254    3345            &           2606    31461 "   pessoa fkjynvqf3spd011hxkxbus4hbkq    FK CONSTRAINT     �   ALTER TABLE ONLY public.pessoa
    ADD CONSTRAINT fkjynvqf3spd011hxkxbus4hbkq FOREIGN KEY (funcao_id) REFERENCES public.funcao(id);
 L   ALTER TABLE ONLY public.pessoa DROP CONSTRAINT fkjynvqf3spd011hxkxbus4hbkq;
       public          postgres    false    3325    234    246            #           2606    31466 &   disciplina fkkhdiw1swjoa2ml3md0mt8g4sf    FK CONSTRAINT     �   ALTER TABLE ONLY public.disciplina
    ADD CONSTRAINT fkkhdiw1swjoa2ml3md0mt8g4sf FOREIGN KEY (curso_id) REFERENCES public.curso(id);
 P   ALTER TABLE ONLY public.disciplina DROP CONSTRAINT fkkhdiw1swjoa2ml3md0mt8g4sf;
       public          postgres    false    228    3317    226                       2606    31471     acao fklpdk4fmofe286obfv74q1gw7h    FK CONSTRAINT     �   ALTER TABLE ONLY public.acao
    ADD CONSTRAINT fklpdk4fmofe286obfv74q1gw7h FOREIGN KEY (tipo_acao_id) REFERENCES public.tipo_acao(id);
 J   ALTER TABLE ONLY public.acao DROP CONSTRAINT fklpdk4fmofe286obfv74q1gw7h;
       public          postgres    false    214    252    3343                       2606    31476 &   aula_aluno fkoy8ca3f46mwymko7f3rg3ptgd    FK CONSTRAINT     �   ALTER TABLE ONLY public.aula_aluno
    ADD CONSTRAINT fkoy8ca3f46mwymko7f3rg3ptgd FOREIGN KEY (aluno_id) REFERENCES public.aluno(id);
 P   ALTER TABLE ONLY public.aula_aluno DROP CONSTRAINT fkoy8ca3f46mwymko7f3rg3ptgd;
       public          postgres    false    219    3309    216            '           2606    31481 "   pessoa fkpwf3btd9r309wlalsosfsqdwi    FK CONSTRAINT     �   ALTER TABLE ONLY public.pessoa
    ADD CONSTRAINT fkpwf3btd9r309wlalsosfsqdwi FOREIGN KEY (instituicao_id) REFERENCES public.instituicao(id);
 L   ALTER TABLE ONLY public.pessoa DROP CONSTRAINT fkpwf3btd9r309wlalsosfsqdwi;
       public          postgres    false    246    3329    238            (           2606    31486 %   professor fkqpr2kvkjchf8oj9c20700nm6d    FK CONSTRAINT     �   ALTER TABLE ONLY public.professor
    ADD CONSTRAINT fkqpr2kvkjchf8oj9c20700nm6d FOREIGN KEY (coordenadoria_id) REFERENCES public.coordenadoria(id);
 O   ALTER TABLE ONLY public.professor DROP CONSTRAINT fkqpr2kvkjchf8oj9c20700nm6d;
       public          postgres    false    3315    248    224                       2606    31491     aula fkr4pq5oq3x8i072h0m8pppbspv    FK CONSTRAINT     �   ALTER TABLE ONLY public.aula
    ADD CONSTRAINT fkr4pq5oq3x8i072h0m8pppbspv FOREIGN KEY (local_id) REFERENCES public.local(id);
 J   ALTER TABLE ONLY public.aula DROP CONSTRAINT fkr4pq5oq3x8i072h0m8pppbspv;
       public          postgres    false    240    218    3331                       2606    31496 &   aula_aluno fkrh0oc6gpvc4rdue6afhqwuhy2    FK CONSTRAINT     �   ALTER TABLE ONLY public.aula_aluno
    ADD CONSTRAINT fkrh0oc6gpvc4rdue6afhqwuhy2 FOREIGN KEY (aula_id) REFERENCES public.aula(id);
 P   ALTER TABLE ONLY public.aula_aluno DROP CONSTRAINT fkrh0oc6gpvc4rdue6afhqwuhy2;
       public          postgres    false    219    3311    218                       2606    31501     acao fks5yt0f6c91jyon0vgref764mc    FK CONSTRAINT     �   ALTER TABLE ONLY public.acao
    ADD CONSTRAINT fks5yt0f6c91jyon0vgref764mc FOREIGN KEY (instituicao_id) REFERENCES public.instituicao(id);
 J   ALTER TABLE ONLY public.acao DROP CONSTRAINT fks5yt0f6c91jyon0vgref764mc;
       public          postgres    false    3329    238    214            �      x������ � �      �   �   x�U�1
�@@�z�s���HjEAR-ll&f����I�U��V���=��!P�>�]C��E2��<�j�EV�X�2�&��U5��{^�pd���\P�CZ�R}��e<��q�y�F�P�7/�DUx�C,ͦ�{N+���}���0      �   e   x�33�4� bvu�sq�us�r�23�4��4Jq�k��v$9SNCc��	XgD�P�X�90�1MҐӌ��%���@F�q`��\2F��� �X!�      �   @   x�%��  �frj	C���A�%�)G&�ȅe�ȯ-kI��3��L�<�5\CZ�Ҫt(�	�k�|      �   H   x�ʻ�0��W����^��I&x�������wT�7�v�e�Q��;��;x�'��g��q�s�"��L�      �   /   x�3�t��/JI�KL�/RHIU)-��W0�2�I-.I5����� ��O      �   O   x�3�t��/JI�KL�/�LTHIU��K�/�=��$39��S�1%73/���(���Ë󹌱Q��
TRZRZ������ Cg&�      �   S   x�3�4��,.I�M,VHIU��K�/�M<����|.#N#Nǔ��<��"��1�1�cQaifIjIiQ�B�BhQR"PEn>W� ���      �   �   x�-�M�0���S�&�s ��� ���kh�5ȅq�JoЋY�ݼ|�{���D�>|ؐ�,ܠ���������.�H`��|x,�2�����\Ol1<#�RU��A�t�~qssi岂&O�������^I�2���?iY�ix�iS��2���m|����u�%�
q�!~�OK�      �   4   x�3�t��-(-IL�/�2�t,RH��K�L���
qs�g�� %c���� q%�      �      x������ � �      �      x������ � �      �   �  x���ˎ1E��W�.����h?v �̒�5��Z����+�1*Fv2vf2ҌU�}�^��M�Rwh:�Aʠ]0�p�_��9��l�k�ݮ���M��0M�w�)Λ��`���������n���?�!��M�VH�
8��
�"B �;ҁ��l~�m���qwk���=|��� �T���Mj7��1΀T:�I���ɬ�'�s];��k���b�\Zv��ꞷ##X�g;5����*����W�O��]�f���kxi 
�	���}aU[��(z2�����~]���Ԝ��>�6��E����x�G��2V8T����ѐT����ޖ$�<T�h��U�3��T��H<% ��.����;���dl�=��l�յ��o�s�GZ=(����U�^gj�ԭ�5��,(�-�1�&�L�����qo��~iV�7��,���8��      �   �   x�=���0�A1��HՒ��b�h8؅(��ö���9�C�+|h8,w{B�h��L�d�/���'�	�j���/�W��Н����9�L�L�$�.���;��V�hv87�����כ_��/���<�      �      x������ � �      �   N   x�36�4��IL�/J,9��(3_����Ȃ�M�$h�&h�ed�i�&h�el�i�����`hhb�h���Ѐ+F��� ��%�      �   U   x�5���@߸�(>�H/鿎`V��Ȁ�,�rs$ž9�C`��.��[�x�Q}t�D�x��g)���<l*�-��2���2      �   <   x�3202�4���P��i���������������������� �50      �      x������ � �      �   �   x�-�M
�0��ur�9������R� \�LS1�)z$���E�ݼ�&�,v�����%7��M�Uq���R^�{b@����{�G��C�S96E�c��5��A�f����BJ��b�D�E�dg�ńTUݬ7[vC���É����!	�f����|9�      �      x������ � �      �      x������ � �      �      x�3�30����� `�     