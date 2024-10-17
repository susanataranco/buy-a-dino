import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiltersDinosProps } from "./FiltersDinos.types";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FilterDinos(props: FiltersDinosProps) {
  const { clearFilters, setFilters, filters } = props;

  const handleFilter = (filter: string, value: string) => {
    setFilters(filter, value);
  };

  return (
    <div className="mt-5 mb-8 flex flex-col space-y-2 md:flex-row md:space-y-0 md:gap-5">
      <Select
        onValueChange={(value) => handleFilter("species", value)}
        value={filters.species}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Species" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Species</SelectLabel>
            <SelectItem value="Velociraptor Mongoliensis">Velociraptor Mongoliensis</SelectItem>
            <SelectItem value="Pachycephalosaurus wyomingensis">Pachycephalosaurus wyomingensis</SelectItem>
            <SelectItem value="Stegosaurus stenops">Stegosaurus stenops</SelectItem>
            <SelectItem value="Baryonyx walkeri">Baryonyx walkeri</SelectItem>
            <SelectItem value="Triceratops horridus">Triceratops horridus</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => handleFilter("period", value)}
        value={filters.period}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Period" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Period</SelectLabel>
            <SelectItem value="Late Cretaceous">Late Cretaceous</SelectItem>
            <SelectItem value="Late Jurassic">Late Jurassic</SelectItem>
            <SelectItem value="Early Cretaceous">Early Cretaceous</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => handleFilter("foundIn", value)}
        value={filters.foundIn}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Found in" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Found in</SelectLabel>
            <SelectItem value="Mongolia">Mongolia</SelectItem>
            <SelectItem value="North America">North America</SelectItem>
            <SelectItem value="Western United States">Western United States</SelectItem>
            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button onClick={clearFilters}>
        Remove filters <Trash className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}