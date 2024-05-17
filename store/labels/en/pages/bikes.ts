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
			edit: 'Edit',
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
			status: {
				label: 'Status',
				options: [
					{ title: 'Active', value: true },
					{ title: 'Not Active', value: false },
				],
			},
		},
		actions: {
			Filter: 'Filter',
			clear: 'Clear',
		},
	},
}
