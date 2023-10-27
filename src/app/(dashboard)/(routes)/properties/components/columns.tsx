"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type PropertyColumn = {
  id: string;
  category: string;
  name: string;
  address: string;
  neighborhood: string;
  price: string;
  kind: string;
  bedrooms: number;
  bathrooms: number;
  garage: number;
  land: number;
  isFeatured: boolean;
};

export const columns: ColumnDef<PropertyColumn>[] = [
  {
    accessorKey: "isFeatured",
    header: "Destaque",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.isFeatured ? "Ativo" : "Inativo"}
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "address",
    header: "Endereço",
  },
  {
    accessorKey: "neighborhood",
    header: "Bairro",
  },
  {
    accessorKey: "price",
    header: "Preço",
  },
  {
    accessorKey: "kind",
    header: "Tipo",
  },
  {
    accessorKey: "bathrooms",
    header: "Banheiros",
  },
  {
    accessorKey: "bedrooms",
    header: "Quartos",
  },
  {
    accessorKey: "garage",
    header: "Garagem",
  },
  {
    accessorKey: "land",
    header: "Terreno",
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
