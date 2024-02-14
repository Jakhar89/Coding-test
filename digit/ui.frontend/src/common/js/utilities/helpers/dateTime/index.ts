export const formatDate = (date) => new Intl.DateTimeFormat('en-AU').format(date);

export const formatDateUS = (date) => date.toLocaleDateString('fr-CA');

//Send date as it is, not formatted
export const calculateDays = (dateTo, dateFrom) => {
  const diffTime = Math.abs(dateTo - dateFrom);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

//Send date as it is, not formatted
export const calculateMonths = (dateTo, dateFrom, excludeByDate = false) => {
  //Exclude one month if dateTo of month is not greater than dateFrom of month
  const isPassedTheDayOfMonth = dateTo.getDate() - dateFrom.getDate() >= 0 ? 0 : -1;

  const initialMonthCount =
    dateTo.getMonth() - dateFrom.getMonth() + 12 * (dateTo.getFullYear() - dateFrom.getFullYear());

  return !excludeByDate ? initialMonthCount : initialMonthCount + isPassedTheDayOfMonth;
};

//Send date as it is, not formatted
export const calculateQuarters = (dateTo, dateFrom) => {
  const monthsRemaining = calculateMonths(dateTo, dateFrom);
  return Math.floor(monthsRemaining / 3);
};

export const calculateYears = (dateTo, dateFrom) => {
  return dateTo.getFullYear() - dateFrom.getFullYear();
};

export const calculateWeeks = (dateTo, dateFrom) => {
  const getDays = calculateDays(dateTo, dateFrom);
  return Math.floor(getDays / 7);
};

export const calculateFortnights = (dateTo, dateFrom) => {
  const getDays = calculateDays(dateTo, dateFrom);
  return Math.floor(getDays / 14);
};

export const addDaystoDate = (date, daysNumber) => {
  if (!date) return;
  const newDate = new Date(date.getTime());
  return newDate.setDate(newDate.getDate() + daysNumber);
};

//Send date as it is, not formatted
export const calculateMonthsFromStart = (startDate) => {
  const today = new Date();
  return calculateMonths(today, startDate, true); // Exclude based on date
};

//Send date as it is, not formatted
export const calculateFortnightsFromStart = (startDate) => {
  const today = new Date();
  return calculateFortnights(today, startDate);
};

export const calculateWeeksFromStart = (startDate) => {
  const today = new Date();
  return calculateWeeks(today, startDate);
};

export const formatLoginTimeStamp = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('en-AU') + ' ' + newDate.toLocaleTimeString('en-AU');
};
