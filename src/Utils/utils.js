export const notEmpty = function(obj) {
  return typeof obj === "string" && obj.trim().length > 0
}

export const empty = function(obj) {
  return !notEmpty(obj)
}
