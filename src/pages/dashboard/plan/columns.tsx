'use client';

import { useDialog } from "@/components/AlertDialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { usePlans } from "@/hooks/usePlans";
import { Plan } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router";

export const useColumns= (): ColumnDef<Plan>[] => {
  const navigate = useNavigate();
  const deletePlanMutation = usePlans().mutations.useDeletePlan();
  const { openDialog } = useDialog();

  const handleDelete = (id: string) => {
    openDialog({
      title: 'Confirm Delete',
      description: `Are you sure you want to delete this plan? This action cannot be undone.`,
      onConfirm: () => {
        deletePlanMutation.mutateAsync(id)
      },
      isDestructive: true,
    });
  };

  return [
    {
      accessorKey: "city",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            City
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "day_trip",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Day Trip?
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },  
    },
    {
      accessorKey: "country",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Country
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },  
    },
    {
      accessorKey: "rating",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Rating
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },  
    },
    {
      accessorKey: "quota",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Quota
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },  
    },
    {
      id: "actions",
      // header: "Actions",
      cell: ({ row }) => {
        const plan = row.original
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigate('edit/'+plan.id)}
              >
                Edit Data
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(plan.id)}
              >
                Delete Data
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}