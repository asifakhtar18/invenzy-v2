'use client'

import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { useGetInventoryQuery } from '@/redux/services/inventoryApi'
import { ItemList } from '@/components/ItemList'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/loaders/Loader'

export default function InventoryDetailPage() {
    const params = useParams();

    const router = useRouter();

    const inventoryId = params.id as string
    const { data: inventory, isLoading, isError } = useGetInventoryQuery(inventoryId)

    if (isLoading) return <Loader />
    if (isError) return <div>Error loading inventory</div>

    return (
        <div className="container p-4 ">
            <div className="flex items-center jsutify-center mb-6">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                >
                    <ChevronLeft size={24} />
                    <h1 className="text-3xl font-bold text-gray-300">Inventory Detail</h1>
                </Button>
            </div>
            {inventory && (
                <div className="container mx-auto px-12">
                    <h1 className="text-3xl font-bold mb-6">{inventory?.name}</h1>
                    <div className={`bg-${inventory?.status === 'active' ? 'green' : 'red'}-500 muted text-white text-sm , font-bold p-2 rounded-lg w-fit`}>{inventory?.status[0].toUpperCase() + inventory?.status.slice(1)}</div>
                    <div className="p-4">
                        <ItemList inventoryId={inventoryId} />
                    </div>
                </div>
            )}
        </div>
    )
}