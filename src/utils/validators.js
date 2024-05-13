export function isEmail(value) {
  return value != null && value.includes("@");
}

export function isNotEmpty(value) {
  return  value != null && value.trim() !== "";
}
