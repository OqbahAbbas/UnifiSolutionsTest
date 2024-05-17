import { Fields } from '@forms'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { useRecoilValue } from 'recoil'
import LabelsAtom from '@atoms/Labels'
import dataPrefix from './dataPrefix'
import GetCountryFormContent from '../../Edit/FormContent/GetCountryFormContent'

const CityFiltersFormContent = () => {
	const { status } = useRecoilValue(LabelsAtom).pages.geo.cities.filters.fields
	const { colors } = useTheme()

	const { fields } = Fields(
		[
			{
				component: Container,
				sections: [
					{
						type: 'AutocompleteSingleAsync',
						name: 'isActive',
						props: {
							label: status.label,
							options: status.options,
							disableClearable: true,
						},
					},
					{
						component: () => GetCountryFormContent({ dataPrefix }),
					},
				],
			},
		],
		{
			dataPrefix,
			extraProps: {
				input: {
					legendBackground: colors.white,
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

export default CityFiltersFormContent
