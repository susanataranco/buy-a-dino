export type FiltersDinosProps = {
    setFilters: (filterName: string, filterValue: string) => void;
    clearFilters: () => void;
    filters: {
        period: string;
        species: string;
        foundIn: string;
    }
  };