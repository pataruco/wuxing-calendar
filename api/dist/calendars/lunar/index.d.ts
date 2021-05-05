import '../../lib/date';
import { GetElement, Calendars } from '../../../@types';
declare const getLunarElement: ({ date, exact, }: Omit<GetElement, 'hemisphere'>) => Calendars['lunar'];
export default getLunarElement;
