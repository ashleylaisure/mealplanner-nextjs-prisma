import React from 'react'
import CategoryCards from '@/components/cards/CategoryCards';
import CategoryForm from '@/components/forms/CategoryForm';

const CategoriesPage = () => {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Categories List</h1>
        <CategoryForm />
      </div>
      <CategoryCards />
    </>
  )
}

export default CategoriesPage