import { Button } from "./button";
import { Input } from "./input";
import { Filter, SearchIcon } from "lucide-react";

export function Search({
  searchQuery,
  setSearchQuery,
  placeholder = "Search...",
  children,
  ...props
}: React.ComponentProps<"div"> & {
  searchQuery: string;
  placeholder?: string;
  setSearchQuery: (value: string) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-2" {...props}>
      <div className="relative w-full">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {children}
      <Button variant="outline">
        <Filter className="size-4" />
        Filter
      </Button>
    </div>
  );
}
