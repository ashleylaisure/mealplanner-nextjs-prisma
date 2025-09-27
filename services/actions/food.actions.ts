import { useFoodsStore } from "@/lib/state/useFoodStore"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFood, deleteFood, getFood, getFoods, updateFood } from "../food.services";
import { FoodSchema } from "@/types/schema/foodSchema";
import { toast } from "sonner";

// QUERIES ----------------------------------
// READ (ALL, with filters)
const useFoods = () => {
    const { foodFilters } = useFoodsStore();

    return useQuery({
        queryKey: ["foods", foodFilters],
        queryFn: () => getFoods(foodFilters),
    })
}
// READ (ONE)
const useFood = () => {
    const { selectedFoodId } = useFoodsStore();

    return useQuery({
        queryKey: ["food", selectedFoodId],
        queryFn: () => getFood(selectedFoodId!),
        enabled: !!selectedFoodId,
    })
}

// MUTATIONS ----------------------------------
// CREATE
const useCreateFood = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: FoodSchema) => {
            await createFood(data);
        },
        onSuccess: () => {
            toast.success("Food created successfully.");
            queryClient.invalidateQueries({ queryKey: ["foods"] });
        },
    });
};

// UPDATE
const useUpdateFood = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: FoodSchema) => {
            await updateFood(data);
        },
        onSuccess: () => {
            toast.success("Food updated successfully.");
            queryClient.invalidateQueries({ queryKey: ["foods"] });
        },
    });
};

// DELETE
const useDeleteFood = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            await deleteFood(id);
        },
        onSuccess: () => {
            toast.success("Food deleted successfully.");
            queryClient.invalidateQueries({ queryKey: ["foods"] });
        },
    });
};

export { useFoods, useFood, useCreateFood, useUpdateFood, useDeleteFood };