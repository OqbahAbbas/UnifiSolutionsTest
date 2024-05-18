import styled from '@emotion/styled'
import { useRecoilValue } from 'recoil'
import { SelectedBikeAtom } from '@atoms/Bikes'
import BikeIcon from '@svg/icons/bikePlaceHolder.svg'
import TheftInfo from './TheftInfo'

const BikeDetails = () => {
	const bike = useRecoilValue(SelectedBikeAtom)
	const { title, large_img: largeImage, thumb } = bike
	return (
		<Container>
			<img src={largeImage ?? thumb ?? BikeIcon} alt={title} />
			<TheftInfo />
		</Container>
	)
}

export const Container = styled.div`
	display: grid;
	grid-auto-flow: column;
	grid-template-columns: 400px 1fr;
	gap: 12px;

	img {
		width: 100%;
		height: 400px;
		object-fit: cover;
		background: ${({ theme }) => theme.colors.secondary};
		border-radius: 16px;
	}

	${({ theme }) => theme.adaptive.md} {
		grid-auto-flow: row;
		grid-template-columns: 1fr;
	}
`

export default BikeDetails
