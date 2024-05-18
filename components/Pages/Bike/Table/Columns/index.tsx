import { ColumnDefinition } from '@admixltd/admix-component-library/Table'
import { GridValueFormatterParams } from '@mui/x-data-grid'
import getLabels from '@helpers/getLabels'
import columnAutoWidth from '@utils/table/columnAutoWidth'
import { Labels } from '@labels'
import UTCtoLocal from '@utils/basic/UTCtoLocal'
import { BikeColumnDefinition } from './types'
import Actions from './Actions'
import Image from './Image'

const valueFormatter = ({ value }: GridValueFormatterParams) => {
	if (!value) return getLabels().pages.bikes.errors.noDataSpecified
	return value
}

const Columns: (
	labels: Labels[keyof Labels]['pages']['bikes']['columns']
) => Array<ColumnDefinition> = labels =>
	(
		[
			Image(labels),
			{ field: 'title', headerName: labels.title, sortable: false },
			{ field: 'description', headerName: labels.description, sortable: false },
			{ field: 'stolen_location', headerName: labels.theftLocation, sortable: false },
			{
				field: 'date_stolen',
				headerName: labels.theftDate,
				width: 175,
				valueFormatter: ({ value }) => UTCtoLocal(value),
				sortable: false,
			},
			Actions(labels),
		] as BikeColumnDefinition[]
	).map((column: ColumnDefinition) => ({
		...columnAutoWidth(column),
		valueFormatter: column.valueFormatter ?? valueFormatter,
	}))

export default Columns
