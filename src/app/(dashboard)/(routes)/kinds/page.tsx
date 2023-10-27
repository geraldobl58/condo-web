import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { KindClient } from "./components/client";
import { KindColumn } from "./components/columns";

import prismadb from "@/lib/prismadb";

const KindsPage = async () => {
  const kinds = await prismadb.kind.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const formattedKinds: KindColumn[] = kinds.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "'Dia' dd 'de' MMMM', às ' HH:mm'h'", {
      locale: ptBR,
    }),
    updatedAt: format(item.createdAt, "'Dia' dd 'de' MMMM', às ' HH:mm'h'", {
      locale: ptBR,
    }),
  }));

  return (
    <div className="flex-col">
      <KindClient data={formattedKinds} />
    </div>
  );
};

export default KindsPage;
