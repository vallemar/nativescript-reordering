import dayjs from 'dayjs'
import { DAY_DATE_FORMAT } from './mockData';

export function getShowDays() {
    const days = []

    for (let index = 0; index < 5; index++) {
        days.push({
            date: dayjs().subtract(index, 'day').format(DAY_DATE_FORMAT),
            dayWeekName: dayjs().subtract(index, 'day').format('dd')
        })
    }
    return days;
}

export const getTodayDayFormat = () => dayjs().format(DAY_DATE_FORMAT);