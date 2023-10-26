import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import prismadb from "@/lib/prismadb";

import { BathroomsColumn } from "./components/columns";
import { BathroomClient } from "./components/client";

const BathroomsPage = async () => {
  const bathrooms = await prismadb.bathroom.findMany({
    orderBy: {
      quantity: "asc",
    },
  });

  const formattedBathrooms: BathroomsColumn[] = bathrooms.map((item) => ({
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
      <BathroomClient data={formattedBathrooms} />
    </div>
  );
};

export default BathroomsPage;
