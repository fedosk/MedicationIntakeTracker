import moment from 'moment';

export const convertTimeToDateTimeString = (timeString: string): string => {
  const dateTime = moment(timeString);
  return dateTime.isValid() ? dateTime.format('DD.MM.YYYY HH:mm') : '';
};
