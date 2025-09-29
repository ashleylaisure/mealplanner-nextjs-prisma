import { Button } from '@/components/ui/button'
import { useServingUnits } from '@/services/queries/servingUnit.queries'
import { FoodSchema } from '@/types/schema/foodSchema'
import { CirclePlus, Trash2, UtensilsCrossed } from 'lucide-react'
import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import FormSelect from './FormSelect'
import ServingUnitForm from '../ServingUnitForm'
import FormInput from './FormInput'

const SelectServingUnit = () => {

    const { control } = useFormContext<FoodSchema>()
    const foodServingUnits = useFieldArray({ control, name: "foodServingUnits"})

    const servingUnitsQuery = useServingUnits();

    return (
        <div className="flex flex-col gap-4 rounded-md border p-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Serving units</h3>
                <Button
                    size="sm"
                    type="button"
                    variant="outline"
                    className="flex items-center gap-1"
                    onClick={() => {
                        foodServingUnits.append({ foodServingUnitId: "", grams: "0"})
                    }}
                >
                    <CirclePlus className="size-4" /> Add Serving Unit
                </Button>
            </div>

            {foodServingUnits.fields.length === 0 ? (
                <div className="text-muted-forground flex flex-col items-center rounded-,d border border-dashed py-6 text-center">
                    <UtensilsCrossed className="mb-2 size-10 opacity-50" />
                    <p>No serving units added yet</p>
                    <p className="text-sm">
                        Add serving units to help users measure this food
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {foodServingUnits.fields.map((field, index) => (
                        <div className="grid grid-cols-[1fr_1fr_auto] items-end gap-3" key={field.id}>
                            <div className="col-span-1 flex items-end">
                                <FormSelect<FoodSchema>
                                    label="Food Serving Unit"
                                    name={`foodServingUnits.${index}.foodServingUnitId`}
                                    options={servingUnitsQuery.data?.map((unit) => ({
                                        label: unit.name,
                                        value: unit.id
                                    }))}
                                    placeholder='Select unit...'
                                />
                                <ServingUnitForm smallTrigger />
                            </div>
                            <div>
                                <FormInput<FoodSchema>
                                    name={`foodServingUnits.${index}.grams`}
                                    label="Grams per Unit"
                                    type="number"
                                    placeholder="0"
                                />
                            </div>
                            <Button
                                size="icon"
                                variant="outline"
                                type="button"
                                onClick={() => {
                                    foodServingUnits.remove(index)
                                }}
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

export default SelectServingUnit