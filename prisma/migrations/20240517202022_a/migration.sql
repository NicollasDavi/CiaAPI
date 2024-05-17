-- CreateTable
CREATE TABLE "CursoUnidade" (
    "cursoId" TEXT NOT NULL,
    "unidadeId" TEXT NOT NULL,

    CONSTRAINT "CursoUnidade_pkey" PRIMARY KEY ("cursoId","unidadeId")
);

-- AddForeignKey
ALTER TABLE "CursoUnidade" ADD CONSTRAINT "CursoUnidade_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CursoUnidade" ADD CONSTRAINT "CursoUnidade_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidades"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;
