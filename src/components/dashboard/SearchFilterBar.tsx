import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SearchFilterBarProps {
  onSearch?: (query: string) => void;
  onFilter?: (filters: string[]) => void;
  filters?: string[];
}

const SearchFilterBar = ({
  onSearch = () => {},
  onFilter = () => {},
  filters = ["Classes", "Apps", "Active", "Inactive"],
}: SearchFilterBarProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterChange = (filter: string) => {
    const updatedFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter((f) => f !== filter)
      : [...selectedFilters, filter];

    setSelectedFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  return (
    <div className="w-full bg-background p-4 border-b flex items-center gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search classes or apps..."
          value={searchQuery}
          onChange={handleSearch}
          className="pl-10"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {filters.map((filter) => (
            <DropdownMenuCheckboxItem
              key={filter}
              checked={selectedFilters.includes(filter)}
              onCheckedChange={() => handleFilterChange(filter)}
            >
              {filter}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SearchFilterBar;
