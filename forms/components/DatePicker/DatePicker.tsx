import { FC, useEffect, useState } from 'react'
import { IField } from '@forms/generate/types/IField'
import styled from '@emotion/styled'
import classnames from 'classnames'
import { Calendar, DateObject } from 'react-multi-date-picker'

import { Menu } from '@mui/material'
import { Input } from '@admixltd/admix-component-library'
import { IDatePicker } from './IDatePicker'

const DatePicker: FC<IField> = ({ field, index, handleChange, value, error }) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	field = field as IDatePicker
	const { placeholder, ...other } = field.props ?? {}
	const { name = '' } = field
	const [dateValue, setDateValue] = useState(value ?? other?.range ? [''] : '')

	const getCalendarValue = (calendarVal: string | string[]) => {
		if (Array.isArray(calendarVal)) {
			const formattedDates = calendarVal.map(val => new DateObject(val))
			return formattedDates
		}
		return new DateObject(calendarVal)
	}

	useEffect(() => {
		if (!value) setDateValue(other?.range ? [''] : '')
	}, [value])

	return (
		<DatePickerContainer className={classnames({ hasError: !!error })}>
			<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
				<Calendar
					value={getCalendarValue(value as string | string[])}
					name={name}
					{...other}
					key={`${name}_${index}`}
					onChange={(date: DateObject | DateObject[]) => {
						if (Array.isArray(date)) {
							const formattedDates = date.map(dateObj => dateObj.format())
							handleChange(name, formattedDates)
							setDateValue(formattedDates)
						} else {
							handleChange(name, date.format())
							setDateValue(date.format())
						}
					}}
				/>
			</Menu>
			<Input
				readOnly
				value={dateValue}
				placeholder={placeholder}
				onClick={e => {
					e.stopPropagation()
					setAnchorEl(e.currentTarget)
				}}
				error={error}
			/>
		</DatePickerContainer>
	)
}

const DatePickerContainer = styled.div``

export default DatePicker
