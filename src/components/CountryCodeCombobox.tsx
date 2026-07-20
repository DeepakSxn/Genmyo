import { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface CountryCode {
  code: string;
  flag: string;
  country: string;
}

interface CountryCodeComboboxProps {
  countries: CountryCode[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  hasError?: boolean;
}

const CountryCodeCombobox = ({
  countries,
  value,
  onChange,
  placeholder = "Country code",
  ariaLabel = "Country code",
  hasError = false,
}: CountryCodeComboboxProps) => {
  const [open, setOpen] = useState(false);
  const selected = countries.find(
    (c) => c.code.trim() === value.trim() || c.code === value
  );

  const handleSelect = (code: string) => {
    onChange(code.trim());
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label={ariaLabel}
          suppressHydrationWarning
          className={cn(
            "w-full justify-between font-normal px-3",
            !selected && "text-muted-foreground",
            hasError && "border-destructive"
          )}
        >
          {selected ? (
            <span className="inline-flex items-center gap-1.5 truncate">
              <span aria-hidden>{selected.flag}</span>
              <span className="font-medium text-foreground">{selected.code.trim()}</span>
            </span>
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0" align="start">
        <Command
          filter={(itemValue, search) => {
            if (!search) return 1;
            const cleanSearch = search.toLowerCase().trim().replace(/^\+/, "");
            const cleanItem = itemValue.toLowerCase();
            return cleanItem.includes(cleanSearch) ? 1 : 0;
          }}
        >
          <CommandInput placeholder="Search country or code..." />
          <CommandList className="max-h-[240px] overflow-y-auto">
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countries.map((c) => {
                const codeClean = c.code.trim();
                const searchValue = `${c.country} ${codeClean} ${codeClean.replace("+", "")}`;
                const isSelected = selected?.country === c.country && selected?.code.trim() === codeClean;

                return (
                  <CommandItem
                    key={`${c.country}-${codeClean}`}
                    value={searchValue}
                    onSelect={() => handleSelect(codeClean)}
                    onClick={() => handleSelect(codeClean)}
                    className="cursor-pointer py-2 px-2 text-xs"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-3.5 w-3.5 shrink-0",
                        isSelected ? "opacity-100 text-[#B0703E]" : "opacity-0"
                      )}
                    />
                    <span className="inline-flex items-center gap-2 text-foreground truncate">
                      <span aria-hidden>{c.flag}</span>
                      <span className="font-semibold">{codeClean}</span>
                      <span className="text-muted-foreground truncate">{c.country}</span>
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CountryCodeCombobox;
