import prismadb from "@/lib/prismadb";

import { KindsForm } from "./components/kind-form";

const KindPage = async ({ params }: { params: { kindId: string } }) => {
  const kinds = await prismadb.kind.findUnique({
    where: {
      id: params.kindId,
    },
  });

  return (
    <>
      <KindsForm initialData={kinds} />
    </>
  );
};

export default KindPage;
