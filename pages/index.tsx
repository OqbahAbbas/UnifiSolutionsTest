import Meta from '@components/Layouts/Meta'
import BaseContainer from '@components/Layouts/Main/Container'
import styled from '@emotion/styled'
import MainLayout from '@components/Layouts/Main'
import initialPropsWrapper from '@helpers/initialPropsWrapper'
import { NextPageWithProps } from '@interfaces/NextPage'
import BikesService from '@api/Models/Bikes/index'
import { flexGap } from '@admixltd/admix-component-library'
import ColumnSelector from '@components/Pages/Bike/Table/ColumnSelector'
import Table from '@components/Pages/Bike/Table/Table'
import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next'
import TableSkeleton from '@components/Skeletons/TableSkeleton'
import {
	BikeFilterLoadingAtom,
	BikeFiltersAtom,
	BikesCountAtom,
	BikesDataAtom,
	ColumnSelectorCookieName,
	ColumnVisibilityAtom,
	LoadingAtom,
	PageIndexAtom,
	PageSizeAtom,
} from '@atoms/Bikes'
import TableFooter from '@components/Pages/Bike/Table/TableFooter'
import queryParams from '@utils/basic/queryParameters'
import TableController from '@components/Pages/Bike/Table/TableController'
import { useRecoilValue } from 'recoil'
import BikeCard from '@components/Pages/Bike/List/BikeCard'

const Page: NextPageWithProps = () => {
	const filterLoading = useRecoilValue(BikeFilterLoadingAtom)
	const loading = useRecoilValue(LoadingAtom)
	const bikes = useRecoilValue(BikesDataAtom)
	const router = useRouter()
	const { locale } = router ?? {}
	return (
		<>
			<Meta />
			<Container>
				<TableContainer locale={locale ?? 'en'}>
					<TableController />
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
				{bikes.length > 0 && (
					<div className="cardsContainer">
						{bikes.map(bike => (
							<BikeCard bike={bike} key={bike.id} />
						))}
					</div>
				)}
			</Container>
		</>
	)
}

const Container = styled(BaseContainer)`
	display: grid;
	grid-auto-flow: row;
	grid-template-rows: auto;
	padding: 32px 100px;
	background-color: #e8efff;
	min-height: 100vh;
	gap: 32px;

	${({ theme }) => theme.adaptive.md} {
		padding: 32px 12px;
	}
`

export const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`

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

Page.getInitialProps = context =>
	initialPropsWrapper(
		async ({ req }) => {
			const defaultPageSize = 10
			const defaultPageIndex = 0
			const hiddenColumns = `${getCookie(ColumnSelectorCookieName, { req }) ?? '[]'}`
			const query = queryParams({ pageIndex: defaultPageIndex, pageSize: defaultPageSize })
			const bikesResponse = await BikesService.get(query)
			const bikesCountResponse = await BikesService.count(query)

			if (bikesResponse && 'redirect' in bikesResponse) {
				const { redirect } = bikesResponse
				return {
					redirect,
				}
			}

			if (bikesCountResponse && 'redirect' in bikesCountResponse) {
				const { redirect } = bikesCountResponse
				return {
					redirect,
				}
			}

			if (
				bikesResponse &&
				'bikes' in bikesResponse &&
				bikesCountResponse &&
				'stolen' in bikesCountResponse
			) {
				const { bikes } = bikesResponse
				return {
					defaultPageSize,
					defaultPageIndex,
					hiddenColumns,
					bikes,
					bikesCount: bikesCountResponse,
				}
			}

			return {
				error: 'Error',
			}
		},
		Page,
		context
	)

Page.getLayout = page => <MainLayout>{page}</MainLayout>

Page.recoilSetter = (
	{ set, reset },
	{ bikes, bikesCount, defaultPageIndex, defaultPageSize, hiddenColumns = '[]' }
) => {
	set(BikesDataAtom, bikes)
	set(BikesCountAtom, bikesCount?.proximity ?? 0)
	set(PageSizeAtom, defaultPageSize)
	set(PageIndexAtom, defaultPageIndex)
	set(ColumnVisibilityAtom, new Set(JSON.parse(hiddenColumns)))
	reset(BikeFiltersAtom)
	reset(BikeFilterLoadingAtom)
}
export default Page
