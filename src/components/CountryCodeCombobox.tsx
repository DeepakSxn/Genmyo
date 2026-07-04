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
  placeholder = "Region code",
  ariaLabel = "Region code",
  hasError = false,
}: CountryCodeComboboxProps) => {
  const [open, setOpen] = useState(false);
  const selected = countries.find((c) => c.code.trim() === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label={ariaLabel}
          className={cn(
            "w-full justify-between font-normal",
            !selected && "text-muted-foreground",
            hasError && "border-destructive"
          )}
        >
          {selected ? (
            <span className="inline-flex items-center gap-2 truncate">
              <span aria-hidden>{selected.flag}</span>
              <span>{selected.code.trim()}</span>
            </span>
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[260px] p-0" align="start">
        <Command
          filter={(itemValue, search) =>
            itemValue.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
          }
        >
          <CommandInput placeholder="Search country or code..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countries.map((c) => (
                <CommandItem
                  key={`${c.country}-${c.code}`}
                  value={`${c.country} ${c.code.trim()}`}
                  onSelect={() => {
                    onChange(c.code.trim());
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected?.country === c.country ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="inline-flex items-center gap-2">
                    <span aria-hidden>{c.flag}</span>
                    <span>{c.code.trim()}</span>
                    <span className="text-muted-foreground">{c.country}</span>
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

export default CountryCodeCombobox;
