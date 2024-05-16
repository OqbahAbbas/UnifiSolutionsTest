import global from './global'
import dashboard from './pages/dashboard'
import header from './layout/header'
import errors from './errors'
import table from './table'

const labels = {
	global,
	pages: {
		dashboard,
	},
	layout: {
		header,
	},
	errors,
	table,
}

export default labels
