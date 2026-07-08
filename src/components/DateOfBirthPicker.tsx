import { useEffect, useMemo, useState } from "react";
import { format, isValid, parse, subYears } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";

const DOB_FORMAT = "dd/MM/yyyy";
const MIN_BIRTH_YEAR = 1900;

type DateOfBirthPickerProps = {
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
  id?: string;
};

function parseDob(value: string): Date | undefined {
  if (!value) return undefined;
  const parsed = parse(value, DOB_FORMAT, new Date());
  return isValid(parsed) ? parsed : undefined;
}

const getDayGridClassNames = (isMobile: boolean) => ({
  months: "flex w-full flex-col",
  month: "w-full space-y-2",
  caption: "hidden",
  nav: "hidden",
  caption_label: "hidden",
  table: "w-full border-collapse",
  head_row: "flex w-full",
  head_cell: cn(
    "font-sans font-medium uppercase tracking-wide text-muted-foreground",
    isMobile
      ? "flex-1 text-center text-[0.65rem] sm:text-[0.7rem]"
      : "w-10 rounded-md text-[0.7rem]"
  ),
  row: "mt-1 flex w-full",
  cell: cn(
    "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:rounded-md [&:has([aria-selected])]:bg-accent/15",
    isMobile ? "flex-1" : "h-10 w-10"
  ),
  day: cn(
    "rounded-md p-0 font-sans transition-colors hover:bg-secondary hover:text-foreground aria-selected:opacity-100",
    isMobile
      ? "mx-auto flex h-10 w-10 max-h-10 max-w-10 items-center justify-center text-sm sm:h-9 sm:w-9"
      : "inline-flex h-10 w-10 items-center justify-center text-sm"
  ),
  day_selected:
    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
  day_today: "bg-accent/20 font-medium text-accent",
  day_outside: "text-muted-foreground opacity-40",
  day_disabled: "text-muted-foreground opacity-30",
});

type BirthCalendarProps = {
  selectedDate?: Date;
  onSelect: (date: Date | undefined) => void;
  today: Date;
  isMobile: boolean;
  isOpen: boolean;
};

const MONTHS = Array.from({ length: 12 }, (_, index) => ({
  value: String(index),
  label: format(new Date(2000, index, 1), "MMMM"),
}));

const BirthCalendar = ({
  selectedDate,
  onSelect,
  today,
  isMobile,
  isOpen,
}: BirthCalendarProps) => {
  const defaultViewDate = selectedDate ?? subYears(today, 25);
  const [viewDate, setViewDate] = useState(defaultViewDate);

  const years = useMemo(() => {
    const currentYear = today.getFullYear();
    return Array.from(
      { length: currentYear - MIN_BIRTH_YEAR + 1 },
      (_, index) => currentYear - index
    );
  }, [today]);

  useEffect(() => {
    if (!isOpen) return;
    setViewDate(selectedDate ?? subYears(today, 25));
  }, [isOpen, selectedDate, today]);

  const handleMonthChange = (monthValue: string) => {
    const month = Number(monthValue);
    setViewDate(new Date(viewDate.getFullYear(), month, 1));
  };

  const handleYearChange = (yearValue: string) => {
    const year = Number(yearValue);
    setViewDate(new Date(year, viewDate.getMonth(), 1));
  };

  return (
    <div className="space-y-3">
      <div
        className={cn(
          "grid gap-2",
          isMobile ? "grid-cols-[1.4fr_1fr]" : "grid-cols-[1.4fr_1fr]"
        )}
      >
        <div className="space-y-1.5">
          <p className="px-0.5 text-xs font-medium text-muted-foreground">Month</p>
          <Select value={String(viewDate.getMonth())} onValueChange={handleMonthChange}>
            <SelectTrigger className="h-10 bg-background">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent className="max-h-72">
              {MONTHS.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <p className="px-0.5 text-xs font-medium text-muted-foreground">Year</p>
          <Select value={String(viewDate.getFullYear())} onValueChange={handleYearChange}>
            <SelectTrigger className="h-10 bg-background">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent className="max-h-72">
              {years.map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1.5">
        <p className="px-0.5 text-xs font-medium text-muted-foreground">Day</p>
        <Calendar
          mode="single"
          month={viewDate}
          onMonthChange={setViewDate}
          selected={selectedDate}
          onSelect={onSelect}
          disabled={(date) =>
            date > today || date < new Date(MIN_BIRTH_YEAR, 0, 1)
          }
          showOutsideDays={false}
          className={cn(
            "w-full rounded-md bg-popover p-1.5",
            isMobile ? "min-w-0" : "min-w-[18.5rem]"
          )}
          classNames={getDayGridClassNames(isMobile)}
        />
      </div>
    </div>
  );
};

const DateOfBirthPicker = ({ value, onChange, hasError, id }: DateOfBirthPickerProps) => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const selectedDate = parseDob(value);
  const today = new Date();

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;
    onChange(format(date, DOB_FORMAT));
    setOpen(false);
  };

  const displayValue = selectedDate
    ? format(selectedDate, DOB_FORMAT)
    : "Select date of birth";

  const trigger = (
    <Button
      id={id}
      type="button"
      variant="outline"
      className={cn(
        "h-10 w-full min-w-0 justify-start gap-2 px-2.5 text-left font-normal hover:bg-background sm:px-3",
        !value && "text-muted-foreground",
        hasError && "border-destructive"
      )}
    >
      <CalendarIcon className="h-4 w-4 shrink-0 text-accent opacity-80" />
      <span className="min-w-0 flex-1 truncate text-sm">{displayValue}</span>
    </Button>
  );

  const calendar = (
    <BirthCalendar
      selectedDate={selectedDate}
      onSelect={handleSelect}
      today={today}
      isMobile={isMobile}
      isOpen={open}
    />
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent className="border-border bg-popover px-0 pb-6">
          <DrawerHeader className="px-4 pb-2 pt-2 text-center">
            <DrawerTitle className="font-serif text-xl font-medium text-foreground">
              Date of birth
            </DrawerTitle>
          </DrawerHeader>
          <div className="flex w-full justify-center px-3 sm:px-4">
            <div className="w-full max-w-sm">{calendar}</div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        className="w-auto min-w-[18.5rem] border-border bg-popover p-4 shadow-md"
        align="start"
        sideOffset={4}
        collisionPadding={16}
      >
        {calendar}
      </PopoverContent>
    </Popover>
  );
};

export default DateOfBirthPicker;
