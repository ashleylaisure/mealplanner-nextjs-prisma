import { MealCards } from '@/components/cards/MealCards'
import { MealFilters } from '@/components/forms/MealFilters'
import MealForm from '@/components/forms/MealForm'
import React from 'react'

const MealsPage = () => {
    return (
        <>
            <div className="flex justify-between">
                <MealFilters />
                <MealForm />
            </div>
            <MealCards />
        </>
    )
}

export default MealsPage