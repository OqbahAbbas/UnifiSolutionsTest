import styled from '@emotion/styled'
import { ViewModel } from '@api/Models/Bikes/types'
import LabelsAtom from '@atoms/Labels'
import { useRecoilState, useRecoilValue } from 'recoil'
import { AutoComplete } from '@admixltd/admix-component-library/AutoComplete'
import { ViewBikesAtom } from '@atoms/Bikes'

const BikesView = () => {
	const { label, options } = useRecoilValue(LabelsAtom).pages.bikes.view
	const [view, setView] = useRecoilState(ViewBikesAtom)

	return (
		<Container>
			<h2>{label}</h2>
			<AutoComplete
				options={options}
				value={view ?? { title: '' }}
				onChange={(event, newValue) => setView(newValue as ViewModel)}
				disableClearable
			/>
		</Container>
	)
}

export const Container = styled.div`
	display: grid;
	grid-auto-flow: column;
	align-items: center;
	justify-content: start;
	gap: 8px;

	h2 {
		color: ${({ theme }) => theme.colors.primary};
	}

	input {
		width: fit-content !important;
	}
`

export default BikesView
