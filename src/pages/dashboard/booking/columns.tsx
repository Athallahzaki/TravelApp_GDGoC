'use client';

import { useDialog } from "@/components/AlertDialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useBookings } from "@/hooks/useBookings";
import { Booking, User, Destination } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router";

interface BookingWithReference extends Booking {
  user: User | null;
  destination: Destination | null;
}

export const useColumns= (): ColumnDef<BookingWithReference>[] => {
  const navigate = useNavigate();
  const deleteBookingMutation = useBookings().mutations.useDeleteBooking();
  const { openDialog } = useDialog();


  const handleDelete = (id: string) => {
    openDialog({
      title: 'Confirm Delete',
      description: `Are you sure you want to delete this booking? This action cannot be undone.`,
      onConfirm: () => {
        deleteBookingMutation.mutateAsync(id)
      },
      isDestructive: true,
    });
  };

  return [
    {
      accessorKey: "user.name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "user.phone",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Phone Number
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "destination",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Destination
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const destination = row.original.destination;
        return <span>{destination?.country}, {destination?.city}</span>;
      },
    },
    {
      id: "actions",
      // header: "Actions",
      cell: ({ row }) => {
        const booking = row.original
  
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
                onClick={() => navigate('edit/'+booking.id)}
              >
                Edit Data
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(booking.id)}
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