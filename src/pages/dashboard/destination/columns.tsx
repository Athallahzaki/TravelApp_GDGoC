'use client';

import { useDialog } from "@/components/AlertDialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDestinations } from "@/hooks/useDestinations";
import { Destination } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router";

export const useColumns= (): ColumnDef<Destination>[] => {
  const navigate = useNavigate();
  const deleteDestinationMutation = useDestinations().mutations.useDeleteDestination();
  const { openDialog } = useDialog();

  const handleDelete = (id: string) => {
    openDialog({
      title: 'Confirm Delete',
      description: `Are you sure you want to delete this destination? This action cannot be undone.`,
      onConfirm: () => {
        deleteDestinationMutation.mutateAsync(id)
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
      accessorKey: "discount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Discount
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
        const destination = row.original
  
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
                onClick={() => navigate('edit/'+destination.id)}
              >
                Edit Data
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(destination.id)}
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