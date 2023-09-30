"use client";

import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";

import { Category } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

import { columns } from "./columns";

interface CategoryClientProps {
  data: Category[];
}

export const CategoryClient = ({ data }: CategoryClientProps) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categorias(${data.length})`}
          description="Gerenciamento de categorias"
        />
        <Button onClick={() => router.push(`/categories/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Registro
        </Button>
      </div>
      <Separator />
      <div className="mt-4">
        <DataTable searchKey="name" columns={columns} data={data} />
        <Heading
          title="API"
          description="Gerenciamento de rotas de categorias"
        />
        <ApiList entityName="categories" entityIdName="categoryId" />
      </div>
    </>
  );
};
