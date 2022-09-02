import Time from "./time.js";

// Create a Date() object for Christmas
let christmas = new Time([2021, 11, 25], {
  days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
});

document.addEventListener("time:add-years", (e) => {
  if (e.detail.amount > 3) e.preventDefault();
  console.log(e);
});

// Get some details
let day = christmas.getDay();
let month = christmas.getMonth();
console.log(day, month);

// Modify the date
let newYear = christmas.addDays(7).christmas.addYears(1);
console.log(newYear, christmas);
