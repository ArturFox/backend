import { create } from "zustand";

interface CategoriesState {
  visibleCategories: Record<string, boolean>; 
  setCategoryInView: (name: string, inView: boolean) => void;
}

export const useCategoriesStore = create<CategoriesState>((set) => ({
  visibleCategories: {},
  setCategoryInView: (name, inView) =>
    set((state) => ({
      visibleCategories: {
        ...state.visibleCategories,      
        [name]: inView,                  
      },
      
    })),
}));
