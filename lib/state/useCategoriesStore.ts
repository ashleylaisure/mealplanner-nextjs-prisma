import { createStore } from "./createStore";

type State = {
    selectedCategoryId: number | null;
    categoryDialogOpen: boolean;
}

type Action = {
    updateSelectedCategoryId: (id: State['selectedCategoryId']) => void;
    updateCategoryDialogOpen: (open: State['categoryDialogOpen']) => void;
}

type Store = State & Action;

const useCategoriesStore = createStore<Store>((set) => ({
    selectedCategoryId: null,
    categoryDialogOpen: false,
    updateSelectedCategoryId: (id) => set((state) => { state.selectedCategoryId = id }),
    updateCategoryDialogOpen: (open) => set((state) => { state.categoryDialogOpen = open }),
}), {
    name: "categories-store",
});

export default useCategoriesStore;