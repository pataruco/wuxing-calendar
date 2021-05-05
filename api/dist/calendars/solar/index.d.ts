import '../../lib/date';
import { GetElement, Calendars } from '../../../@types';
declare const getSolarElement: ({ date, hemisphere, exact, }: GetElement) => Calendars['solar'];
export default getSolarElement;
