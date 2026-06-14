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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export type CountryOption = {
  id: string;
  code: string;
  flag: string;
  country: string;
};

type SearchableCountrySelectProps = {
  options: CountryOption[];
  value: string;
  onValueChange: (value: string) => void;
  variant: "countryCode" | "country";
  placeholder: string;
  searchPlaceholder: string;
  hasError?: boolean;
  id?: string;
  "aria-label"?: string;
  className?: string;
};

const SearchableCountrySelect = ({
  options,
  value,
  onValueChange,
  variant,
  placeholder,
  searchPlaceholder,
  hasError,
  id,
  "aria-label": ariaLabel,
  className,
}: SearchableCountrySelectProps) => {
  const [open, setOpen] = useState(false);

  const selected =
    variant === "countryCode"
      ? options.find((o) => o.id === value)
      : options.find((o) => o.country === value);

  const displayLabel = () => {
    if (!selected) return placeholder;
    if (variant === "countryCode") {
      return (
        <span className="inline-flex min-w-0 items-center gap-1.5 sm:gap-2">
          <span aria-hidden className="shrink-0">
            {selected.flag}
          </span>
          <span className="shrink-0">{selected.code}</span>
          <span className="hidden min-w-0 truncate text-muted-foreground sm:inline">
            {selected.country}
          </span>
        </span>
      );
    }
    return (
      <span className="inline-flex min-w-0 items-center gap-2">
        <span aria-hidden className="shrink-0">
          {selected.flag}
        </span>
        <span className="truncate">{selected.country}</span>
      </span>
    );
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
          className={cn(
            "h-10 w-full min-w-0 justify-between gap-2 px-2.5 font-normal hover:bg-background sm:px-3",
            !value && "text-muted-foreground",
            hasError && "border-destructive",
            className
          )}
        >
          <span className="min-w-0 flex-1 truncate text-left text-sm">{displayLabel()}</span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] min-w-[min(calc(100vw-2rem),20rem)] max-w-[calc(100vw-2rem)] p-0 sm:max-w-none"
        align="start"
        sideOffset={4}
        collisionPadding={16}
      >
        <Command className="w-full">
          <CommandInput placeholder={searchPlaceholder} className="h-10 text-sm" />
          <CommandList className="max-h-[min(50vh,18.75rem)]">
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const itemValue = `${option.country} ${option.code} ${option.code.replace("+", "")}`;
                const isSelected =
                  variant === "countryCode"
                    ? value === option.id
                    : value === option.country;

                return (
                  <CommandItem
                    key={variant === "countryCode" ? option.id : `country-${option.country}`}
                    value={itemValue}
                    className="items-start py-2.5 sm:items-center sm:py-1.5"
                    onSelect={() => {
                      onValueChange(
                        variant === "countryCode" ? option.id : option.country
                      );
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 mt-0.5 h-4 w-4 shrink-0 sm:mt-0",
                        isSelected ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span className="inline-flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span aria-hidden className="shrink-0">
                        {option.flag}
                      </span>
                      {variant === "countryCode" ? (
                        <>
                          <span className="shrink-0 font-medium">{option.code}</span>
                          <span className="min-w-0 text-muted-foreground">{option.country}</span>
                        </>
                      ) : (
                        <span className="min-w-0">{option.country}</span>
                      )}
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

export default SearchableCountrySelect;
