'use client'
import { usePathname } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from 'react'
import Link from 'next/link';
import { Apple, Boxes, ForkKnife, Ruler } from 'lucide-react';

const ManagementTabs = () => {
    const pathname = usePathname();

    const getDefaultTab = () => {
        if (pathname.includes('/categories')) {
            return 'categories';
        }
        if (pathname.includes('/serving-units')) {
            return 'serving-units';
        }
        if (pathname.includes('/meals')) {
            return 'meals';
        }
        return 'foods';
    }

    return (
        <div className="mx-auto max-w-7xl p-6">
            <div className="mb-6">
                <Tabs value={getDefaultTab()}>
                    <TabsList>
                        <TabsTrigger value="meals" asChild>
                            <Link href="/meals">
                                <ForkKnife />
                                Meals
                            </Link>
                        </TabsTrigger>
                        <TabsTrigger value="foods" asChild>
                            <Link href="/foods">
                                <Apple />
                                Foods
                            </Link>
                        </TabsTrigger>
                        <TabsTrigger value="categories" asChild>
                            <Link href="/categories">
                                <Boxes />
                                Categories
                            </Link>
                        </TabsTrigger>
                        <TabsTrigger value="serving-units" asChild>
                            <Link href="/serving-units">
                                <Ruler />
                                Serving Units
                            </Link>
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
        </div>
    )
}

export default ManagementTabs