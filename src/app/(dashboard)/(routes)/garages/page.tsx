import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import prismadb from "@/lib/prismadb";

import { GaragesColumn } from "./components/columns";
import { GaragesClient } from "./components/client";

const GaragePage = async () => {
  const garages = await prismadb.garage.findMany({
    orderBy: {
      quantity: "asc",
    },
  });

  const formattedgarages: GaragesColumn[] = garages.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    createdAt: format(item.createdAt, "'Dia' dd 'de' MMMM', às ' HH:mm'h'", {
      locale: ptBR,
    }),
    updatedAt: format(item.createdAt, "'Dia' dd 'de' MMMM', às ' HH:mm'h'", {
      locale: ptBR,
    }),
  }));

  return (
    <div className="flex-col">
      <GaragesClient data={formattedgarages} />
    </div>
  );
};

export default GaragePage;
