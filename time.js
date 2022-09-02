/**
 *
 * @param {String} type The event type
 * @param {Object} detail Any details to pass along with the event
 * @param {Node} elem The element to attach the event to
 * @returns
 */
function emitEvent(type, detail = {}, elem = document) {
  if (!type) return;

  let event = new CustomEvent(type, {
    bubbles: true,
    cancelable: true,
    detail: detail,
  });

  return elem.dispatchEvent(event);
}

function Constructor(date, options = {}) {
  if (!Array.isArray(date)) {
    date = [date];
  }

  let settings = Object.assign(
    {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },
    options
  );

  Object.freeze(settings);

  Object.defineProperties(this, {
    date: {
      value: new Date(...date),
    },
    settings: {
      value: settings,
    },
  });
}

/**
 * Get the day of the week
 * @param {Date} date
 * @returns {String}
 */
Constructor.prototype.getDay = function () {
  return this.settings.days[this.date.getDay()];
};

/**
 * Get the month of the year
 * @param  {Date}   date  The date object
 * @return {String}       The month of the year
 */
Constructor.prototype.getMonth = function () {
  return this.settings.months[this.date.getMonth()];
};

/**
 * Add days to a date
 * @param {Date}    date The date object
 * @param {Integer} n    The number of days to add
 */
Constructor.prototype.addDays = function (n) {
  let d = new Date(this.date);
  d.setDate(d.getDate() + n);
  return new Constructor(d);
};

/**
 * Add months to a date
 * @param {Date}    date The date object
 * @param {Integer} n    The number of months to add
 */
Constructor.prototype.addMonths = function (n) {
  let d = new Date(this.date);
  d.setMonth(d.getMonth() + n);
  return new Constructor(d);
};

/**
 * Add years to a date
 * @param {Date}    date The date object
 * @param {Integer} n    The number of years to add
 */
Constructor.prototype.addYears = function (n) {
  let d = new Date(this.date);
  d.setFullYear(d.getFullYear() + n);
  let c = new Constructor(d);
  let cancel = !emitEvent("time:add-years", { amount: n, time: c });
  if (cancel) {
    return this;
  }
  return c;
};

export default Constructor;
