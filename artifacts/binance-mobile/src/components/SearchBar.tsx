import { ScanLine, Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="px-3 pb-0.5 pt-0.5">
      <div className="flex h-11 items-center gap-2 rounded-lg bg-secondary px-3">
        <Search className="h-[17px] w-[17px] shrink-0 text-muted-foreground" />
        <input
          type="text"
          placeholder="Alphabet shares gain"
          aria-label="Search"
          className="min-w-0 flex-1 bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground outline-none"
        />
        <button type="button" aria-label="Scan code" className="flex h-11 w-11 shrink-0 items-center justify-center text-muted-foreground">
          <ScanLine className="h-[18px] w-[18px]" />
        </button>
      </div>
    </div>
  );
};
