import Meta from '@components/Layouts/Meta'
import BaseContainer from '@components/Layouts/Main/Container'
import styled from '@emotion/styled'
import MainLayout from '@components/Layouts/Main'
import initialPropsWrapper from '@helpers/initialPropsWrapper'
import { NextPageWithProps } from '@interfaces/NextPage'
import BikesService from '@api/Models/Bikes/index'
import { getCookie } from 'cookies-next'
import {
	BikeFilterLoadingAtom,
	BikeFiltersAtom,
	BikesCountAtom,
	BikesDataAtom,
	ColumnSelectorCookieName,
	ColumnVisibilityAtom,
	PageIndexAtom,
	PageSizeAtom,
	ViewBikesAtom,
} from '@atoms/Bikes'
import queryParams from '@utils/basic/queryParameters'
import ListView from '@components/Pages/Bike/List/ListView'
import TableView from '@components/Pages/Bike/Table/TableView'
import { useRecoilState, useRecoilValue } from 'recoil'
import LabelsAtom from '@atoms/Labels'
import BikesView from '@components/Pages/Bike/BikesView'
import { useEffect } from 'react'
import { ViewModel } from '@api/Models/Bikes/types'
import TableController from '@components/Pages/Bike/Table/TableController'
import TableFooter from '@components/Pages/Bike/Table/TableFooter'

const Page: NextPageWithProps = () => {
	const [view, setView] = useRecoilState(ViewBikesAtom)
	const { view: viewLabels } = useRecoilValue(LabelsAtom).pages.bikes
	const bikes = useRecoilValue(BikesDataAtom)

	useEffect(() => {
		const viewVal = viewLabels.options.find(option => option.val === view.val)
		setView(viewVal as ViewModel)
	}, [])

	return (
		<>
			<Meta />
			<Container>
				<div className="header">
					<div className="results">
						<h1>results</h1>
						<span>{`(${bikes.length})`}</span>
					</div>
					<div className="actions">
						<BikesView />
					</div>
				</div>
				<TableController />
				{view.val === 'table' && <TableView />}
				{view.val === 'list' && (
					<>
						<ListView />
						<TableFooter />
					</>
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

	.header {
		display: grid;
		grid-auto-flow: column;
		justify-content: space-between;
		align-items: center;

		${({ theme }) => theme.adaptive.md} {
			grid-auto-flow: row;
			gap: 24px;
			justify-content: start;
			padding: 0 24px;
		}

		.results {
			display: grid;
			grid-auto-flow: column;
			justify-content: start;
			align-items: center;
			gap: 4px;
			color: ${({ theme }) => theme.colors.primary};
		}

		.actions {
			display: grid;
			grid-auto-flow: column;
			justify-content: start;
			align-items: center;
			gap: 12px;

			${({ theme }) => theme.adaptive.md} {
				grid-auto-flow: row;
			}
		}
	}
`

export const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
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
