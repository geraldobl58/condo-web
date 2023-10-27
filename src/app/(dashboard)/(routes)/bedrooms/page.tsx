import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import prismadb from "@/lib/prismadb";

import { BedroomsColumn } from "./components/columns";
import { BedroomsClient } from "./components/client";

const BedroomsPage = async () => {
  const bedrooms = await prismadb.bedroom.findMany({
    orderBy: {
      quantity: "asc",
    },
  });

  const formattedBedrooms: BedroomsColumn[] = bedrooms.map((item) => ({
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
      <BedroomsClient data={formattedBedrooms} />
    </div>
  );
};

export default BedroomsPage;
