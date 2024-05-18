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
	LoadingAtom,
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
import { Bike, ViewModel } from '@api/Models/Bikes/types'
import TableController from '@components/Pages/Bike/Table/TableController'
import Filters from '@components/Pages/Bike/Filters'
import { Skeleton } from '@mui/material'
import { FormFieldDataUpdater, FormFieldErrorsDataUpdater } from '@forms/index'
import getLabels from '@helpers/getLabels'
import { Snackbar } from '@admixltd/admix-component-library/Snackbar'

interface BikeListProps {
	defaultPageSize: number
	defaultPageIndex: number
	hiddenColumns: string
	bikes: Bike[]
	bikesCount: number
	error: string
}

const Page: NextPageWithProps<BikeListProps> = ({ error }) => {
	const { results } = useRecoilValue(LabelsAtom).pages.bikes
	const [view, setView] = useRecoilState(ViewBikesAtom)
	const { view: viewLabels } = useRecoilValue(LabelsAtom).pages.bikes
	const totalBikesCount = useRecoilValue(BikesCountAtom)
	const filterLoading = useRecoilValue(BikeFilterLoadingAtom)
	const loading = useRecoilValue(LoadingAtom)

	useEffect(() => {
		const viewVal = viewLabels.options.find(option => option.val === view.val)
		setView(viewVal as ViewModel)
	}, [])

	useEffect(() => {
		if (error) {
			Snackbar.error(error)
		}
	}, [])

	return (
		<>
			<Meta />
			<Container>
				<Filters />
				<div className="header">
					<div className="results">
						<h1>{results}</h1>
						{!filterLoading && !loading && <span>{`(${totalBikesCount})`}</span>}
						{(filterLoading || loading) && <Skeleton variant="text" width={50} />}
					</div>
					<div className="actions">
						<BikesView />
					</div>
				</div>
				<TableController />
				{view.val === 'table' && <TableView />}
				{view.val === 'list' && <ListView />}
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
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		${({ theme }) => theme.adaptive.md} {
			flex-direction: column;
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
	initialPropsWrapper<BikeListProps>(
		async ({ req }) => {
			const defaultPageSize = 10
			const defaultPageIndex = 0
			const hiddenColumns = `${getCookie(ColumnSelectorCookieName, { req }) ?? '[]'}`
			const query = queryParams({ pageIndex: defaultPageIndex, pageSize: defaultPageSize })
			const bikesCountResponse = await BikesService.count(query)
			const bikesResponse = await BikesService.get(query)

			if (
				bikesResponse &&
				'bikes' in bikesResponse &&
				bikesCountResponse &&
				'stolen' in bikesCountResponse
			) {
				const { bikes } = bikesResponse
				const { proximity } = bikesCountResponse
				return {
					defaultPageSize,
					defaultPageIndex,
					hiddenColumns,
					bikes,
					bikesCount: proximity ?? 0,
					error: '',
				}
			}

			return {
				defaultPageSize,
				defaultPageIndex,
				hiddenColumns,
				bikes: [],
				bikesCount: 0,
				error:
					(bikesResponse as { error: string })?.error ??
					(bikesCountResponse as { error: string })?.error ??
					getLabels().errors.request.noRequest,
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
	set(BikesCountAtom, bikesCount)
	set(PageSizeAtom, defaultPageSize)
	set(PageIndexAtom, defaultPageIndex)
	set(ColumnVisibilityAtom, new Set(JSON.parse(hiddenColumns)))
	reset(BikeFiltersAtom)
	reset(BikeFilterLoadingAtom)
	reset(FormFieldDataUpdater)
	reset(FormFieldErrorsDataUpdater)
}
export default Page
