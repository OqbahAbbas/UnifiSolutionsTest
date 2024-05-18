import global from './global'
import bikes from './pages/bikes'
import details from './pages/detsils'
import header from './layout/header'
import errors from './errors'
import table from './table'

const labels = {
	global,
	pages: {
		bikes,
		details,
	},
	layout: {
		header,
	},
	errors,
	table,
}

export default labels
