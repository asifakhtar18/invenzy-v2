"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Inventories</CardTitle>
                        <CardDescription>Number of inventories you manage</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">5</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Items</CardTitle>
                        <CardDescription>Total number of items across all inventories</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">150</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Low Stock Items</CardTitle>
                        <CardDescription>Items that need restocking</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">12</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}