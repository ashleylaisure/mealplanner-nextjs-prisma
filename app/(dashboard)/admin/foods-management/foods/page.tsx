import FoodForm from '@/components/forms/FoodForm'
import React from 'react'

const FoodsPage = () => {
    return (
        <div className="space-y-2">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-semibold">Foods List</h1>
                <FoodForm />
            </div>
            {/* Food Filters Drawer */}
            {/* FoodCards */}
        </div>
    )
}

export default FoodsPage