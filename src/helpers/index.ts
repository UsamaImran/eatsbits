import { CONFIGS } from '@/configs';
import { CartItem } from '@/store/slices/cartSlice';
import { FoodItemOption } from '@/types';

export const getObjectKeys = <T extends object>(object: T) =>
  Object.keys(object) as (keyof T)[];

export const formatNumberToCurrency = (value: number) => {
  const trimNumber = +value.toFixed(2);
  const formattedValue = Intl.NumberFormat('en', {
    currency: 'USD',
    style: 'currency',
  }).format(trimNumber);
  return formattedValue;
};

export const getImageURL = (url: string) => `${CONFIGS.BUCKET_ENDPOINTL}${url}`;

export function formatTime(ms: number): string {
  const hours = Math.floor(ms / (1000 * 60 * 60))
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
    .toString()
    .padStart(2, '0');

  return `${hours}:${minutes}`;
}

export function convertToDayAbbreviation(str: string): string {
  if (!str) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1, 3).toLowerCase();
}

export function formatPhoneNumber(phoneNumberString: number) {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    var intlCode = match[1] ? '+1 ' : '';
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return null;
}

export const getToday = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date().getDay();
  return days[today];
};

export const sortByKey = <T>(array: T[], key: keyof T): T[] => {
  return [...array].sort((a, b) => {
    if (a[key] < b[key]) {
      return -1;
    } else if (a[key] > b[key]) {
      return 1;
    } else {
      return 0;
    }
  });
};

export const calculateCartTotal = (items: CartItem[]) => {
  const total = items.reduce((acc, item) => {
    return (
      acc +
      (+item.price +
        (item?.itemOptions
          ? item?.itemOptions?.reduce(
              (acc, item) =>
                acc +
                (item.itemOptionElements
                  ? item?.itemOptionElements?.reduce(
                      (acc, item) => acc + +item.price,
                      0
                    )
                  : 0),
              0
            )
          : 0)) *
        item.quantity
    );
  }, 0);

  return total;
};

export function areAllRequiredOptionsSelected(
  data: FoodItemOption[],
  selectedOptions: FoodItemOption[]
) {
  return data.every((option) => {
    if (option.isRequired) {
      return selectedOptions.some((selectedOption) => {
        return selectedOption.correlationId === option.correlationId;
      });
    }
    return true; // Non-required options are always considered selected
  });
}

export const trimSpaces = (str: string) => str.trim();

export function getFormattedDateTime(timestamp: number): {
  date: string;
  time: string;
} {
  const date = new Date(timestamp);

  const options = {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };

  const formattedDate = date.toLocaleDateString('en-US', options as any);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;

  const formattedTime = `${formattedHours}:${minutes
    .toString()
    .padStart(2, '0')} ${ampm}`;

  return {
    date: formattedDate,
    time: formattedTime,
  };
}

export function calculateTimeRange(label: string): {
  startTime: number;
  endTime: number;
} {
  const now = new Date();

  switch (label) {
    case 'Today':
      const todayStart = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );
      return {
        startTime: todayStart.getTime(),
        endTime: now.getTime(),
      };
    case 'Yesterday':
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const yesterdayStart = new Date(
        yesterday.getFullYear(),
        yesterday.getMonth(),
        yesterday.getDate()
      );
      return {
        startTime: yesterdayStart.getTime(),
        endTime: yesterday.getTime(),
      };
    case 'Last 7 Days':
      const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return {
        startTime: last7Days.getTime(),
        endTime: now.getTime(),
      };
    case 'Last 30 Days':
      const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      return {
        startTime: last30Days.getTime(),
        endTime: now.getTime(),
      };
    case 'Last Month':
      const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
      return {
        startTime: lastMonthStart.getTime(),
        endTime: lastMonthEnd.getTime(),
      };
    case 'Last 90 Days':
      const last90Days = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      return {
        startTime: last90Days.getTime(),
        endTime: now.getTime(),
      };
    case 'Last Year':
      const lastYearStart = new Date(now.getFullYear() - 1, 0, 1);
      const lastYearEnd = new Date(now.getFullYear() - 1, 11, 31);
      return {
        startTime: lastYearStart.getTime(),
        endTime: lastYearEnd.getTime(),
      };
    default:
      const year = parseInt(label);
      if (!isNaN(year)) {
        const yearStart = new Date(year, 0, 1);
        const yearEnd = new Date(year + 1, 0, 1);
        return {
          startTime: yearStart.getTime(),
          endTime: yearEnd.getTime() - 1, // Adjust to include the entire year
        };
      }
      return { startTime: 0, endTime: 0 };
  }
}

export function capitalizeFirstLetter(string: string) {
  return string.replace(/\b\w+/g, function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
}

export const generateYears = (startYear: number) => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = startYear; i < currentYear; i++) {
    years.push(i);
  }
  return years.sort((a, b) => b - a);
};
