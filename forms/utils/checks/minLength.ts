import { ChecksType } from '@forms/utils/checks/types'

const minLength: ChecksType['minLength'] = (value, options = {}) => {
	const { value: min = -Infinity } = options
	if (!value) return
	if (`${value ?? ''}`.length >= Number(min)) return

	const { message = `Should be ${min} minimum characters long` } = options
	return typeof message === 'string' ? message : message(min)
}

export default minLength
