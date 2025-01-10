import { format } from "date-fns";

export const formatEntryValue = (value: unknown): string => {
  // Handle null/undefined
  if (value == null) {
    return "";
  }

  // Handle date strings
  if (typeof value === "string") {
    const date = new Date(value);
    const year = date.getFullYear();
    if (!isNaN(date.getTime()) && year >= 1980 && year <= 2050) {
      return format(date, "dd MMM yyyy");
    }
    return String(value);
  }

  // Handle Date objects
  if (typeof value === "object" && value instanceof Date) {
    return format(value, "dd MMM yyyy");
  }

  // Handle objects
  if (typeof value === "object") {
    return "";
  }

  return String(value);
};
