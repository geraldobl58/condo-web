"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type BathroomsColumn = {
  id: string;
  quantity: number;
  createdAt: any;
  updatedAt: any;
};

export const columns: ColumnDef<BathroomsColumn>[] = [
  {
    accessorKey: "quantity",
    header: "Quantidade",
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
