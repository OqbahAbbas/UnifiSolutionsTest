import styled from '@emotion/styled'
import { flexGap } from '@admixltd/admix-component-library'
import ColumnSelector from '@components/Pages/Bike/Table/ColumnSelector'
import Table from '@components/Pages/Bike/Table/Table'
import { useRouter } from 'next/router'
import TableSkeleton from '@components/Skeletons/TableSkeleton'
import { BikeFilterLoadingAtom, LoadingAtom } from '@atoms/Bikes'
import TableFooter from '@components/Pages/Bike/Table/TableFooter'
import { useRecoilValue } from 'recoil'

const ListView = () => {
	const filterLoading = useRecoilValue(BikeFilterLoadingAtom)
	const loading = useRecoilValue(LoadingAtom)
	const router = useRouter()
	const { locale } = router ?? {}

	return (
		<TableContainer locale={locale ?? 'en'}>
			<TableActions>
				<div />
				<div>
					<div />
					<ColumnSelector />
				</div>
			</TableActions>
			{(filterLoading || loading) && (
				<TableSkeleton
					{...{
						rows: 10,
						columns: 5,
					}}
				/>
			)}
			{!filterLoading && !loading && <Table />}
			<TableFooter />
		</TableContainer>
	)
}

const TableContainer = styled.div<{
	locale: string
}>`
	border-radius: 8px;
	padding: 0 24px;
	background-color: ${({ theme }) => theme.colors.white};
	margin: 8px 0 24px;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	width: 100%;
	overflow-x: scroll;
	overflow-y: hidden;
	box-shadow: 10px 10px 10px #c6cddd;
	box-shadow: inset 0px -1px 0px ${({ theme }) => theme.colors.gray200};
	.MuiDataGrid-root {
		width: 100%;
		direction: ${({ locale }) => (locale === 'ar' ? 'rtl' : 'ltr')};
	}
	.MuiDataGrid-columnHeadersInner {
		direction: ltr;
	}
	.MuiDataGrid-virtualScrollerContent {
		direction: ltr;
	}
`

const TableActions = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 66px;
	margin-right: -10px;
	margin-left: -10px;
	padding-left: 10px;

	${flexGap(8)};

	> div {
		${flexGap(16)};
	}
`

export default ListView
