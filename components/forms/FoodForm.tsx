'use client'
import useCategoriesStore from '@/lib/state/useCategoriesStore'
import { useFoodsStore } from '@/lib/state/useFoodStore'
import useServingUnitsStore from '@/lib/state/useServingUnitsStore'
import { useCreateFood, useFood, useUpdateFood } from '@/services/actions/food.actions'
import { useCategories } from '@/services/actions/categories.queries'
import { foodDefaultValues, foodSchema, FoodSchema } from '@/types/schema/foodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import FormInput from './element/FormInput'
import FormSelect from './element/FormSelect'
import CategoryForm from './CategoryForm'
import SelectServingUnit from './element/SelectServingUnit'

const FoodForm = () => {
    
    const form = useForm<FoodSchema>({
      defaultValues: foodDefaultValues,
      resolver: zodResolver(foodSchema),
    });

    const foodQuery = useFood()
    const categoriesQuery = useCategories()

    const createFoodMutation = useCreateFood()
    const updateFoodMutation = useUpdateFood()

    const isPending = createFoodMutation.isPending || updateFoodMutation.isPending

    const {
      selectedFoodId,
      updateSelectedFoodId, 
      foodDialogOpen,
      updateFoodDialogOpen, 
      
    } = useFoodsStore()

    // able to add new category or serving unit from within the food form
    const { categoryDialogOpen} = useCategoriesStore()
    const { servingUnitDialogOpen} = useServingUnitsStore()

    // When selectedFoodId changes, reset the form with the food data
    useEffect(() => {
      if (!!selectedFoodId && foodQuery.data) {
        form.reset(foodQuery.data)
      }
    }, [foodQuery.data, form, selectedFoodId])

    const handleDialogOpenChange = (open: boolean) => {
      updateFoodDialogOpen(open)

      if (!open) {
        // reset form and selectedFoodId when dialog is closed
        updateSelectedFoodId(null)
        form.reset(foodDefaultValues)
      }
    }

    // close dialog after successful submit
    const handleSuccess = () => {
      handleDialogOpenChange(false);
    }

    const disableSubmit = servingUnitDialogOpen || categoryDialogOpen

    const onSubmit: SubmitHandler<FoodSchema> = (data) => {
      if (data.action === 'create') {
        createFoodMutation.mutate(data, {
          onSuccess: handleSuccess,
        })
      } else {
        updateFoodMutation.mutate(data, {
          onSuccess: handleSuccess
        })
      }
    }

    return (
      <Dialog open={foodDialogOpen} onOpenChange={handleDialogOpenChange}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2"/>
            New Food
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedFoodId ? "Edit Food" : "Create a new Food"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={disableSubmit ? undefined : form.handleSubmit(onSubmit)} className="space-y-6">
            <FormProvider {...form}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1 grid">
                  <FormInput<FoodSchema>
                    name="name"
                    label="Name"
                    placeholder="Enter food name"
                  />
                </div>

                <div className="col-span-1 flex items-end">
                  <FormSelect<FoodSchema>
                    label="Category"
                    name="categoryId"
                    options={categoriesQuery.data?.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))}
                  />
                  <CategoryForm smallTrigger />
                </div>

                <FormInput<FoodSchema>
                  name="calories"
                  label="Calories"
                  type="number"
                  placeholder="kcal"
                />
                <FormInput<FoodSchema>
                  name="protein"
                  label="Protein"
                  type="number"
                  placeholder="grams"
                />
                <FormInput<FoodSchema>
                  name="carbohydrate"
                  label="Carbohydrates"
                  type="number"
                  placeholder="grams"
                />
                <FormInput<FoodSchema>
                  name="fat"
                  label="Fat"
                  type="number"
                  placeholder="grams"
                />
                <FormInput<FoodSchema>
                  name="fiber"
                  label="Fiber"
                  type="number"
                  placeholder="grams"
                />
                <FormInput<FoodSchema>
                  name="sugar"
                  label="Sugar"
                  type="number"
                  placeholder="grams"
                />
                
                <div className="col-span-2">
                  <SelectServingUnit />
                </div>
              
              </div>
            </FormProvider>

            <DialogFooter>
              <Button type="submit" isLoading={isPending}>
                {!!selectedFoodId ? "Edit" : "Create"} Food
              </Button>
            </DialogFooter>

          </form>
        </DialogContent>

      </Dialog>
    )
}

export default FoodForm