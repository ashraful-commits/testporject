const dateFormat = (time) => {
  const date = new Date(time);
  console.log(time);
  if (isNaN(date)) {
    return "Invalid Date"; // Handle invalid date input
  }

  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export default dateFormat;
