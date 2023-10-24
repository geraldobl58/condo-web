"use client";

import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

import { PropertyColumn, columns } from "./columns";

interface PropertyClientProps {
  data: PropertyColumn[];
}

export const PropertyClient = ({ data }: PropertyClientProps) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Imóveis(${data.length})`}
          description="Gerenciamento de imóveis"
        />
        <Button onClick={() => router.push(`/properties/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Registro
        </Button>
      </div>
      <Separator />
      <div className="mt-4">
        <DataTable searchKey="name" columns={columns} data={data} />
        <Heading title="API" description="Gerenciamento de rotas de imóveis" />
        <ApiList entityName="properties" entityIdName="propertyId" />
      </div>
    </>
  );
};
