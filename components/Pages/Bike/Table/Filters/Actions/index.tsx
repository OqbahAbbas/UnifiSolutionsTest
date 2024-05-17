import styled from '@emotion/styled'
import CityFilterCancel from './CityFilterCancel'
import CityFilterSubmit from './CityFilterSubmit'

const CityFilterFormActions = () => (
	<Container>
		<CityFilterSubmit />
		<CityFilterCancel />
	</Container>
)

const Container = styled.div`
	display: flex;
	gap: 16px;
	justify-content: flex-end;
	margin-bottom: 24px;
`

export default CityFilterFormActions
