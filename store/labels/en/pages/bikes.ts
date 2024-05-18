export default {
	title: `Bikes`,
	header: `Bikes`,
	breadCrumb: `Bikes`,
	errors: {
		rowUpdateError: 'Unable to save row updates. Please, try again later.',
		noDataSpecified: '-',
		noListLoaded: `Unable to get the list of bikes. Please, try again later..`,
	},
	footer: {
		rowsPerPage: 'Rows per page:',
		pageCounter: (from: number, to: number, total: number) => `${from}-${to} from ${total}`,
	},
	columns: {
		title: 'Title',
		description: 'Description',
		theftDate: 'Theft Date',
		reportingDate: 'Reporting Date',
		theftLocation: 'Theft Location',
		image: 'Image',
		actions: {
			menuTitle: 'Actions',
			details: 'View Details',
		},
	},
	fields: {
		columnSelector: {
			noOptionsText: 'No columns',
			tooltip: 'Column selector',
			placeholder: 'Column title',
			hideAllLabel: 'Hide all',
			showAllLabel: 'Show all',
		},
	},
	filters: {
		label: 'Filters',
		fields: {
			title: 'Title',
			distance: {
				label: 'Distance',
				placeHolder: 'Miles around Munich',
			},
			date: 'Theft Date',
		},
		actions: {
			filter: 'Filter',
			clear: 'Clear',
		},
	},
	results: 'Stolen Bikes around Munich',
	view: {
		label: 'View',
		options: [
			{
				title: 'List',
				val: 'list',
			},
			{
				title: 'Table',
				val: 'table',
			},
		],
	},
	noFilterResults: `No data matches the filters you've chosen`,
}
