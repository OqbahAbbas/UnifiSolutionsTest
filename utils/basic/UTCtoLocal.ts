import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import getLabels from '@helpers/getLabels'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat)

const UTCtoLocal = (value: number) => {
	if (!value) return '-'
	const { yesterday: yesterdayLabel } = getLabels().global
	const date = dayjs.unix(value)
	const localDateTime = date.utc().local()

	let formattedLocalDateTime

	const today = dayjs().startOf('day')
	const yesterday = today.subtract(1, 'day')

	if (localDateTime.isSame(today, 'day')) {
		formattedLocalDateTime = localDateTime.format('h:mm A')
	} else if (localDateTime.isSame(yesterday, 'day')) {
		formattedLocalDateTime = `${yesterdayLabel} ${localDateTime.format('h:mm A')}`
	} else {
		formattedLocalDateTime = localDateTime.format('YYYY-MM-DD h:mm A')
	}

	return formattedLocalDateTime
}

export default UTCtoLocal
