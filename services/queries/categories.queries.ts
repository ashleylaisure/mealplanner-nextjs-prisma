import { useQuery } from "@tanstack/react-query"
import { getCategories, getCategory } from "../categories.services"
import useCategoriesStore from "@/lib/state/useCategoriesStore"

const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: getCategories
    })
}

const useCategory = () => {
    const selectedCategoryId = useCategoriesStore(state => state.selectedCategoryId)
    
    return useQuery({
        queryKey: ['categories', {selectedCategoryId}],
        queryFn: () => getCategory(selectedCategoryId!),
        enabled: !!selectedCategoryId,
    })
}

export { useCategories, useCategory }