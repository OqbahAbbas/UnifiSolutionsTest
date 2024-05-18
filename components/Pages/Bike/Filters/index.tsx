import styled from '@emotion/styled'
import { useRecoilValue } from 'recoil'
import LabelsAtom from '@atoms/Labels'
import BikesFilterFormActions from './Actions'
import BikesFiltersFormContent from './BikesFilterFormContent'

const BikesFilters = () => {
	const { label } = useRecoilValue(LabelsAtom).pages.bikes.filters
	return (
		<Container>
			<h1>{label}</h1>
			<BikesFiltersFormContent />
			<BikesFilterFormActions />
		</Container>
	)
}

const Container = styled.div`
	border-radius: 8px;
	padding: 0 24px;
	margin: 8px 0 24px;
	display: flex;
	flex-direction: column;
	width: 100%;
	box-shadow: 10px 10px 10px #c6cddd;

	h1 {
		color: ${({ theme }) => theme.colors.primary};
	}

	.StyledChipContainer {
		margin-left: 8px;
		margin-right: 8px;
	}
`

export const CenterWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`

export default BikesFilters
