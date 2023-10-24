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
  type: string;
  bedrooms: string;
  bathrooms: string;
  garage: string;
  land: string;
};

export const columns: ColumnDef<PropertyColumn>[] = [
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
    accessorKey: "type",
    header: "Tipo",
  },
  {
    accessorKey: "bedrooms",
    header: "Banheiros",
  },
  {
    accessorKey: "bathrooms",
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
