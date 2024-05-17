import { gridClasses, GridRowsProp } from '@mui/x-data-grid'
import { useRecoilValue } from 'recoil'
import styled from '@emotion/styled'
import LabelsAtom from '@atoms/Labels'
import { SomeObject } from '@admixltd/admix-component-library'
import { NoRowsResults, Table as ACLTable } from '@admixltd/admix-component-library/Table'
import NoSearchResults from '@components/Helpers/Table/NoSearchResults'
import {
	ColumnVisibilityAtom,
	LoadingAtom,
	PageSizeAtom,
	BikesDataAtom,
	BikesCountAtom,
} from '@atoms/Bikes/index'
import columns from './Columns'

const Table = () => {
	const pageSize = useRecoilValue(PageSizeAtom)
	const tableData = useRecoilValue(BikesDataAtom) ?? []
	const bikesCount = useRecoilValue(BikesCountAtom) ?? 0
	const loading = useRecoilValue(LoadingAtom)
	const columnLabels = useRecoilValue(LabelsAtom).pages.bikes.columns

	const hiddenColumns = useRecoilValue(ColumnVisibilityAtom)
	const columnVisibilityModel: SomeObject<boolean> = {}
	hiddenColumns.forEach(column => {
		columnVisibilityModel[column] = false
	})

	const { noResults } = useRecoilValue(LabelsAtom).table

	/**
	 * Rows data mapping
	 */
	const rows: GridRowsProp = tableData?.map(({ ...other }) => ({
		...other,
	}))

	return (
		<Container>
			<StyledTable
				{...{
					loading,
					rows,
					columns: columns(columnLabels),
					pageSize,
					columnVisibilityModel,
					rowCount: bikesCount,
					components: {
						NoRowsOverlay: () => <NoRowsResults />,
						NoResultsOverlay: () => <NoSearchResults {...{ label: noResults }} />,
					},
				}}
				getRowId={({ id }) => id}
				hideFooter
				autoHeight
			/>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-grow: 1;
`

const StyledTable = styled(ACLTable)`
	&& {
		.${gridClasses.columnHeaders} {
			border-top-right-radius: 4px;
			border-top-left-radius: 4px;
		}
	}
`
export default Table
