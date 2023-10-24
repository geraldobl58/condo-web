import prismadb from "@/lib/prismadb";

import { PropertyForm } from "./components/property-form";

const PropertyPage = async ({ params }: { params: { propertyId: string } }) => {
  const properties = await prismadb.property.findUnique({
    where: {
      id: params.propertyId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismadb.category.findMany({});

  return (
    <>
      <PropertyForm initialData={properties} categories={categories} />
    </>
  );
};

export default PropertyPage;
