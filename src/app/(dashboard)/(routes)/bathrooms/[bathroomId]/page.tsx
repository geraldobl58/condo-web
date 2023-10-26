import prismadb from "@/lib/prismadb";

import { BathroomForm } from "./components/bathroom-form";

const BathroomPage = async ({ params }: { params: { bathroomId: string } }) => {
  const bathrooms = await prismadb.bathroom.findUnique({
    where: {
      id: params.bathroomId,
    },
  });

  return (
    <>
      <BathroomForm initialData={bathrooms} />
    </>
  );
};

export default BathroomPage;
