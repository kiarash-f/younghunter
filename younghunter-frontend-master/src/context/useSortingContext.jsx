import { createContext, useContext, useState } from "react";

const SortingContext = createContext()

export default function SortingProvider({ children }) {
    const [sortOption, setSortOption] = useState("new")

    return (
        <SortingContext.Provider value={{ sortOption, setSortOption }}>
            {children}
        </SortingContext.Provider>
    )
}

export function useSorting() {
    const context = useContext(SortingContext)
    return context
}