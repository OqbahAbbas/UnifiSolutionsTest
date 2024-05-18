import styled from '@emotion/styled'
import LabelsAtom from '@atoms/Labels'
import { useRecoilValue } from 'recoil'

const NoData = () => {
	const { noFilterResults } = useRecoilValue(LabelsAtom).pages.bikes

	return (
		<Container>
			<p className="text">{noFilterResults}</p>
		</Container>
	)
}

export const Container = styled.div`
	display: grid;
	grid-auto-flow: column;
	width: 100%;
	align-text: center;
	justify-content: center;
	align-items: center;
	gap: 4px;

	p {
		color: ${({ theme }) => theme.colors.secondary};
	}
`

export default NoData
