"use client";
import { Dino } from "@prisma/client";
import { useEffect, useState } from "react";
import { FiltersAndListDinosProps } from "./FiltersAndListDinos.types";
import { ListDinos } from "../ListDinos/ListDinos";
import { FilterDinos } from "../FiltersDinos";
import { normalizeString } from "@/utils/normalizeString";

export function FiltersAndListDinos(props: FiltersAndListDinosProps) {
  const { dinos } = props;
  const [filteredDinos, setFilteredDinos] = useState<Dino[]>();
  const [filters, setFilters] = useState({
    period: "",
    species: "",
    foundIn: "",
  });

  useEffect(() => {
    let filtered = dinos;

    if (filters.period) {
      filtered = filtered.filter((dino) =>
        normalizeString(dino.period).includes(normalizeString(filters.period))
      );
    }
    if (filters.species) {
      filtered = filtered.filter((dino) =>
        normalizeString(dino.species).includes(normalizeString(filters.species))
      );
    }
    if (filters.foundIn) {
      filtered = filtered.filter((dino) => 
        normalizeString(dino.foundIn).includes(normalizeString(filters.foundIn))
    );
    }
    
    setFilteredDinos(filtered);
  }, [filters, dinos]);

  const handleFilterChange = (filterName: string, filterValue: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: filterValue,
    }));
  };

  const clearFilters = () => {
    setFilters({
        period: "",
        species: "",
        foundIn: "",
    });
  };
  return (
    <div>
      <FilterDinos
        setFilters={handleFilterChange}
        filters={filters}
        clearFilters={clearFilters}
      />
      <ListDinos dinos={filteredDinos} />
    </div>
  );
}