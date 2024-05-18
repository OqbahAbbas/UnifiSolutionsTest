import styled from '@emotion/styled'
import { Skeleton } from '@mui/material'

const BikeCard = () => (
	<Container>
		<div className="imageContainer">
			<Skeleton height={200} variant="rectangular" className="img" />
		</div>
		<Info>
			<Skeleton variant="text" width="100%" height={25} />
			<div className="details">
				<div className="detailsSection">
					<span className="label">
						<Skeleton variant="text" width="25%" height={25} />
					</span>
					<span className="value">
						<Skeleton variant="text" width="50%" height={25} />
					</span>
				</div>
				<div className="detailsSection">
					<span className="label">
						<Skeleton variant="text" width="25%" height={25} />
					</span>
					<span className="value">
						<Skeleton variant="text" width="50%" height={25} />
					</span>
				</div>
			</div>
			<div className="description">
				<span className="label">
					<Skeleton variant="text" width="25%" height={25} />
				</span>
				<span className="value">
					<Skeleton variant="text" width="50%" height={25} />
				</span>
			</div>
		</Info>
	</Container>
)

export const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: start;
	width: 100%;
	margin-bottom: 24px;

	${({ theme }) => theme.adaptive.xs} {
		flex-direction: column;
	}

	background: ${({ theme }) => theme.colors.white};
	border-radius: 12px;
	box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);

	.imageContainer {
		height: 100%;
		border-radius: 12px 0 0 12px;
		overflow: hidden;
		width: 320px;

		${({ theme }) => theme.adaptive.xs} {
			width: 100%;
			border-radius: 12px 12px 0 0;
		}

		.img {
			width: 100%;
			border-radius: 12px 0 0 12px;

			${({ theme }) => theme.adaptive.xs} {
				width: 100%;
				border-radius: 12px 12px 0 0;
			}
		}
	}
`

export const Info = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	padding: 16px 16px;
	width: 100%;

	.details {
		display: flex;
		flex-direction: row;
		justify-content: spcae-between;
		gap: 12px;

		${({ theme }) => theme.adaptive.xs} {
			flex-direction: column;
		}

		.detailsSection {
			flex: 1;
		}
	}
`

export default BikeCard
