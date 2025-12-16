import dayjs from "@/lib/dayjs";

export function formatDateTime(
  value: Date | string,
  format: string = "DD/MM/YYYY HH:mm"
): string | null {
  if (!value?.toString().trim()) {
    return null;
  }

  return dayjs(value).format(format);
}
