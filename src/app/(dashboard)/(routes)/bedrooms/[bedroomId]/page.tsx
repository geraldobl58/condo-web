import prismadb from "@/lib/prismadb";

import { BedroomForm } from "./components/bedroom-form";

const BedroomPage = async ({ params }: { params: { bedroomId: string } }) => {
  const bedrooms = await prismadb.bedroom.findUnique({
    where: {
      id: params.bedroomId,
    },
  });

  return (
    <>
      <BedroomForm initialData={bedrooms} />
    </>
  );
};

export default BedroomPage;
