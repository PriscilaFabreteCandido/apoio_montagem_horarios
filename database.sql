PGDMP         #                |            sistema_academico    15.4    15.4 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16474    sistema_academico    DATABASE     �   CREATE DATABASE sistema_academico WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';
 !   DROP DATABASE sistema_academico;
                postgres    false            �            1259    21316    acao    TABLE       CREATE TABLE public.acao (
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
       public         heap    postgres    false            �            1259    21315    acao_id_seq    SEQUENCE     t   CREATE SEQUENCE public.acao_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.acao_id_seq;
       public          postgres    false    243            �           0    0    acao_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.acao_id_seq OWNED BY public.acao.id;
          public          postgres    false    242            �            1259    21126    aluno    TABLE     �   CREATE TABLE public.aluno (
    curso_id bigint,
    id bigint NOT NULL,
    turma_id bigint,
    matricula character varying(255),
    nome character varying(255)
);
    DROP TABLE public.aluno;
       public         heap    postgres    false            �            1259    21125    aluno_id_seq    SEQUENCE     u   CREATE SEQUENCE public.aluno_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.aluno_id_seq;
       public          postgres    false    215            �           0    0    aluno_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.aluno_id_seq OWNED BY public.aluno.id;
          public          postgres    false    214            �            1259    21137    aula    TABLE     �   CREATE TABLE public.aula (
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
       public         heap    postgres    false            �            1259    21143 
   aula_aluno    TABLE     ^   CREATE TABLE public.aula_aluno (
    aluno_id bigint NOT NULL,
    aula_id bigint NOT NULL
);
    DROP TABLE public.aula_aluno;
       public         heap    postgres    false            �            1259    21146    aula_horario    TABLE     b   CREATE TABLE public.aula_horario (
    aula_id bigint NOT NULL,
    horario_id bigint NOT NULL
);
     DROP TABLE public.aula_horario;
       public         heap    postgres    false            �            1259    21136    aula_id_seq    SEQUENCE     t   CREATE SEQUENCE public.aula_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.aula_id_seq;
       public          postgres    false    217            �           0    0    aula_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.aula_id_seq OWNED BY public.aula.id;
          public          postgres    false    216            �            1259    30683    coordenador_turno    TABLE     c   CREATE TABLE public.coordenador_turno (
    id bigint NOT NULL,
    nome character varying(255)
);
 %   DROP TABLE public.coordenador_turno;
       public         heap    postgres    false            �            1259    30682    coordenador_turno_id_seq    SEQUENCE     �   CREATE SEQUENCE public.coordenador_turno_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.coordenador_turno_id_seq;
       public          postgres    false    255            �           0    0    coordenador_turno_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.coordenador_turno_id_seq OWNED BY public.coordenador_turno.id;
          public          postgres    false    254            �            1259    21150    coordenadoria    TABLE     d   CREATE TABLE public.coordenadoria (
    id bigint NOT NULL,
    descricao character varying(255)
);
 !   DROP TABLE public.coordenadoria;
       public         heap    postgres    false            �            1259    21149    coordenadoria_id_seq    SEQUENCE     }   CREATE SEQUENCE public.coordenadoria_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.coordenadoria_id_seq;
       public          postgres    false    221            �           0    0    coordenadoria_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.coordenadoria_id_seq OWNED BY public.coordenadoria.id;
          public          postgres    false    220            �            1259    21157    curso    TABLE     t   CREATE TABLE public.curso (
    coordenadoria_id bigint,
    id bigint NOT NULL,
    nome character varying(255)
);
    DROP TABLE public.curso;
       public         heap    postgres    false            �            1259    21156    curso_id_seq    SEQUENCE     u   CREATE SEQUENCE public.curso_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.curso_id_seq;
       public          postgres    false    223            �           0    0    curso_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.curso_id_seq OWNED BY public.curso.id;
          public          postgres    false    222            �            1259    21164 
   disciplina    TABLE     �   CREATE TABLE public.disciplina (
    curso_id bigint,
    id bigint NOT NULL,
    nome character varying(255),
    sigla character varying(255)
);
    DROP TABLE public.disciplina;
       public         heap    postgres    false            �            1259    21163    disciplina_id_seq    SEQUENCE     z   CREATE SEQUENCE public.disciplina_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.disciplina_id_seq;
       public          postgres    false    225            �           0    0    disciplina_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.disciplina_id_seq OWNED BY public.disciplina.id;
          public          postgres    false    224            �            1259    21173    equipamento    TABLE     b   CREATE TABLE public.equipamento (
    id bigint NOT NULL,
    descricao character varying(255)
);
    DROP TABLE public.equipamento;
       public         heap    postgres    false            �            1259    21172    equipamento_id_seq    SEQUENCE     {   CREATE SEQUENCE public.equipamento_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.equipamento_id_seq;
       public          postgres    false    227            �           0    0    equipamento_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.equipamento_id_seq OWNED BY public.equipamento.id;
          public          postgres    false    226            �            1259    21180    evento    TABLE     �   CREATE TABLE public.evento (
    data date,
    hora_fim time(6) without time zone,
    hora_inicio time(6) without time zone,
    id bigint NOT NULL,
    descricao character varying(255)
);
    DROP TABLE public.evento;
       public         heap    postgres    false            �            1259    21179    evento_id_seq    SEQUENCE     v   CREATE SEQUENCE public.evento_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.evento_id_seq;
       public          postgres    false    229            �           0    0    evento_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.evento_id_seq OWNED BY public.evento.id;
          public          postgres    false    228            �            1259    21325    funcao    TABLE     X   CREATE TABLE public.funcao (
    id bigint NOT NULL,
    nome character varying(255)
);
    DROP TABLE public.funcao;
       public         heap    postgres    false            �            1259    21324    funcao_id_seq    SEQUENCE     v   CREATE SEQUENCE public.funcao_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.funcao_id_seq;
       public          postgres    false    245            �           0    0    funcao_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.funcao_id_seq OWNED BY public.funcao.id;
          public          postgres    false    244            �            1259    21187    horario_aula    TABLE     �   CREATE TABLE public.horario_aula (
    hora_fim time(6) without time zone,
    hora_inicio time(6) without time zone,
    id bigint NOT NULL
);
     DROP TABLE public.horario_aula;
       public         heap    postgres    false            �            1259    21186    horario_aula_id_seq    SEQUENCE     |   CREATE SEQUENCE public.horario_aula_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.horario_aula_id_seq;
       public          postgres    false    231            �           0    0    horario_aula_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.horario_aula_id_seq OWNED BY public.horario_aula.id;
          public          postgres    false    230            �            1259    21332    instituicao    TABLE     
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
       public         heap    postgres    false            �            1259    21331    instituicao_id_seq    SEQUENCE     {   CREATE SEQUENCE public.instituicao_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.instituicao_id_seq;
       public          postgres    false    247            �           0    0    instituicao_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.instituicao_id_seq OWNED BY public.instituicao.id;
          public          postgres    false    246            �            1259    21194    local    TABLE     t   CREATE TABLE public.local (
    capacidade integer,
    id bigint NOT NULL,
    descricao character varying(255)
);
    DROP TABLE public.local;
       public         heap    postgres    false            �            1259    21201    local_equipamento    TABLE     �   CREATE TABLE public.local_equipamento (
    quantidade integer,
    equipamento_id bigint,
    id bigint NOT NULL,
    local_id bigint
);
 %   DROP TABLE public.local_equipamento;
       public         heap    postgres    false            �            1259    21200    local_equipamento_id_seq    SEQUENCE     �   CREATE SEQUENCE public.local_equipamento_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.local_equipamento_id_seq;
       public          postgres    false    235            �           0    0    local_equipamento_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.local_equipamento_id_seq OWNED BY public.local_equipamento.id;
          public          postgres    false    234            �            1259    21193    local_id_seq    SEQUENCE     u   CREATE SEQUENCE public.local_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.local_id_seq;
       public          postgres    false    233            �           0    0    local_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.local_id_seq OWNED BY public.local.id;
          public          postgres    false    232            �            1259    21208    periodo_academico    TABLE     .  CREATE TABLE public.periodo_academico (
    ano integer,
    data_fim date,
    data_inicio date,
    id bigint NOT NULL,
    formato character varying(255),
    periodo character varying(255),
    CONSTRAINT periodo_academico_formato_check CHECK (((formato)::text = ANY ((ARRAY['SEMESTRAL'::character varying, 'ANUAL'::character varying])::text[]))),
    CONSTRAINT periodo_academico_periodo_check CHECK (((periodo)::text = ANY ((ARRAY['PRIMEIRO_PERIODO'::character varying, 'SEGUNDO_PERIODO'::character varying, 'NENHUM'::character varying])::text[])))
);
 %   DROP TABLE public.periodo_academico;
       public         heap    postgres    false            �            1259    21207    periodo_academico_id_seq    SEQUENCE     �   CREATE SEQUENCE public.periodo_academico_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.periodo_academico_id_seq;
       public          postgres    false    237            �           0    0    periodo_academico_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.periodo_academico_id_seq OWNED BY public.periodo_academico.id;
          public          postgres    false    236            �            1259    21341    pessoa    TABLE     Z  CREATE TABLE public.pessoa (
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
       public         heap    postgres    false            �            1259    21340    pessoa_id_seq    SEQUENCE     v   CREATE SEQUENCE public.pessoa_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.pessoa_id_seq;
       public          postgres    false    249            �           0    0    pessoa_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.pessoa_id_seq OWNED BY public.pessoa.id;
          public          postgres    false    248            �            1259    21219 	   professor    TABLE     �   CREATE TABLE public.professor (
    coordenador boolean,
    coordenadoria_id bigint,
    id bigint NOT NULL,
    matricula character varying(255),
    nome character varying(255)
);
    DROP TABLE public.professor;
       public         heap    postgres    false            �            1259    21218    professor_id_seq    SEQUENCE     y   CREATE SEQUENCE public.professor_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.professor_id_seq;
       public          postgres    false    239            �           0    0    professor_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.professor_id_seq OWNED BY public.professor.id;
          public          postgres    false    238            �            1259    21350    projeto    TABLE     Y   CREATE TABLE public.projeto (
    id bigint NOT NULL,
    nome character varying(255)
);
    DROP TABLE public.projeto;
       public         heap    postgres    false            �            1259    21349    projeto_id_seq    SEQUENCE     w   CREATE SEQUENCE public.projeto_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.projeto_id_seq;
       public          postgres    false    251            �           0    0    projeto_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.projeto_id_seq OWNED BY public.projeto.id;
          public          postgres    false    250            �            1259    21357 	   tipo_acao    TABLE     [   CREATE TABLE public.tipo_acao (
    id bigint NOT NULL,
    nome character varying(255)
);
    DROP TABLE public.tipo_acao;
       public         heap    postgres    false            �            1259    21356    tipo_acao_id_seq    SEQUENCE     y   CREATE SEQUENCE public.tipo_acao_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.tipo_acao_id_seq;
       public          postgres    false    253            �           0    0    tipo_acao_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.tipo_acao_id_seq OWNED BY public.tipo_acao.id;
          public          postgres    false    252            �            1259    21228    turma    TABLE     W   CREATE TABLE public.turma (
    id bigint NOT NULL,
    nome character varying(255)
);
    DROP TABLE public.turma;
       public         heap    postgres    false            �            1259    21227    turma_id_seq    SEQUENCE     u   CREATE SEQUENCE public.turma_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.turma_id_seq;
       public          postgres    false    241            �           0    0    turma_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.turma_id_seq OWNED BY public.turma.id;
          public          postgres    false    240            �           2604    22436    acao id    DEFAULT     b   ALTER TABLE ONLY public.acao ALTER COLUMN id SET DEFAULT nextval('public.acao_id_seq'::regclass);
 6   ALTER TABLE public.acao ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    242    243    243            �           2604    22437    aluno id    DEFAULT     d   ALTER TABLE ONLY public.aluno ALTER COLUMN id SET DEFAULT nextval('public.aluno_id_seq'::regclass);
 7   ALTER TABLE public.aluno ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215            �           2604    22438    aula id    DEFAULT     b   ALTER TABLE ONLY public.aula ALTER COLUMN id SET DEFAULT nextval('public.aula_id_seq'::regclass);
 6   ALTER TABLE public.aula ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            �           2604    30686    coordenador_turno id    DEFAULT     |   ALTER TABLE ONLY public.coordenador_turno ALTER COLUMN id SET DEFAULT nextval('public.coordenador_turno_id_seq'::regclass);
 C   ALTER TABLE public.coordenador_turno ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    255    254    255            �           2604    22439    coordenadoria id    DEFAULT     t   ALTER TABLE ONLY public.coordenadoria ALTER COLUMN id SET DEFAULT nextval('public.coordenadoria_id_seq'::regclass);
 ?   ALTER TABLE public.coordenadoria ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    221    221            �           2604    22440    curso id    DEFAULT     d   ALTER TABLE ONLY public.curso ALTER COLUMN id SET DEFAULT nextval('public.curso_id_seq'::regclass);
 7   ALTER TABLE public.curso ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    223    223            �           2604    22441    disciplina id    DEFAULT     n   ALTER TABLE ONLY public.disciplina ALTER COLUMN id SET DEFAULT nextval('public.disciplina_id_seq'::regclass);
 <   ALTER TABLE public.disciplina ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    225    225            �           2604    22442    equipamento id    DEFAULT     p   ALTER TABLE ONLY public.equipamento ALTER COLUMN id SET DEFAULT nextval('public.equipamento_id_seq'::regclass);
 =   ALTER TABLE public.equipamento ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    227    227            �           2604    22443 	   evento id    DEFAULT     f   ALTER TABLE ONLY public.evento ALTER COLUMN id SET DEFAULT nextval('public.evento_id_seq'::regclass);
 8   ALTER TABLE public.evento ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    229    228    229            �           2604    22444 	   funcao id    DEFAULT     f   ALTER TABLE ONLY public.funcao ALTER COLUMN id SET DEFAULT nextval('public.funcao_id_seq'::regclass);
 8   ALTER TABLE public.funcao ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    244    245    245            �           2604    22445    horario_aula id    DEFAULT     r   ALTER TABLE ONLY public.horario_aula ALTER COLUMN id SET DEFAULT nextval('public.horario_aula_id_seq'::regclass);
 >   ALTER TABLE public.horario_aula ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    231    231            �           2604    22446    instituicao id    DEFAULT     p   ALTER TABLE ONLY public.instituicao ALTER COLUMN id SET DEFAULT nextval('public.instituicao_id_seq'::regclass);
 =   ALTER TABLE public.instituicao ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    247    246    247            �           2604    22447    local id    DEFAULT     d   ALTER TABLE ONLY public.local ALTER COLUMN id SET DEFAULT nextval('public.local_id_seq'::regclass);
 7   ALTER TABLE public.local ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    232    233    233            �           2604    22448    local_equipamento id    DEFAULT     |   ALTER TABLE ONLY public.local_equipamento ALTER COLUMN id SET DEFAULT nextval('public.local_equipamento_id_seq'::regclass);
 C   ALTER TABLE public.local_equipamento ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    235    234    235            �           2604    22449    periodo_academico id    DEFAULT     |   ALTER TABLE ONLY public.periodo_academico ALTER COLUMN id SET DEFAULT nextval('public.periodo_academico_id_seq'::regclass);
 C   ALTER TABLE public.periodo_academico ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    236    237    237            �           2604    22450 	   pessoa id    DEFAULT     f   ALTER TABLE ONLY public.pessoa ALTER COLUMN id SET DEFAULT nextval('public.pessoa_id_seq'::regclass);
 8   ALTER TABLE public.pessoa ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    249    248    249            �           2604    22451    professor id    DEFAULT     l   ALTER TABLE ONLY public.professor ALTER COLUMN id SET DEFAULT nextval('public.professor_id_seq'::regclass);
 ;   ALTER TABLE public.professor ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    238    239    239            �           2604    22452 
   projeto id    DEFAULT     h   ALTER TABLE ONLY public.projeto ALTER COLUMN id SET DEFAULT nextval('public.projeto_id_seq'::regclass);
 9   ALTER TABLE public.projeto ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    251    250    251            �           2604    22453    tipo_acao id    DEFAULT     l   ALTER TABLE ONLY public.tipo_acao ALTER COLUMN id SET DEFAULT nextval('public.tipo_acao_id_seq'::regclass);
 ;   ALTER TABLE public.tipo_acao ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    253    252    253            �           2604    22454    turma id    DEFAULT     d   ALTER TABLE ONLY public.turma ALTER COLUMN id SET DEFAULT nextval('public.turma_id_seq'::regclass);
 7   ALTER TABLE public.turma ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    241    240    241            �          0    21316    acao 
   TABLE DATA           �   COPY public.acao (id, local_realizacao, nome, qtd_participantes, qtd_vagas, instituicao_id, projeto_id, tipo_acao_id) FROM stdin;
    public          postgres    false    243   >�       �          0    21126    aluno 
   TABLE DATA           H   COPY public.aluno (curso_id, id, turma_id, matricula, nome) FROM stdin;
    public          postgres    false    215   [�       �          0    21137    aula 
   TABLE DATA           �   COPY public.aula (numero_aulas, disciplina_id, id, local_id, periodo_academico_id, professor_id, turma_id, dia_semana) FROM stdin;
    public          postgres    false    217   �       �          0    21143 
   aula_aluno 
   TABLE DATA           7   COPY public.aula_aluno (aluno_id, aula_id) FROM stdin;
    public          postgres    false    218   w�       �          0    21146    aula_horario 
   TABLE DATA           ;   COPY public.aula_horario (aula_id, horario_id) FROM stdin;
    public          postgres    false    219   ��       �          0    30683    coordenador_turno 
   TABLE DATA           5   COPY public.coordenador_turno (id, nome) FROM stdin;
    public          postgres    false    255   $�       �          0    21150    coordenadoria 
   TABLE DATA           6   COPY public.coordenadoria (id, descricao) FROM stdin;
    public          postgres    false    221   c�       �          0    21157    curso 
   TABLE DATA           ;   COPY public.curso (coordenadoria_id, id, nome) FROM stdin;
    public          postgres    false    223   ��       �          0    21164 
   disciplina 
   TABLE DATA           ?   COPY public.disciplina (curso_id, id, nome, sigla) FROM stdin;
    public          postgres    false    225   %�       �          0    21173    equipamento 
   TABLE DATA           4   COPY public.equipamento (id, descricao) FROM stdin;
    public          postgres    false    227   ��       �          0    21180    evento 
   TABLE DATA           L   COPY public.evento (data, hora_fim, hora_inicio, id, descricao) FROM stdin;
    public          postgres    false    229   (�       �          0    21325    funcao 
   TABLE DATA           *   COPY public.funcao (id, nome) FROM stdin;
    public          postgres    false    245   E�       �          0    21187    horario_aula 
   TABLE DATA           A   COPY public.horario_aula (hora_fim, hora_inicio, id) FROM stdin;
    public          postgres    false    231   b�       �          0    21332    instituicao 
   TABLE DATA           U   COPY public.instituicao (id, avenida, cep, descricao, nome, numero, rua) FROM stdin;
    public          postgres    false    247   ��       �          0    21194    local 
   TABLE DATA           :   COPY public.local (capacidade, id, descricao) FROM stdin;
    public          postgres    false    233   �       �          0    21201    local_equipamento 
   TABLE DATA           U   COPY public.local_equipamento (quantidade, equipamento_id, id, local_id) FROM stdin;
    public          postgres    false    235   r�       �          0    21208    periodo_academico 
   TABLE DATA           ]   COPY public.periodo_academico (ano, data_fim, data_inicio, id, formato, periodo) FROM stdin;
    public          postgres    false    237   ��       �          0    21341    pessoa 
   TABLE DATA           �   COPY public.pessoa (id, cpf, dt_nascimento, email, matricula, nivel_escolaridade, nome, senha, funcao_id, instituicao_id) FROM stdin;
    public          postgres    false    249   #�       �          0    21219 	   professor 
   TABLE DATA           W   COPY public.professor (coordenador, coordenadoria_id, id, matricula, nome) FROM stdin;
    public          postgres    false    239   @�       �          0    21350    projeto 
   TABLE DATA           +   COPY public.projeto (id, nome) FROM stdin;
    public          postgres    false    251   ��       �          0    21357 	   tipo_acao 
   TABLE DATA           -   COPY public.tipo_acao (id, nome) FROM stdin;
    public          postgres    false    253   �       �          0    21228    turma 
   TABLE DATA           )   COPY public.turma (id, nome) FROM stdin;
    public          postgres    false    241   "�       �           0    0    acao_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.acao_id_seq', 1, false);
          public          postgres    false    242            �           0    0    aluno_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.aluno_id_seq', 4, true);
          public          postgres    false    214            �           0    0    aula_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.aula_id_seq', 13, true);
          public          postgres    false    216            �           0    0    coordenador_turno_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.coordenador_turno_id_seq', 5, true);
          public          postgres    false    254            �           0    0    coordenadoria_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.coordenadoria_id_seq', 3, true);
          public          postgres    false    220            �           0    0    curso_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.curso_id_seq', 3, true);
          public          postgres    false    222            �           0    0    disciplina_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.disciplina_id_seq', 5, true);
          public          postgres    false    224            �           0    0    equipamento_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.equipamento_id_seq', 3, true);
          public          postgres    false    226            �           0    0    evento_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.evento_id_seq', 1, false);
          public          postgres    false    228            �           0    0    funcao_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.funcao_id_seq', 1, false);
          public          postgres    false    244            �           0    0    horario_aula_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.horario_aula_id_seq', 96, true);
          public          postgres    false    230            �           0    0    instituicao_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.instituicao_id_seq', 1, false);
          public          postgres    false    246            �           0    0    local_equipamento_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.local_equipamento_id_seq', 17, true);
          public          postgres    false    234                        0    0    local_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.local_id_seq', 6, true);
          public          postgres    false    232                       0    0    periodo_academico_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.periodo_academico_id_seq', 1, true);
          public          postgres    false    236                       0    0    pessoa_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.pessoa_id_seq', 1, false);
          public          postgres    false    248                       0    0    professor_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.professor_id_seq', 6, true);
          public          postgres    false    238                       0    0    projeto_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.projeto_id_seq', 1, false);
          public          postgres    false    250                       0    0    tipo_acao_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.tipo_acao_id_seq', 1, false);
          public          postgres    false    252                       0    0    turma_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.turma_id_seq', 1, true);
          public          postgres    false    240            �           2606    21323    acao acao_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.acao
    ADD CONSTRAINT acao_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.acao DROP CONSTRAINT acao_pkey;
       public            postgres    false    243            �           2606    21135    aluno aluno_matricula_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.aluno
    ADD CONSTRAINT aluno_matricula_key UNIQUE (matricula);
 C   ALTER TABLE ONLY public.aluno DROP CONSTRAINT aluno_matricula_key;
       public            postgres    false    215            �           2606    21133    aluno aluno_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.aluno
    ADD CONSTRAINT aluno_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.aluno DROP CONSTRAINT aluno_pkey;
       public            postgres    false    215            �           2606    21142    aula aula_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.aula
    ADD CONSTRAINT aula_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.aula DROP CONSTRAINT aula_pkey;
       public            postgres    false    217                       2606    30688 (   coordenador_turno coordenador_turno_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.coordenador_turno
    ADD CONSTRAINT coordenador_turno_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.coordenador_turno DROP CONSTRAINT coordenador_turno_pkey;
       public            postgres    false    255            �           2606    21155     coordenadoria coordenadoria_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.coordenadoria
    ADD CONSTRAINT coordenadoria_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.coordenadoria DROP CONSTRAINT coordenadoria_pkey;
       public            postgres    false    221            �           2606    21162    curso curso_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.curso
    ADD CONSTRAINT curso_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.curso DROP CONSTRAINT curso_pkey;
       public            postgres    false    223            �           2606    21171    disciplina disciplina_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.disciplina
    ADD CONSTRAINT disciplina_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.disciplina DROP CONSTRAINT disciplina_pkey;
       public            postgres    false    225            �           2606    21178    equipamento equipamento_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.equipamento
    ADD CONSTRAINT equipamento_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.equipamento DROP CONSTRAINT equipamento_pkey;
       public            postgres    false    227            �           2606    21185    evento evento_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.evento
    ADD CONSTRAINT evento_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.evento DROP CONSTRAINT evento_pkey;
       public            postgres    false    229                       2606    21330    funcao funcao_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.funcao
    ADD CONSTRAINT funcao_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.funcao DROP CONSTRAINT funcao_pkey;
       public            postgres    false    245            �           2606    21192    horario_aula horario_aula_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.horario_aula
    ADD CONSTRAINT horario_aula_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.horario_aula DROP CONSTRAINT horario_aula_pkey;
       public            postgres    false    231                       2606    21339    instituicao instituicao_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.instituicao
    ADD CONSTRAINT instituicao_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.instituicao DROP CONSTRAINT instituicao_pkey;
       public            postgres    false    247            �           2606    21206 (   local_equipamento local_equipamento_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.local_equipamento
    ADD CONSTRAINT local_equipamento_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.local_equipamento DROP CONSTRAINT local_equipamento_pkey;
       public            postgres    false    235            �           2606    21199    local local_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.local
    ADD CONSTRAINT local_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.local DROP CONSTRAINT local_pkey;
       public            postgres    false    233            �           2606    21217 (   periodo_academico periodo_academico_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.periodo_academico
    ADD CONSTRAINT periodo_academico_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.periodo_academico DROP CONSTRAINT periodo_academico_pkey;
       public            postgres    false    237                       2606    21348    pessoa pessoa_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.pessoa
    ADD CONSTRAINT pessoa_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.pessoa DROP CONSTRAINT pessoa_pkey;
       public            postgres    false    249            �           2606    21226    professor professor_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.professor
    ADD CONSTRAINT professor_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.professor DROP CONSTRAINT professor_pkey;
       public            postgres    false    239                       2606    21355    projeto projeto_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.projeto
    ADD CONSTRAINT projeto_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.projeto DROP CONSTRAINT projeto_pkey;
       public            postgres    false    251            	           2606    21362    tipo_acao tipo_acao_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.tipo_acao
    ADD CONSTRAINT tipo_acao_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.tipo_acao DROP CONSTRAINT tipo_acao_pkey;
       public            postgres    false    253            �           2606    21233    turma turma_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.turma
    ADD CONSTRAINT turma_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.turma DROP CONSTRAINT turma_pkey;
       public            postgres    false    241                       2606    21368     acao fk1s25iusvo60bsc6dbnihttkyo    FK CONSTRAINT     �   ALTER TABLE ONLY public.acao
    ADD CONSTRAINT fk1s25iusvo60bsc6dbnihttkyo FOREIGN KEY (projeto_id) REFERENCES public.projeto(id);
 J   ALTER TABLE ONLY public.acao DROP CONSTRAINT fk1s25iusvo60bsc6dbnihttkyo;
       public          postgres    false    251    243    3335                       2606    21244     aula fk21ymvtyrbs7epotql5wjpkhfm    FK CONSTRAINT     �   ALTER TABLE ONLY public.aula
    ADD CONSTRAINT fk21ymvtyrbs7epotql5wjpkhfm FOREIGN KEY (disciplina_id) REFERENCES public.disciplina(id);
 J   ALTER TABLE ONLY public.aula DROP CONSTRAINT fk21ymvtyrbs7epotql5wjpkhfm;
       public          postgres    false    3309    225    217                       2606    21304 -   local_equipamento fk84kyjqnf0f0rslaljmh5iyv2x    FK CONSTRAINT     �   ALTER TABLE ONLY public.local_equipamento
    ADD CONSTRAINT fk84kyjqnf0f0rslaljmh5iyv2x FOREIGN KEY (local_id) REFERENCES public.local(id);
 W   ALTER TABLE ONLY public.local_equipamento DROP CONSTRAINT fk84kyjqnf0f0rslaljmh5iyv2x;
       public          postgres    false    233    235    3317                       2606    21284 (   aula_horario fk933inwqwupcodrdtyxl5pa9hj    FK CONSTRAINT     �   ALTER TABLE ONLY public.aula_horario
    ADD CONSTRAINT fk933inwqwupcodrdtyxl5pa9hj FOREIGN KEY (aula_id) REFERENCES public.aula(id);
 R   ALTER TABLE ONLY public.aula_horario DROP CONSTRAINT fk933inwqwupcodrdtyxl5pa9hj;
       public          postgres    false    217    3303    219                       2606    21259     aula fk9dvd4nr6beh0lp2vp3v82xfn4    FK CONSTRAINT     �   ALTER TABLE ONLY public.aula
    ADD CONSTRAINT fk9dvd4nr6beh0lp2vp3v82xfn4 FOREIGN KEY (professor_id) REFERENCES public.professor(id);
 J   ALTER TABLE ONLY public.aula DROP CONSTRAINT fk9dvd4nr6beh0lp2vp3v82xfn4;
       public          postgres    false    239    3323    217                       2606    21234 !   aluno fk9o09o8qj4x9uf9okvf622jyec    FK CONSTRAINT     �   ALTER TABLE ONLY public.aluno
    ADD CONSTRAINT fk9o09o8qj4x9uf9okvf622jyec FOREIGN KEY (curso_id) REFERENCES public.curso(id);
 K   ALTER TABLE ONLY public.aluno DROP CONSTRAINT fk9o09o8qj4x9uf9okvf622jyec;
       public          postgres    false    223    215    3307                       2606    21279 (   aula_horario fk9rkax0r3yakq17k2xnfbxwtc3    FK CONSTRAINT     �   ALTER TABLE ONLY public.aula_horario
    ADD CONSTRAINT fk9rkax0r3yakq17k2xnfbxwtc3 FOREIGN KEY (horario_id) REFERENCES public.horario_aula(id);
 R   ALTER TABLE ONLY public.aula_horario DROP CONSTRAINT fk9rkax0r3yakq17k2xnfbxwtc3;
       public          postgres    false    231    219    3315                       2606    21239 !   aluno fkehtgr8rih20h4gomh4dd4sbxu    FK CONSTRAINT     �   ALTER TABLE ONLY public.aluno
    ADD CONSTRAINT fkehtgr8rih20h4gomh4dd4sbxu FOREIGN KEY (turma_id) REFERENCES public.turma(id);
 K   ALTER TABLE ONLY public.aluno DROP CONSTRAINT fkehtgr8rih20h4gomh4dd4sbxu;
       public          postgres    false    3325    241    215                       2606    21254     aula fkhi0x3urb19d0o1j9st2cdkp01    FK CONSTRAINT     �   ALTER TABLE ONLY public.aula
    ADD CONSTRAINT fkhi0x3urb19d0o1j9st2cdkp01 FOREIGN KEY (periodo_academico_id) REFERENCES public.periodo_academico(id);
 J   ALTER TABLE ONLY public.aula DROP CONSTRAINT fkhi0x3urb19d0o1j9st2cdkp01;
       public          postgres    false    3321    217    237                       2606    21299 -   local_equipamento fkjae5bgc8b30ebob6ku94aakc0    FK CONSTRAINT     �   ALTER TABLE ONLY public.local_equipamento
    ADD CONSTRAINT fkjae5bgc8b30ebob6ku94aakc0 FOREIGN KEY (equipamento_id) REFERENCES public.equipamento(id);
 W   ALTER TABLE ONLY public.local_equipamento DROP CONSTRAINT fkjae5bgc8b30ebob6ku94aakc0;
       public          postgres    false    235    227    3311                       2606    21289 !   curso fkjo0mcmwgirdnfxcwq2y6fy11h    FK CONSTRAINT     �   ALTER TABLE ONLY public.curso
    ADD CONSTRAINT fkjo0mcmwgirdnfxcwq2y6fy11h FOREIGN KEY (coordenadoria_id) REFERENCES public.coordenadoria(id);
 K   ALTER TABLE ONLY public.curso DROP CONSTRAINT fkjo0mcmwgirdnfxcwq2y6fy11h;
       public          postgres    false    223    221    3305                       2606    21264     aula fkjvf4kup1uubq8y4hldrijp2ro    FK CONSTRAINT     �   ALTER TABLE ONLY public.aula
    ADD CONSTRAINT fkjvf4kup1uubq8y4hldrijp2ro FOREIGN KEY (turma_id) REFERENCES public.turma(id);
 J   ALTER TABLE ONLY public.aula DROP CONSTRAINT fkjvf4kup1uubq8y4hldrijp2ro;
       public          postgres    false    3325    217    241                       2606    21378 "   pessoa fkjynvqf3spd011hxkxbus4hbkq    FK CONSTRAINT     �   ALTER TABLE ONLY public.pessoa
    ADD CONSTRAINT fkjynvqf3spd011hxkxbus4hbkq FOREIGN KEY (funcao_id) REFERENCES public.funcao(id);
 L   ALTER TABLE ONLY public.pessoa DROP CONSTRAINT fkjynvqf3spd011hxkxbus4hbkq;
       public          postgres    false    249    245    3329                       2606    21294 &   disciplina fkkhdiw1swjoa2ml3md0mt8g4sf    FK CONSTRAINT     �   ALTER TABLE ONLY public.disciplina
    ADD CONSTRAINT fkkhdiw1swjoa2ml3md0mt8g4sf FOREIGN KEY (curso_id) REFERENCES public.curso(id);
 P   ALTER TABLE ONLY public.disciplina DROP CONSTRAINT fkkhdiw1swjoa2ml3md0mt8g4sf;
       public          postgres    false    225    223    3307                       2606    21373     acao fklpdk4fmofe286obfv74q1gw7h    FK CONSTRAINT     �   ALTER TABLE ONLY public.acao
    ADD CONSTRAINT fklpdk4fmofe286obfv74q1gw7h FOREIGN KEY (tipo_acao_id) REFERENCES public.tipo_acao(id);
 J   ALTER TABLE ONLY public.acao DROP CONSTRAINT fklpdk4fmofe286obfv74q1gw7h;
       public          postgres    false    3337    253    243                       2606    21269 &   aula_aluno fkoy8ca3f46mwymko7f3rg3ptgd    FK CONSTRAINT     �   ALTER TABLE ONLY public.aula_aluno
    ADD CONSTRAINT fkoy8ca3f46mwymko7f3rg3ptgd FOREIGN KEY (aluno_id) REFERENCES public.aluno(id);
 P   ALTER TABLE ONLY public.aula_aluno DROP CONSTRAINT fkoy8ca3f46mwymko7f3rg3ptgd;
       public          postgres    false    215    218    3301                        2606    21383 "   pessoa fkpwf3btd9r309wlalsosfsqdwi    FK CONSTRAINT     �   ALTER TABLE ONLY public.pessoa
    ADD CONSTRAINT fkpwf3btd9r309wlalsosfsqdwi FOREIGN KEY (instituicao_id) REFERENCES public.instituicao(id);
 L   ALTER TABLE ONLY public.pessoa DROP CONSTRAINT fkpwf3btd9r309wlalsosfsqdwi;
       public          postgres    false    3331    247    249                       2606    21309 %   professor fkqpr2kvkjchf8oj9c20700nm6d    FK CONSTRAINT     �   ALTER TABLE ONLY public.professor
    ADD CONSTRAINT fkqpr2kvkjchf8oj9c20700nm6d FOREIGN KEY (coordenadoria_id) REFERENCES public.coordenadoria(id);
 O   ALTER TABLE ONLY public.professor DROP CONSTRAINT fkqpr2kvkjchf8oj9c20700nm6d;
       public          postgres    false    239    221    3305                       2606    21249     aula fkr4pq5oq3x8i072h0m8pppbspv    FK CONSTRAINT     �   ALTER TABLE ONLY public.aula
    ADD CONSTRAINT fkr4pq5oq3x8i072h0m8pppbspv FOREIGN KEY (local_id) REFERENCES public.local(id);
 J   ALTER TABLE ONLY public.aula DROP CONSTRAINT fkr4pq5oq3x8i072h0m8pppbspv;
       public          postgres    false    217    3317    233                       2606    21274 &   aula_aluno fkrh0oc6gpvc4rdue6afhqwuhy2    FK CONSTRAINT     �   ALTER TABLE ONLY public.aula_aluno
    ADD CONSTRAINT fkrh0oc6gpvc4rdue6afhqwuhy2 FOREIGN KEY (aula_id) REFERENCES public.aula(id);
 P   ALTER TABLE ONLY public.aula_aluno DROP CONSTRAINT fkrh0oc6gpvc4rdue6afhqwuhy2;
       public          postgres    false    217    218    3303                       2606    21363     acao fks5yt0f6c91jyon0vgref764mc    FK CONSTRAINT     �   ALTER TABLE ONLY public.acao
    ADD CONSTRAINT fks5yt0f6c91jyon0vgref764mc FOREIGN KEY (instituicao_id) REFERENCES public.instituicao(id);
 J   ALTER TABLE ONLY public.acao DROP CONSTRAINT fks5yt0f6c91jyon0vgref764mc;
       public          postgres    false    3331    243    247            �      x������ � �      �   �   x�U�1
�@@�z�s���HjEAR-ll&f����I�U��V���=��!P�>�]C��E2��<�j�EV�X�2�&��U5��{^�pd���\P�CZ�R}��e<��q�y�F�P�7/�DUx�C,ͦ�{N+���}���0      �   e   x�33�4� bvu�sq�us�r�23�4��4Jq�k��v$9SNCc��	XgD�P�X�90�1MҐӌ��%���@F�q`��\2F��� �X!�      �   B   x����@�RLF�{h/鿎�y����Q�ut@�7�b�#n���:[�M��7?�7IS�#�fa|      �   K   x�-��	�0C�s4L���Ļd�9�^>�2Gy;��Ȳ���%ߣK�2���l������O�i{���� � �l�      �   /   x�3�t��/JI�KL�/RHIU)-��W0�2�I-.I5����� ��O      �   O   x�3�t��/JI�KL�/�LTHIU��K�/�=��$39��S�1%73/���(���Ë󹌱Q��
TRZRZ������ Cg&�      �   S   x�3�4��,.I�M,VHIU��K�/�M<����|.#N#Nǔ��<��"��1�1�cQaifIjIiQ�B�BhQR"PEn>W� ���      �   �   x�-�M�0���S�&�s ��� ���kh�5ȅq�JoЋY�ݼ|�{���D�>|ؐ�,ܠ���������.�H`��|x,�2�����\Ol1<#�RU��A�t�~qssi岂&O�������^I�2���?iY�ix�iS��2���m|����u�%�
q�!~�OK�      �   4   x�3�t��-(-IL�/�2�t,RH��K�L���
qs�g�� %c���� q%�      �      x������ � �      �      x������ � �      �   �   x�=���0�A1��HՒ��b�h8؅(��ö���9�C�+|h8,w{B�h��L�d�/���'�	�j���/�W��Н����9�L�L�$�.���;��V�hv87�����כ_��/���<�      �      x������ � �      �   N   x�36�4��IL�/J,9��(3_����Ȃ�M�$h�&h�ed�i�&h�el�i�����`hhb�h���Ѐ+F��� ��%�      �   U   x�5���@߸�(>�H/鿎`V��Ȁ�,�rs$ž9�C`��.��[�x�Q}t�D�x��g)���<l*�-��2���2      �   <   x�3202�4���P��i���������������������� �50      �      x������ � �      �   �   x��M
1�=EN ���Q���+7��C 6ПA��9���|��!a�j�$	:L,��)�	�Ց�$p��	$�Ki�F�1:��D8K�}�:�Ab�gl��:��ɉ^x��	�U;5V�`D�њ��^�5�.��LO���}�4���D6j      �      x������ � �      �      x������ � �      �      x�3�30����� `�     