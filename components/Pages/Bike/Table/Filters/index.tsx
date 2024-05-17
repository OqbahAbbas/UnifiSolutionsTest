import LabelsAtom from '@atoms/Labels'
import WithHeader from '@components/Layouts/WithHeader'
import styled from '@emotion/styled'
import { useRecoilValue } from 'recoil'
import CityFilterFormActions from './Actions'
import CityFiltersFormContent from './CityFilterFormContent'
import { media } from '@constants/media'
import { CenterWrapper } from '@components/Pages/ContactUs/ConatctCard.styles'

const CityFilters = () => {
	const labels = useRecoilValue(LabelsAtom).pages.geo.cities
	return (
		<CenterWrapper>
			<Container>
				<WithHeader title={labels.filters.label} />
				<CityFiltersFormContent />
				<CityFilterFormActions />
			</Container>
		</CenterWrapper>
	)
}

const Container = styled.div`
	border-radius: 8px;
	padding: 0 24px;
	background-color: ${({ theme }) => theme.colors.white};
	margin: 8px 0 24px;
	display: flex;
	flex-direction: column;
	width: 100%;
	box-shadow: 10px 10px 10px ${({ theme }) => theme.colors.gray200};
	.StyledChipContainer {
		margin-left: 8px;
		margin-right: 8px;
	}
	@media only screen and (min-width: 250px) and (max-width: 299.99px) {
		min-width: 14rem;
	}
	@media only screen and (min-width: 300px) and (max-width: 359.99px) {
		min-width: 17rem;
	}
	@media only screen and (min-width: 360px) and (max-width: 541.99px) {
		min-width: 20rem;
	}
	@media only screen and (min-width: 542px) and (max-width: 567.99px) {
		min-width: 29rem;
	}
	@media only screen and ${media.sm} and (max-width: 767.99px) {
		min-width: 30.5rem;
	}
`

export default CityFilters
