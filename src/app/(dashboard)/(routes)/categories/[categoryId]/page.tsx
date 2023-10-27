import prismadb from "@/lib/prismadb";

import { CategoriesForm } from "./components/category-form";

const CategoryPage = async ({ params }: { params: { categoryId: string } }) => {
  const categories = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  return (
    <>
      <CategoriesForm initialData={categories} />
    </>
  );
};

export default CategoryPage;
