import prismadb from "@/lib/prismadb";

import { GarageForm } from "./components/garage-form";

const GaragePage = async ({ params }: { params: { garageId: string } }) => {
  const garages = await prismadb.garage.findUnique({
    where: {
      id: params.garageId,
    },
  });

  return (
    <>
      <GarageForm initialData={garages} />
    </>
  );
};

export default GaragePage;
