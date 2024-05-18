import styled from '@emotion/styled'
import BikesFilterCancel from './BikesFilterCancel'
import BikesFilterSubmit from './BikesFilterSubmit'

const BikesFilterFormActions = () => (
	<Container>
		<BikesFilterSubmit />
		<BikesFilterCancel />
	</Container>
)

const Container = styled.div`
	display: flex;
	gap: 16px;
	justify-content: flex-end;
	margin-bottom: 24px;
`

export default BikesFilterFormActions
