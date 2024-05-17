import styled from '@emotion/styled'
import { Labels } from '@labels'
import { Avatar } from '@mui/material'
import { GridRenderCellParams } from '@mui/x-data-grid'
import BikeIcon from '@svg/icons/bikePlaceHolder.svg'
import { BikeColumnDefinition } from './types'

const AvatarComponent = ({ row }: GridRenderCellParams) => (
	<StyledAvatar src={row?.thumb ?? row.large_img ?? BikeIcon} />
)
export default (labels: Labels[keyof Labels]['pages']['bikes']['columns']) =>
	({
		headerName: labels.image,
		sortable: false,
		width: 100,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		renderCell: (props: GridRenderCellParams<any, any, any>) => <AvatarComponent {...props} />,
	} as unknown as BikeColumnDefinition)

const StyledAvatar = styled(Avatar)`
	border-radius: 4px;
	background: #e8efff;
	& > img {
		object-fit: contain;
	}
`
