-- CreateTable
CREATE TABLE "Pagina" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "publica" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Pagina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoDocumento" (
    "id" SERIAL NOT NULL,
    "type" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "paginaId" INTEGER NOT NULL,

    CONSTRAINT "TipoDocumento_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pagina" ADD CONSTRAINT "Pagina_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuario"("matricula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TipoDocumento" ADD CONSTRAINT "TipoDocumento_paginaId_fkey" FOREIGN KEY ("paginaId") REFERENCES "Pagina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
