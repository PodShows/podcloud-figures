const CheckAndParseSorting = sorting => {
  if (/^daily|monthly$/i.test(sorting)) {
    const sortingly = sorting.toLowerCase();
    const unitOfTime = sortingly === "daily" ? "day" : "month";
    return { sortingly, unitOfTime };
  }

  console.log(sorting);
  console.log(new Error().stack);
  throw new TypeError("sorting should be daily or monthly");
};

export default CheckAndParseSorting;
