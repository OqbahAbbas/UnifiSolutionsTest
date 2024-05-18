import styled from '@emotion/styled'
import { useRecoilValue } from 'recoil'
import { SelectedBikeAtom } from '@atoms/Bikes'
import LabelsAtom from '@atoms/Labels'
import UTCtoLocal from '@utils/basic/UTCtoLocal'

const TheftInfo = () => {
	const {
		policeDepartment,
		reportDate,
		theftDate,
		theftLocation,
		serial,
		manufacturer,
		name,
		model,
		year,
		description,
		theftDescription,
	} = useRecoilValue(LabelsAtom).pages.details.basicInfo
	const bike = useRecoilValue(SelectedBikeAtom)
	const {
		title,
		date_stolen: stealDate,
		stolen_location: stealLocation,
		stolen_record: stealRecord,
		serial: serialNumber,
		manufacturer_name: manufacturerName,
		name: bikeName,
		frame_model: bikeModel,
		year: manufacturingYear,
		description: bikeDescription,
	} = bike

	const {
		police_report_department: policeReportDepartment,
		created_at: policeReportDate,
		theft_description: incidenceDescription,
	} = stealRecord

	return (
		<Container>
			<h1>{title}</h1>
			<div className="details">
				<div className="detailsSection">
					<span className="label">{theftLocation}: </span>
					<span className="value">{stealLocation ?? '-'}</span>
				</div>
				<div className="detailsSection">
					<span className="label">{theftDate}: </span>
					<span className="value">{UTCtoLocal(stealDate)}</span>
				</div>
				<div className="detailsSection">
					<span className="label">{policeDepartment}: </span>
					<span className="value">{policeReportDepartment ?? '-'}</span>
				</div>
				<div className="detailsSection">
					<span className="label">{reportDate}: </span>
					<span className="value">{UTCtoLocal(policeReportDate)}</span>
				</div>
				<div className="detailsSection">
					<span className="label">{serial}: </span>
					<span className="value">{serialNumber}</span>
				</div>
				<div className="detailsSection">
					<span className="label">{manufacturer}: </span>
					<span className="value">{manufacturerName}</span>
				</div>
				<div className="detailsSection">
					<span className="label">{name}: </span>
					<span className="value">{bikeName}</span>
				</div>
				<div className="detailsSection">
					<span className="label">{model}: </span>
					<span className="value">{bikeModel}</span>
				</div>
				<div className="detailsSection">
					<span className="label">{year}: </span>
					<span className="value">{manufacturingYear}</span>
				</div>
			</div>
			<div className="detailsSection">
				<span className="label">{description}: </span>
				<span className="value">{bikeDescription}</span>
			</div>
			<div className="detailsSection">
				<span className="label">{theftDescription}: </span>
				<span className="value">{incidenceDescription}</span>
			</div>
		</Container>
	)
}

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	gap: 8px;

	h1 {
		font-size: 24px;
		font-weight: 600;
		color: ${({ theme }) => theme.colors.primary};
	}

	.details {
		display: grid;
		grid-auto-flow: row;
		justify-content: spcae-between;
		gap: 8px;
		grid-template-columns: 1fr 1fr;

		${({ theme }) => theme.adaptive.sm} {
			grid-template-columns: 1fr;
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
`

export default TheftInfo
