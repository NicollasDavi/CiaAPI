-- CreateTable
CREATE TABLE "Usuario" (
    "matricula" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "isN" BOOLEAN NOT NULL DEFAULT false,
    "token" TEXT NOT NULL,
    "isAuth" BOOLEAN NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("matricula")
);

-- CreateTable
CREATE TABLE "Setores" (
    "codigo" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "informacoes" TEXT NOT NULL,
    "unidades" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "contato" TEXT NOT NULL,

    CONSTRAINT "Setores_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "Curso" (
    "id" TEXT NOT NULL,
    "matricula" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "unidade" TEXT NOT NULL,
    "turno" TEXT NOT NULL,
    "informacao" TEXT NOT NULL,
    "valor_E" DOUBLE PRECISION NOT NULL,
    "valor_M" DOUBLE PRECISION NOT NULL,
    "contra_T" TEXT NOT NULL,
    "integral" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Professores" (
    "nome" TEXT NOT NULL,
    "materia" TEXT NOT NULL,
    "tit" TEXT NOT NULL,
    "foto" TEXT NOT NULL,

    CONSTRAINT "Professores_pkey" PRIMARY KEY ("nome")
);

-- CreateTable
CREATE TABLE "Unidades" (
    "codigo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "informacoes" TEXT NOT NULL,
    "vcep" TEXT NOT NULL,
    "numeroTel" TEXT NOT NULL,
    "numeroWpp" TEXT NOT NULL,
    "horario" TEXT NOT NULL,

    CONSTRAINT "Unidades_pkey" PRIMARY KEY ("codigo")
);
