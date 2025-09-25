import { useQuery } from "@tanstack/react-query"
import { getCategories, getCategory } from "./services"

const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: getCategories
    })
}

const useCategory = () => {
    const selectedCategoryId = useCategoriesStore()
    
    return useQuery({
        queryKey: ['categories', {selectedCategoryId}],
        queryFn: () => getCategory(selectedCategoryId)
    })
}

export { useCategories, useCategory }