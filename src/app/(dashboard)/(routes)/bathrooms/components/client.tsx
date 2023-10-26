"use client";

import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";

import { Bathroom } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

import { columns } from "./columns";

interface BathroomClientProps {
  data: Bathroom[];
}

export const BathroomClient = ({ data }: BathroomClientProps) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Banheiros(${data.length})`}
          description="Gerenciamento"
        />
        <Button onClick={() => router.push(`/bathrooms/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Registro
        </Button>
      </div>
      <Separator />
      <div className="mt-4">
        <DataTable searchKey="quantity" columns={columns} data={data} />
        <Heading title="API" description="Gerenciamento de rotas" />
        <ApiList entityName="bathrooms" entityIdName="bathroomId" />
      </div>
    </>
  );
};
