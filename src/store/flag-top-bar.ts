import {create} from "zustand";

interface FlagTopBarType{
    flag: boolean;
    setFlag: (flag: boolean) => void
}

export const useFlagTopBarStore = create<FlagTopBarType>((set) => ({
  flag: false,
  setFlag: (flag: boolean) => set({ flag }),
}));