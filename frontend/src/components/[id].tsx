'use client'

import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Layout } from '@/components/Layout'
import { ItemList } from '@/components/ItemList'
import { Inventory } from '@/shared/types/inventory'
import { Loader } from './loaders/Loader'

export default function InventoryDetail() {
  const router = useRouter()
  const { id } = router.query
  const [inventory, setInventory] = useState<Inventory | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchInventory()
    }
  }, [id])

  const fetchInventory = async () => {
    try {
      const response = await fetch(`/api/inventories/${id}`)
      if (response.ok) {
        const data = await response.json()
        setInventory(data)
      } else {
        console.error('Failed to fetch inventory')
      }
    } catch (error) {
      console.error('Error fetching inventory:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <Loader />
  }

  if (!inventory) {
    return <div>Inventory not found</div>
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">{inventory.name}</h1>
      <p className="mb-4">Status: {inventory.status}</p>
      <ItemList inventoryId={inventory._id} />
    </Layout>
  )
}