import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import prismadb from "@/lib/prismadb";

import { CategoryClient } from "./components/client";
import { CategoryColumn } from "./components/columns";

const CategoriesPage = async () => {
  const categories = await prismadb.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
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
      <CategoryClient data={formattedCategories} />
    </div>
  );
};

export default CategoriesPage;
