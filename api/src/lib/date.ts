Date.prototype.addDays = function (days: number) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

Date.prototype.substractDays = function (days: number) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() - days);
  return date;
};
