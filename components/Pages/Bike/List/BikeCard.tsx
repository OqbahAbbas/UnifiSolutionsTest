import styled from '@emotion/styled'
import { Bike } from '@api/Models/Bikes/types'
import { ButtonBase } from '@mui/material'
import BikeIcon from '@svg/icons/bikePlaceHolder.svg'
import LabelsAtom from '@atoms/Labels'
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import UTCtoLocal from '@utils/basic/UTCtoLocal'
import pages from '@constants/pages'

const BikeCard = ({ bike }: { bike: Bike }) => {
	const router = useRouter()
	const {
		theftLocation,
		theftDate,
		description: theftDescription,
	} = useRecoilValue(LabelsAtom).pages.bikes.columns
	const {
		id,
		title,
		thumb,
		large_img: largeImg,
		stolen_location: stealLocation,
		date_stolen: stealDate,
		description,
	} = bike

	const viewDetails = () => {
		router.push(`${pages.dashboard.url}/${id}`)
	}

	return (
		<Container>
			<ButtonBase onClick={viewDetails} className="imageContainer">
				<img height={200} src={thumb ?? largeImg ?? BikeIcon} alt={title} className="img" />
			</ButtonBase>
			<Info>
				<Title onClick={viewDetails}>{!title ? '-' : title}</Title>
				<div className="details">
					<div className="detailsSection">
						<span className="label">{theftLocation}: </span>
						<span className="value">{stealLocation ?? '-'}</span>
					</div>
					<div className="detailsSection">
						<span className="label">{theftDate}: </span>
						<span className="value">{UTCtoLocal(stealDate)}</span>
					</div>
				</div>
				<div className="description">
					<span className="label">{theftDescription}: </span>
					<span className="value">{description ?? '-'}</span>
				</div>
			</Info>
		</Container>
	)
}

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
			object-fit: fill;
			width: 100%;
			border-radius: 12px 0 0 12px;
			transition: all 0.3s ease-in-out 0s;
			overflow-clip-margin: content-box;
			overflow: clip;
			background: #e8efff;
			&:hover {
				transform: scale(1.2);
			}

			${({ theme }) => theme.adaptive.xs} {
				width: 100%;
				border-radius: 12px 12px 0 0;
			}
		}
	}
`

const Title = styled.h1`
	font-size: 20px;
	width: fit-content;
	text-decoration: auto;
	color: ${({ theme }) => theme.colors.primary};
	cursor: pointer;
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

	.label {
		color: ${({ theme }) => theme.colors.secondary};
		font-size: 15px;
		font-weight: 600;
	}

	.value {
		color: ${({ theme }) => theme.colors.gray500};
		font-size: 15px;
	}

	.description: {
		margin-top: auto;
	}
`

export default BikeCard
