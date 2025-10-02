"use client"
import { useFoodsStore } from '@/lib/state/useFoodStore'
import { foodFilterDefaultValues, foodFilterSchema, FoodFilterSchema } from '@/types/schema/foodFilterSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useMemo } from 'react'
import { FormProvider, SubmitHandler, useForm, useWatch } from 'react-hook-form'
import equal from "fast-deep-equal";
import useDebounce from '@/lib/useDebounce'
import { useCategories } from '@/services/queries/categories.queries'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import FormInput from './element/FormInput'
import { Button } from '../ui/button'
import { FilterIcon } from 'lucide-react'
import FormSelect from './element/FormSelect'
import Slider from './element/Slider'


const FoodFilters = () => {

    // define the form
    const form = useForm<FoodFilterSchema>({
        defaultValues: foodFilterDefaultValues,
        resolver: zodResolver(foodFilterSchema),
    });

    const {
        updateFoodFilters,
        foodFiltersDrawerOpen,
        updateFoodFiltersDrawerOpen,
        updateFoodFiltersSearchTerm,
        foodFilters,
    } = useFoodsStore()

    const areFiltersModified = useMemo(
        () => !equal(foodFilters, foodFilterDefaultValues),
        [foodFilters],
    )

    const searchTerm = useWatch({ control: form.control, name: "searchTerm"});
    const debouncedSearchTerm = useDebounce(searchTerm, 400)

    useEffect(() => {
        updateFoodFiltersSearchTerm(debouncedSearchTerm)
    }, [debouncedSearchTerm, updateFoodFiltersSearchTerm])

    const categoriesQuery = useCategories()

    useEffect(() => {
        if (!foodFiltersDrawerOpen) {
            form.reset(foodFilters)
        }
    }, [foodFilters, foodFiltersDrawerOpen, form])

    const onSubmit: SubmitHandler<FoodFilterSchema> = (data) => {
        updateFoodFilters(data);
        updateFoodFiltersDrawerOpen(false)
    }

    return (
        <Drawer
            open={foodFiltersDrawerOpen}
            onOpenChange={updateFoodFiltersDrawerOpen}
            direction="right"
            handleOnly
        >
            <FormProvider {...form}>
                <div className="flex gap-2">
                    <FormInput<FoodFilterSchema>
                        containerClassName="max-w-48"
                        name="searchTerm"
                        placeholder="Quick Search"
                    />
                    <DrawerTrigger asChild>
                        <Button variant="outline" badge={areFiltersModified}>
                            <FilterIcon />
                            Fitlers
                        </Button>
                    </DrawerTrigger>
                </div>

                <form>
                    <DrawerContent>
                        <DrawerHeader className="text-left">
                            <DrawerTitle>Filters</DrawerTitle>
                            <DrawerDescription>Customize your food search criteria</DrawerDescription>
                        </DrawerHeader>

                        <div className="space-y-2 p-4">
                            <div className="flex flex-wrap gap-2">
                                <FormSelect<FoodFilterSchema> 
                                    label="Category"
                                    name="categoryId"
                                    clearable
                                    options={categoriesQuery.data?.map((unit) => ({
                                        value: unit.id,
                                        label: unit.name,
                                    }))}
                                />
                                <FormSelect<FoodFilterSchema> 
                                    label="Sort By"
                                    name="sortBy"
                                    options={[
                                        { label: "Name", value: "name" },
                                        { label: "Calories", value: "calories" },
                                        { label: "Protein", value: "protein" },
                                        { label: "Carbohydrates", value: "carbohydrate" },
                                        { label: "Fat", value: "fat" },
                                    ]}
                                />
                                <FormSelect<FoodFilterSchema> 
                                    label="Sort Order"
                                    name="sortOrder"
                                    options={[
                                        {label: "Ascending", value: "asc"},
                                        {label: "Descending", value: "desc"},
                                    ]}
                                />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Slider<FoodFilterSchema> 
                                    name="caloriesRange"
                                    label="Calories"
                                    min={0}
                                    max={9999}
                                />
                                <Slider<FoodFilterSchema> 
                                    name="proteinRange"
                                    label="Protein"
                                    min={0}
                                    max={9999}
                                />
                            </div>
                        </div>

                        <DrawerFooter className="pt-2">
                            <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>

                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {form.reset(foodFilterDefaultValues)}}
                            >
                                Reset
                            </Button>

                            <Button
                                type="submit"
                                onClick={form.handleSubmit(onSubmit)}
                            >
                                Apply Filters
                            </Button>
                        </DrawerFooter>
                    </DrawerContent>
                </form>
            </FormProvider>

        </Drawer>
    )
}

export default FoodFilters