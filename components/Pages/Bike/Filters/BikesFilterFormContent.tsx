import { Fields } from '@forms'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { useRecoilValue } from 'recoil'
import LabelsAtom from '@atoms/Labels'
import dataPrefix from './dataPrefix'

const BikesFiltersFormContent = () => {
	const labels = useRecoilValue(LabelsAtom).pages.bikes.filters
	const { colors } = useTheme()

	const { fields } = Fields(
		[
			{
				component: Container,
				sections: [
					{
						type: 'RegularInput',
						name: 'title',
						props: {
							label: labels.fields.title,
							placeholder: labels.fields.title,
						},
					},
					{
						type: 'NumericInput',
						name: 'distance',
						props: {
							label: labels.fields.distance.label,
							placeholder: labels.fields.distance.placeHolder,
						},
					},
					{
						type: 'DatePicker',
						name: 'theftDate',
						validation: ['required'],
						props: {
							placeholder: labels.fields.date,
							range: true,
							rangeHover: true,
						},
					},
				],
			},
		],
		{
			dataPrefix,
			extraProps: {
				input: {
					legendBackground: colors.seaBlue,
				},
			},
		}
	)
	return <div>{fields}</div>
}

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 16px;
	margin: 16px 0;
	${({ theme }) => theme.adaptive.md} {
		grid-template-columns: 1fr;
	}
`

export default BikesFiltersFormContent
