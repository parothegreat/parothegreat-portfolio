import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export const formatDate = (date: string, type = 'MMMM dd, yyyy') => {
  if (!date) {
    return '';
  }

  const formattedDate = format(
    utcToZonedTime(parseISO(date), 'Asia/Jakarta'),
    type,
  );
  return formattedDate;
};
