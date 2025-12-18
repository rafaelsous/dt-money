export function uniqueById<T extends { id: number | string }>(items: T[]): T[] {
  const map = new Map<T["id"], T>();

  items.forEach((item) => {
    map.set(item.id, item);
  });

  return Array.from(map.values());
}
