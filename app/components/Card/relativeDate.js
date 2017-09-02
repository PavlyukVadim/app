// Takes an ISO time and returns a string representing how
// long ago the date represents.
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const relativeDate = (time) => {
  const date = new Date((time || '').replace(/-/g, '/').replace(/[TZ]/g, ' '));
  const diff = (((new Date()).getTime() - date.getTime()) / 1000);
  const dayDiff = Math.floor(diff / 86400);

  const currYear = (new Date()).getFullYear();  
  const dateYear = date.getFullYear();
  const dateMonth =  months[date.getMonth()];
  const dateDay = date.getDate();

  if (isNaN(dayDiff) || dayDiff < 0) {
    return;
  }

  if (dateYear !== currYear) {
    return `on ${dateDay} ${dateMonth} ${dateYear}`;
  }

  return dayDiff == 0 && (
    diff < 60 && 'just now' ||
    diff < 120 && '1 minute ago' ||
    diff < 3600 && Math.floor(diff / 60) + ' minutes ago' ||
    diff < 7200 && '1 hour ago' ||
    diff < 86400 && Math.floor(diff / 3600) + ' hours ago') ||
    dayDiff == 1 && 'a day ago' ||
    dayDiff < 7 && dayDiff + ' days ago' ||
    dayDiff < 31 && Math.ceil(dayDiff / 7) + ' weeks ago' ||
    `on ${dateDay} ${dateMonth}`;
}

export default relativeDate;
