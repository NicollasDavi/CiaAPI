-- CreateTable
CREATE TABLE "Usuario" (
    "matricula" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "isN" BOOLEAN NOT NULL DEFAULT false,
    "token" TEXT NOT NULL DEFAULT ' ',
    "isAuth" BOOLEAN NOT NULL DEFAULT false,

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
    "imagem" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CursoValor" (
    "id" TEXT NOT NULL,
    "valor_E" DOUBLE PRECISION NOT NULL,
    "valor_M" DOUBLE PRECISION NOT NULL,
    "nome" TEXT NOT NULL,
    "unidade" TEXT NOT NULL,
    "turno" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "CursoValor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Professores" (
    "id" TEXT NOT NULL,
    "materia" TEXT NOT NULL,
    "tit" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Professores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unidades" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "informacoes" TEXT NOT NULL,
    "vcep" TEXT NOT NULL,
    "numeroTel" TEXT NOT NULL,
    "numeroWpp" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Unidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CursoUnidade" (
    "cursoId" TEXT NOT NULL,
    "unidadeId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CursoUnidade_pkey" PRIMARY KEY ("cursoId","unidadeId")
);

-- CreateTable
CREATE TABLE "Pagina" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "publica" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pagina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoDocumento" (
    "id" SERIAL NOT NULL,
    "type" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "paginaId" TEXT NOT NULL,

    CONSTRAINT "TipoDocumento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carousel_items" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "carousel_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pdf_files" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pdf_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avisos" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "alertas" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "avisos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CursoUnidade" ADD CONSTRAINT "CursoUnidade_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CursoUnidade" ADD CONSTRAINT "CursoUnidade_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pagina" ADD CONSTRAINT "Pagina_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuario"("matricula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TipoDocumento" ADD CONSTRAINT "TipoDocumento_paginaId_fkey" FOREIGN KEY ("paginaId") REFERENCES "Pagina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
