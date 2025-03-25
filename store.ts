import { create } from "zustand";

type OrderDirection = "asc" | "desc";

type ContactQueryStore = {
  orderBy: string;
  orderDirection: OrderDirection;
  setOrder: (orderBy: string) => void;
  searchText: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setSearch: (searchText: string) => void;
};

const useContactStore = create<ContactQueryStore>()((set, get) => ({
  orderBy: "firstName",
  orderDirection: "asc",
  searchText: "",
  currentPage: 1,

  setOrder: (orderBy) => {
    const currentOrderBy = get().orderBy;
    const currentDirection = get().orderDirection;

    if (orderBy === currentOrderBy) {
      set({ orderDirection: currentDirection === "asc" ? "desc" : "asc" });
    } else {
      set({ orderBy, orderDirection: "asc" });
    }
  },

  setSearch: (search) => set({ searchText: search }),
  setCurrentPage: (page) => set({ currentPage: page }),
}));

export default useContactStore;
