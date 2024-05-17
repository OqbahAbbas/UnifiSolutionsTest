import { useRecoilState, useRecoilValue } from 'recoil'

import styled from '@emotion/styled'
import LabelsAtom from '@atoms/Labels'
import { Pagination } from '@admixltd/admix-component-library/Table'
import { useRouter } from 'next/router'
import { LoadingAtom, PageIndexAtom, PageSizeAtom, BikesCountAtom } from '@atoms/Bikes/index'
import { useResponsive } from '@hooks/useResponisve'

const TableFooter = () => {
	const [pageSize, setPageSize] = useRecoilState(PageSizeAtom)
	const [pageIndex, setPageIndex] = useRecoilState(PageIndexAtom)
	const bikesCount = useRecoilValue(BikesCountAtom) ?? 0
	const loading = useRecoilValue(LoadingAtom)
	const labels = useRecoilValue(LabelsAtom).pages.bikes.footer
	const locale = useRouter().locale ?? 'en'
	const { mobileOnly } = useResponsive()
	return (
		<FooterContainer locale={locale}>
			<div />
			<Pagination
				{...{
					loading,
					pageSize,
					rowCount: bikesCount,
					page: pageIndex,
					labelRowsPerPage: !mobileOnly ? labels.rowsPerPage : '',
					pageCounter: (from, to, total) => labels.pageCounter(from, to, total),
					onPageSizeChange: (size: number) => {
						if (loading) return
						setPageSize(size)
					},
					onPageChange: (page: number) => {
						if (loading) return
						setPageIndex(page)
					},
				}}
			/>
		</FooterContainer>
	)
}

const FooterContainer = styled.div<{
	locale: string
}>`
	height: 65px;

	display: flex;
	flex-shrink: 0;
	justify-content: space-between;
	border-top: 1px solid ${({ theme }) => theme.colors.gray300};
	align-items: center;

	.NavigationButtons {
		transform: ${({ locale }) => (locale === 'ar' ? 'scaleX(-1)' : 'scaleX(1)')};
		direction: ${({ locale }) => (locale === 'ar' ? 'rtl' : 'ltr')};
	}
`

export default TableFooter
