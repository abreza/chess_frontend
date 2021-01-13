import jMoment from 'jalali-moment';
import moment from 'moment';

import getLocale from './getLocale';
import translateNumber from './translateNumber';

export const dateTypes = {
  JALALI: 'JALALI',
  GREGORIAN: 'GREGORIAN',
};

const defaultType = {
  fa: dateTypes.JALALI,
  en: dateTypes.GREGORIAN,
};

export const dateFormatter = ({
  date = Date.now(),
  lang = getLocale(),
  type = defaultType[lang],
  format = 'YYYY/MM/DD',
}) => {
  let enResult;
  switch (type) {
    case dateTypes.JALALI:
      enResult = jMoment(date).locale('fa').format(format);
      break;
    case dateTypes.GREGORIAN:
    default:
      enResult = moment(date).format(format);
  }
  return translateNumber({ lang, num: enResult });
};

export const dateFormatterDay = (item) => {
  let date = new Date(item),
    lang = getLocale();

  let enResult;
  switch (defaultType[lang]) {
    case dateTypes.JALALI:
      enResult = jMoment(date).locale('fa').format('ddd DD MMMM');
      break;
    case dateTypes.GREGORIAN:
    default:
      enResult = moment(date).format('ddd DD MMMM');
  }
  return translateNumber({ lang, num: enResult });
};
