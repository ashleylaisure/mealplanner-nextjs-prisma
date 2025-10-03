import { MealSchema } from "@/types/schema/mealSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMeal, deleteMeal, getMeal, getMeals, updateMeal } from "../meal.services";
import { toast } from "sonner";
import useMealsStore from "@/lib/state/mealStore";


const useCreateMeal = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: MealSchema) => {
            await createMeal(data);
        },
        onSuccess: () => {
            toast.success("Meal created successfully.")
            queryClient.invalidateQueries({ queryKey: ["meals"] })
        },
    })
}

const useUpdatemeal = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (data: MealSchema) => {
            await updateMeal(data);
        },
        onSuccess: () => {
            toast.success("Meal updated successfully.")
            queryClient.invalidateQueries({ queryKey: ["meals"] })
        },
    })
}

const useDeleteMeal = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (id: number) => {
            await deleteMeal(id);
        },
        onSuccess: () => {
            toast.success("Meal deleted successfully.")
            queryClient.invalidateQueries({ queryKey: ["meals"] })
        },
    })
}

const useMeals = () => {
    const { mealFilters } = useMealsStore();

    return useQuery({
        queryKey: ["meals", mealFilters],
        queryFn: async () => getMeals(mealFilters),
    })
}

const useMeal = () => {
    const { selectedMealId } = useMealsStore();

    return useQuery({
        queryKey: ["meals", selectedMealId],
        queryFn: async () => getMeal(selectedMealId!),
        enabled: !!selectedMealId,
    })
}

export {
    useCreateMeal,
    useUpdatemeal,
    useDeleteMeal,
    useMeals,
    useMeal,
}