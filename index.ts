import moment from "moment";

const INITIAL_TIME_START = 3600; // seconds in hour
const INTERVAL_PARTIAL_TIME = 60;

const getSeconds = (dateSubject: string): number => {
  return moment(dateSubject, "HH:mm:ss: A").diff(
    moment().startOf("day"),
    "seconds"
  );
};

const sum = (...dates: string[]): number[] => {
  let currentBaseTime = INITIAL_TIME_START;
  let totalSeconds = dates.map(getSeconds).reduce((a, b) => a + b);
  return Array.from({ length: 3 }).map((_) => {
    const integerResult = Math.trunc(totalSeconds / currentBaseTime);
    totalSeconds = totalSeconds - integerResult * currentBaseTime;
    currentBaseTime = currentBaseTime / INTERVAL_PARTIAL_TIME;
    return integerResult;
  });
};

console.log(
  sum("12:10:12: PM", "12:29:12: PM", "14:10:24: PM", "12:10:12: PM")
);
