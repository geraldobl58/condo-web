"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type KindColumn = {
  id: string;
  name: string;
  createdAt: any;
  updatedAt: any;
};

export const columns: ColumnDef<KindColumn>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "createdAt",
    header: "Data de criação",
  },
  {
    accessorKey: "updatedAt",
    header: "Data de modificação",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
