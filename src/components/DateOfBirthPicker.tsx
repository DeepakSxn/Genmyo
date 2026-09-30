import { useEffect, useMemo, useState } from "react";
import { format, getDaysInMonth, isValid, parse } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/** Mirror expects dd/MM/yyyy */
const DOB_FORMAT = "dd/MM/yyyy";
const MIN_BIRTH_YEAR = 1920;

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

const MONTHS = Array.from({ length: 12 }, (_, index) => ({
  value: String(index + 1).padStart(2, "0"),
  label: format(new Date(2000, index, 1), "MMM"),
}));

/**
 * Year → month → day selects. Emits dd/MM/yyyy when all three are chosen.
 */
const DateOfBirthPicker = ({ value, onChange, hasError, id }: DateOfBirthPickerProps) => {
  const today = new Date();
  const selected = parseDob(value);

  const [year, setYear] = useState(() =>
    selected ? String(selected.getFullYear()) : ""
  );
  const [month, setMonth] = useState(() =>
    selected ? String(selected.getMonth() + 1).padStart(2, "0") : ""
  );
  const [day, setDay] = useState(() =>
    selected ? String(selected.getDate()).padStart(2, "0") : ""
  );

  useEffect(() => {
    const parsed = parseDob(value);
    if (!parsed) return;
    setYear(String(parsed.getFullYear()));
    setMonth(String(parsed.getMonth() + 1).padStart(2, "0"));
    setDay(String(parsed.getDate()).padStart(2, "0"));
  }, [value]);

  const years = useMemo(() => {
    const currentYear = today.getFullYear();
    const maxYear = currentYear - 13;
    return Array.from({ length: maxYear - MIN_BIRTH_YEAR + 1 }, (_, i) => maxYear - i);
  }, [today]);

  const daysInMonth = useMemo(() => {
    if (!year || !month) return 31;
    return getDaysInMonth(new Date(Number(year), Number(month) - 1));
  }, [year, month]);

  const days = useMemo(
    () =>
      Array.from({ length: daysInMonth }, (_, i) =>
        String(i + 1).padStart(2, "0")
      ),
    [daysInMonth]
  );

  const commitIfComplete = (nextYear: string, nextMonth: string, nextDay: string) => {
    if (!nextYear || !nextMonth || !nextDay) return;
    const maxDay = getDaysInMonth(new Date(Number(nextYear), Number(nextMonth) - 1));
    if (Number(nextDay) > maxDay) return;
    const date = new Date(Number(nextYear), Number(nextMonth) - 1, Number(nextDay));
    onChange(format(date, DOB_FORMAT));
  };

  const clampDay = (nextYear: string, nextMonth: string, nextDay: string) => {
    if (!nextDay || !nextYear || !nextMonth) return nextDay;
    const maxDay = getDaysInMonth(new Date(Number(nextYear), Number(nextMonth) - 1));
    if (Number(nextDay) > maxDay) return "";
    return nextDay;
  };

  const handleYearChange = (y: string) => {
    const nextDay = clampDay(y, month, day);
    setYear(y);
    if (nextDay !== day) setDay(nextDay);
    commitIfComplete(y, month, nextDay);
  };

  const handleMonthChange = (m: string) => {
    const nextDay = clampDay(year, m, day);
    setMonth(m);
    if (nextDay !== day) setDay(nextDay);
    commitIfComplete(year, m, nextDay);
  };

  const handleDayChange = (d: string) => {
    setDay(d);
    commitIfComplete(year, month, d);
  };

  const triggerClass = cn("h-10 bg-background", hasError && "border-destructive");

  return (
    <div id={id} className="grid grid-cols-3 gap-2">
      <Select value={year || undefined} onValueChange={handleYearChange}>
        <SelectTrigger className={triggerClass} aria-label="Birth year">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent className="max-h-72">
          {years.map((y) => (
            <SelectItem key={y} value={String(y)}>
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={month || undefined} onValueChange={handleMonthChange}>
        <SelectTrigger className={triggerClass} aria-label="Birth month">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent className="max-h-72">
          {MONTHS.map((m) => (
            <SelectItem key={m.value} value={m.value}>
              {m.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={day || undefined} onValueChange={handleDayChange}>
        <SelectTrigger className={triggerClass} aria-label="Birth day">
          <SelectValue placeholder="Day" />
        </SelectTrigger>
        <SelectContent className="max-h-72">
          {days.map((d) => (
            <SelectItem key={d} value={d}>
              {Number(d)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DateOfBirthPicker;
