import styled from '@emotion/styled'
import LabelsAtom from '@atoms/Labels'
import { useRecoilValue } from 'recoil'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import urls from '@constants/urls'

const VisitUs = () => {
	const { visitUs } = useRecoilValue(LabelsAtom).layout.header
	const router = useRouter()
	return (
		<StyledButton
			color="primary"
			variant="text"
			size="large"
			onClick={() => {
				router.push(urls.unifiSolutionsUrl)
			}}
		>
			{visitUs}
		</StyledButton>
	)
}

const StyledButton = styled(Button)`
	margin-left: 8px;
	text-transform: none !important;
	border-radius: 12px;
	color: ${({ theme }) => theme.colors.white} !important;
	font-size: 12px;
	background: ${({ theme }) => theme.colors.primary} !important;
`

export default VisitUs
