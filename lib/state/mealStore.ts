import { mealFilterDefaultValues, MealFilterSchema } from "@/types/schema/mealFilterSchema";
import { createStore } from "./createStore";


type State = {
    selectedMealId: number | null;
    mealDialogOpen: boolean;
    mealFilters: MealFilterSchema;
}

type Actions = {
    updateSelectedMealId: (id: State["selectedMealId"]) => void;
    updateMealDialogOpen: (isOpen: boolean) => void;
    updateMealFilters: (filters: MealFilterSchema) => void;
}

type Store = State & Actions;

const useMealsStore = createStore<Store>((set) => ({
    selectedMealId: null,
    mealDialogOpen: false,
    mealFilters: mealFilterDefaultValues,

    updateSelectedMealId: (id) => set({ selectedMealId: id }),
    updateMealDialogOpen: (isOpen) => set({ mealDialogOpen: isOpen }),
    updateMealFilters: (filters) => set({ mealFilters: filters }),
}),
    { name: "meals-store" }
);

export default useMealsStore;
