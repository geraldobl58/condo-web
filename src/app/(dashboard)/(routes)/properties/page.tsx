import { PropertyColumn } from "./components/columns";
import { PropertyClient } from "./components/client";

import prismadb from "@/lib/prismadb";

import { formattedPrice } from "@/lib/utils";

const PropertiesPage = async () => {
  const properties = await prismadb.property.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
      bathroom: true,
    },
  });

  const formattedProperties: PropertyColumn[] = properties.map((item) => ({
    id: item.id,
    category: item.category.name,
    name: item.name,
    address: item.address,
    neighborhood: item.neighborhood,
    price: formattedPrice.format(item.price.toNumber()),
    type: item.type,
    bathrooms: item.bathroom.quantity,
    bedrooms: item.bedrooms,
    garage: item.garage,
    land: item.land,
    isFeatured: item.isFeatured,
  }));

  return (
    <div className="flex-col">
      <PropertyClient data={formattedProperties} />
    </div>
  );
};

export default PropertiesPage;
