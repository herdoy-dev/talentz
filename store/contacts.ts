import { create } from "zustand";

type OrderDirection = "asc" | "desc";

type ContactQueryStore = {
  orderBy: string;
  orderDirection: OrderDirection;
  setOrder: (orderBy: string) => void;
  searchText: string;
  page: number;
  nextPage: () => void;
  previousPage: () => void;
  setSearch: (searchText: string) => void;
  setPage: (page: number) => void;
};

const useContactStore = create<ContactQueryStore>()((set, get) => ({
  orderBy: "firstName",
  orderDirection: "asc",
  searchText: "",
  page: 1,

  setOrder: (orderBy) => {
    const currentOrderBy = get().orderBy;
    const currentDirection = get().orderDirection;

    if (orderBy === currentOrderBy) {
      set({ orderDirection: currentDirection === "asc" ? "desc" : "asc" });
    } else {
      set({ orderBy, orderDirection: "asc" });
    }
  },
  setPage: (page) => set({ page }),
  setSearch: (search) => set({ searchText: search }),
  nextPage: () => set((store) => ({ page: store.page + 1 })),
  previousPage: () => set((store) => ({ page: store.page - 1 })),
}));

export default useContactStore;
