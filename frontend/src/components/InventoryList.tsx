'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useGetInventoriesQuery, useDeleteInventoryMutation, useCreateInventoryMutation } from '@/redux/services/inventoryApi'
import { Inventory } from '@/shared/types/inventory'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader } from './loaders/Loader'

export const InventoryList = () => {
  const { data: inventories, isLoading, isError } = useGetInventoriesQuery()
  const [deleteInventory] = useDeleteInventoryMutation()
  const [createInventory] = useCreateInventoryMutation()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newInventory, setNewInventory] = useState<Partial<Inventory>>({ name: '', status: 'active' })
  const { toast } = useToast()

  const handleDelete = async (id: string) => {
    try {
      await deleteInventory(id).unwrap()
      toast({
        title: "Inventory deleted",
        description: "The inventory has been successfully deleted.",
      })
    } catch (error) {
      console.error("Error deleting inventory:", error)
      toast({
        title: "Error",
        description: "Failed to delete the inventory. Please try again.",
        variant: "destructive",
      })
    }
  }


  if (isLoading) return <Loader />
  if (isError) return <div>Error loading inventories</div>

  return (
    <div >
      <div className="flex justify-between items-center mb-4">
        <h1 className="sm:text-3xl text-2xl font-bold mb-4">Inventories</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Inventory</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Inventory</DialogTitle>
              <DialogDescription>Create a new inventory to manage your items.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newInventory.name}
                  onChange={(e) => setNewInventory({ ...newInventory, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  onValueChange={(value: string) => setNewInventory({ ...newInventory, status: value as 'active' | 'inactive' })}
                  defaultValue={newInventory.status}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit"
                onClick={() => createInventory(newInventory).then(() => setIsDialogOpen(false))}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {inventories?.map((inventory) => (
          <Card key={inventory._id}>
            <CardHeader className="space-y-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xl">{inventory.name}</CardTitle>
              <CardDescription className={`bg-${inventory.status === 'active' ? 'green' : 'red'}-500 muted text-white text-sm , font-bold p-2 rounded-lg w-fit`}>{inventory.status[0].toUpperCase() + inventory.status.slice(1)}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">Items: {inventory.itemCount}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href={`/inventories/${inventory._id}`}>
                <Button variant="outline">View Items</Button>
              </Link>
              <Button variant="destructive" onClick={() => handleDelete(inventory._id)}>Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}