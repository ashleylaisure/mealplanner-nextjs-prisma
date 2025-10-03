import { Button } from '@/components/ui/button'
import { useFoods } from '@/services/actions/food.actions'
import { useServingUnits } from '@/services/actions/servingUnit.queries'
import { MealSchema } from '@/types/schema/mealSchema'
import { CirclePlus, Trash2, UtensilsCrossed } from 'lucide-react'
import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import FormSelect from './FormSelect'
import FormInput from './FormInput'

const SelectMealFoods = () => {
    const { control } = useFormContext<MealSchema>()
    const mealFoods = useFieldArray({ control, name: "mealFoods" })

    const foodsQuery = useFoods();
    const servingUnitsQuery = useServingUnits();

    return (
        <div className="flex flex-col gap-4 rounded-md border p-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Foods</h3>
                <Button
                    size="sm"
                    type="button"
                    variant="outline"
                    className="flex items-center gap-1"
                    onClick={() => {
                        mealFoods.append({ foodId: '', servingUnitId: '', amount: "0" })
                    }}
                >
                    <CirclePlus className="size-4" />
                    Add Food
                </Button>
            </div>

            {mealFoods.fields.length === 0 ? (
                <div className="text-muted-foreground flex flex-col items-center justify-center rounded-md border border-dashed py-6 text-center">
                    <UtensilsCrossed className="mb-2 size-10 opacity-50" />
                    <p className="text-sm">
                        Add foods to track what you&apos;re eating in this meal.
                    </p>
                </div>
            ): (
                <div className="space-y-3">
                    {mealFoods.fields.map((field, index) => (
                        <div className="grid grid-cols-[1fr_1fr_1fr_auto] items-end gap-3" key={field.id}>
                            <FormSelect<MealSchema>
                                label="Food"
                                name={`mealFoods.${index}.foodId`}
                                options={foodsQuery.data?.data.map((item) => ({
                                    label: item.name,
                                    value: item.id
                                }))}
                                placeholder="Select food"
                            />
                            <FormSelect<MealSchema>
                                label="Serving Unit"
                                name={`mealFoods.${index}.servingUnitId`}
                                options={servingUnitsQuery.data?.map((item) => ({
                                    label: item.name,
                                    value: item.id
                                }))}
                                placeholder="Select serving unit"
                            />
                            <FormInput<MealSchema>
                                label="Amount"
                                name={`mealFoods.${index}.amount`}
                                type="number"
                                placeholder="0"
                            />
                            <Button
                                size="icon"
                                variant={"outline"}
                                type='button'
                                onClick={() => mealFoods.remove(index)}
                            >
                                <Trash2 />
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SelectMealFoods