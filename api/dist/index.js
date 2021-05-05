'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const hour_1 = __importDefault(require('./calendars/hour'));
const lunar_1 = __importDefault(require('./calendars/lunar'));
const solar_1 = __importDefault(require('./calendars/solar'));
const getElements = ({ date, hemisphere = 'NORTHERN', exact = false }) => {
  const solar = solar_1.default({ date, hemisphere, exact });
  const lunar = lunar_1.default({ date, exact });
  const hour = hour_1.default(date);
  return {
    solar,
    lunar,
    hour,
  };
};
exports.default = getElements;
