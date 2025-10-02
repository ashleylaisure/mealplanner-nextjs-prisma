'use client'

import { useFoodsStore } from '@/lib/state/useFoodStore'
import { useDeleteFood, useFoods } from '@/services/actions/food.actions';
import React from 'react'
import NoItemsFound from '../NoItemsFound';
import FoodSkeleton from './FoodSkeleton';
import { Button } from '../ui/button';
import { Edit, Trash } from 'lucide-react';
import { alert } from '@/lib/state/GlobalStore';
import { Separator } from '../ui/separator';
import Pagination from '../Pagination';

const FoodCards = () => {
    const {
        updateSelectedFoodId,
        updateFoodDialogOpen,
        foodFilters,
        updateFoodFiltersPage,
    } = useFoodsStore();

    const foodsQuery = useFoods();
    const deleteFoodMutation = useDeleteFood();
    const totalPages = foodsQuery.data?.totalPages;

    if (totalPages === 0) {
        return <NoItemsFound onClick={() => updateFoodDialogOpen(true)} />
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-4">
                {foodsQuery.isLoading ? (
                    <FoodSkeleton />
                ) : (
                    <>
                    {foodsQuery.data?.data.map((item) => (
                        <div className="flex flex-col gap-3 rounded-lg border p-6" key={item.id}>
                            <div className="flex justify-between">
                                <p className="truncate">{item.name}</p>
                                <div className="flex gap-1">
                                    <Button
                                        className="size-6"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                            updateSelectedFoodId(item.id)
                                            updateFoodDialogOpen(true)
                                        }}
                                    >
                                        <Edit />
                                    </Button>
                                    <Button
                                        className="size-6"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                            alert({
                                                title: "Delete Food",
                                                description: `Are you sure you want to delete "${item.name}"? This action cannot be undone.`,
                                                confirmLabel: "Delete",
                                                onConfirm: () => deleteFoodMutation.mutate(item.id)})
                                        }}
                                    >
                                        <Trash />
                                    </Button>
                                </div>
                            </div>
                            <Separator />
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <p className="text-foreground/60 text-sm font-normal">
                                        Caloreis
                                    </p>
                                    <p className="text-sm font-medium">{item.calories}</p>
                                </div>
                                <div>
                                    <p className="text-foreground/60 text-sm font-normal">
                                        Carbohydrates
                                    </p>
                                    <p className="text-sm font-medium">{item.carbohydrate} g</p>
                                </div>
                                <div>
                                    <p className="text-foreground/60 text-sm font-normal">
                                        Protein
                                    </p>
                                    <p className="text-sm font-medium">{item.protein} g</p>
                                </div>
                                <div>
                                    <p className="text-foreground/60 text-sm font-normal">
                                        Fat
                                    </p>
                                    <p className="text-sm font-medium">{item.fat} g</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
                )}
            </div>
            <Pagination 
                currentPage={foodFilters.page}
                totalPages={totalPages}
                updatePage={updateFoodFiltersPage}
            />
        </div>
    )
}

export default FoodCards