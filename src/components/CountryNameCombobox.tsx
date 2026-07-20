import { useState } from "react";
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

export interface CountryOption {
  code: string;
  flag: string;
  country: string;
}

interface CountryNameComboboxProps {
  countries: CountryOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  hasError?: boolean;
  id?: string;
}

const CountryNameCombobox = ({
  countries,
  value,
  onChange,
  placeholder = "Select country",
  ariaLabel = "Country",
  hasError = false,
  id,
}: CountryNameComboboxProps) => {
  const [open, setOpen] = useState(false);
  const selected = countries.find((c) => c.country === value);

  const handleSelect = (countryName: string) => {
    onChange(countryName);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
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
            <span className="inline-flex items-center gap-2 truncate">
              <span aria-hidden>{selected.flag}</span>
              <span>{selected.country}</span>
            </span>
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] min-w-[240px] p-0" align="start">
        <Command
          filter={(itemValue, search) => {
            if (!search) return 1;
            return itemValue.toLowerCase().includes(search.toLowerCase().trim()) ? 1 : 0;
          }}
        >
          <CommandInput placeholder="Search country..." />
          <CommandList className="max-h-[240px] overflow-y-auto">
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countries.map((c) => (
                <CommandItem
                  key={`country-${c.country}`}
                  value={c.country}
                  onSelect={() => handleSelect(c.country)}
                  onClick={() => handleSelect(c.country)}
                  className="cursor-pointer py-2 px-2 text-xs"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 shrink-0",
                      selected?.country === c.country ? "opacity-100 text-[#B0703E]" : "opacity-0"
                    )}
                  />
                  <span className="inline-flex items-center gap-2 truncate">
                    <span aria-hidden>{c.flag}</span>
                    <span>{c.country}</span>
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CountryNameCombobox;
