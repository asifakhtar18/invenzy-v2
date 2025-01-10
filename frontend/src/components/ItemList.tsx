'use client'

import { useState } from 'react'
import { useGetItemsQuery, useCreateItemMutation, useUpdateItemMutation, useDeleteItemMutation, useGetUnitsQuery, useCreateUnitMutation } from '@/redux/services/inventoryApi'
import { Item } from '@/shared/types/inventory'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil, Trash2, PlusCircle, MinusCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { Loader } from './loaders/Loader'

interface ItemListProps {
  inventoryId: string
}

export const ItemList = ({ inventoryId }: ItemListProps) => {
  const { data: items, isLoading, isError } = useGetItemsQuery(inventoryId)
  const [createItem] = useCreateItemMutation()
  const [updateItem] = useUpdateItemMutation()
  const [deleteItem] = useDeleteItemMutation()
  const { data: units } = useGetUnitsQuery()
  const [createUnit] = useCreateUnitMutation()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState<Partial<Item> & { inventoryId: string }>({
    name: '',
    description: '',
    availableQuantity: 0,
    unit: '',
    alertQuantity: 0,
    inventoryId
  })
  const [newUnit, setNewUnit] = useState('')

  const handleSave = async () => {
    try {
      if (currentItem._id) {
        await updateItem(currentItem as Item).unwrap()
        toast.success('Item updated successfully')
      } else {
        await createItem(currentItem).unwrap()
        toast.success('Item created successfully')
      }
      setIsDialogOpen(false)
    } catch (error) {
      console.error('Error saving item:', error)
      toast.error('Failed to save the item. Please try again.')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteItem({ _id: id, inventoryId }).unwrap()
      toast.success('Item deleted successfully')
    } catch (error) {
      console.error('Error deleting item:', error)
      toast.error('Failed to delete the item. Please try again.')
    }
  }

  const handleIncrement = async (item: Item) => {
    try {
      await updateItem({ ...item, availableQuantity: item.availableQuantity + 1 }).unwrap()
      toast.success('Item quantity increased')
    } catch (error) {
      console.error('Error updating item quantity:', error)
      toast.error('Failed to update item quantity')
    }
  }

  const handleDecrement = async (item: Item) => {
    if (item.availableQuantity > 0) {
      try {
        await updateItem({ ...item, availableQuantity: item.availableQuantity - 1 }).unwrap()
        toast.success('Item quantity decreased')
        if (item.availableQuantity - 1 <= item.alertQuantity) {
          toast.error(`Low stock alert for ${item.name}`)
        }
      } catch (error) {
        console.error('Error updating item quantity:', error)
        toast.error('Failed to update item quantity')
      }
    }
  }

  const handleAddUnit = async () => {
    if (newUnit) {
      try {
        await createUnit({ name: newUnit }).unwrap()
        toast.success('New unit added successfully')
        setNewUnit('')
      } catch (error) {
        console.error('Error adding new unit:', error)
        toast.error('Failed to add new unit')
      }
    }
  }

  if (isLoading) return <Loader />
  if (isError) return <div>Error loading items</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold"></h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setCurrentItem({ name: '', description: '', availableQuantity: 0, unit: '', alertQuantity: 0, inventoryId })}>
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentItem._id ? 'Edit' : 'Add'} Item</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input
                  id="name"
                  value={currentItem.name}
                  onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Input
                  id="description"
                  value={currentItem.description}
                  onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="availableQuantity" className="text-right">Available Quantity</Label>
                <Input
                  id="availableQuantity"
                  type="number"
                  value={currentItem.availableQuantity}
                  onChange={(e) => setCurrentItem({ ...currentItem, availableQuantity: parseInt(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="unit" className="text-right">Unit</Label>
                <Select
                  value={currentItem.unit}
                  onValueChange={(value) => setCurrentItem({ ...currentItem, unit: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {units?.map((unit, index) => (
                      <SelectItem key={index} value={unit.name}>{unit.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newUnit" className="text-right">Add New Unit</Label>
                <Input
                  id="newUnit"
                  value={newUnit}
                  onChange={(e) => setNewUnit(e.target.value)}
                  className="col-span-2"
                />
                <Button onClick={handleAddUnit}>Add</Button>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="alertQuantity" className="text-right">Alert Quantity</Label>
                <Input
                  id="alertQuantity"
                  type="number"
                  value={currentItem.alertQuantity}
                  onChange={(e) => setCurrentItem({ ...currentItem, alertQuantity: parseInt(e.target.value) })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSave}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items?.map((item) => (
          <Card key={item._id} className={item.availableQuantity <= item.alertQuantity ? 'bg-red-300 border-red-500' : ''}>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{item.description}</p>
              <p className="font-bold ">{item.availableQuantity} {item.unit}</p>
              {item.availableQuantity <= item.alertQuantity && <p className="text-red-600">Stock is lower  <span>{item.alertQuantity}</span></p>}
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className='flex items-center'>
                <MinusCircle
                  onClick={() => handleDecrement(item)}
                  className="h-8 w-8 text-red-600"
                />
                <PlusCircle
                  onClick={() => handleIncrement(item)}
                  className="h-8 w-8 text-green-600"
                />

              </div>
              <div>
                <Button variant="outline" size="icon" onClick={() => {
                  setCurrentItem(item)
                  setIsDialogOpen(true)
                }}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="ml-2" onClick={() => handleDelete(item._id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}