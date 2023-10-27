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

  const categories = await prismadb.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const bathrooms = await prismadb.bathroom.findMany({
    orderBy: {
      quantity: "asc",
    },
  });
  const bedrooms = await prismadb.bedroom.findMany({
    orderBy: {
      quantity: "asc",
    },
  });
  const garages = await prismadb.garage.findMany({
    orderBy: {
      quantity: "asc",
    },
  });
  const kinds = await prismadb.kind.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <>
      <PropertyForm
        initialData={properties}
        categories={categories}
        bathrooms={bathrooms}
        bedrooms={bedrooms}
        garages={garages}
        kinds={kinds}
      />
    </>
  );
};

export default PropertyPage;
