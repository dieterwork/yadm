export function booleanFromString(value: "true" | "false" | string) {
  return String(value).toLowerCase() === "true";
}
