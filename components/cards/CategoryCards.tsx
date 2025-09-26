'use client'
import React from 'react'
import { useCategories } from '@/app/(dashboard)/admin/foods-management/categories/_services/queries';
import { useDeleteCategory } from '@/app/(dashboard)/admin/foods-management/categories/_services/mutations';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import { alert } from '@/lib/state/GlobalStore';
import useCategoriesStore from '@/lib/state/useCategoriesStore';
import { CategoryCardsSkeleton } from './CategoryCardsSkeleton';

const CategoryCards = () => {
  const categoriesQuery = useCategories();
  const deleteCategoryMutation = useDeleteCategory();
  
  const { updateSelectedCategoryId, updateCategoryDialogOpen } = useCategoriesStore();

  return (
    <div className="grid grid-cols-4 gap-2">
      {categoriesQuery.isLoading ? ( <CategoryCardsSkeleton /> ) : (
        <>
        {categoriesQuery.data?.map((item) => ( 
          <div className="bg-accent flex flex-col justify-between gap-3 rounded-lg p-6 shadow-md" key={item.id}>
            <p className="truncate">{item.name}</p>
            <div className="flex gap-1">
              <Button 
                className="size-6" 
                variant='ghost' 
                size="icon" 
                onClick={() => {
                  updateSelectedCategoryId(item.id);
                  updateCategoryDialogOpen(true);
                }}>
                <Edit />
              </Button>
              <Button 
                className="size-6" 
                variant='ghost' 
                size="icon" 
                onClick={() => {
                  alert({
                    title: "Delete Category",
                    description: `Are you sure you want to delete the category "${item.name}"? This action cannot be undone.`,
                    confirmLabel: "Delete",
                    cancelLabel: "Cancel",
                    onConfirm: () => {deleteCategoryMutation.mutate(item.id)}
                  })
                }}>
                <Trash />
              </Button>
            </div>
          </div>
        ))}
      </>
      )}
    </div>
  )
}

export default CategoryCards