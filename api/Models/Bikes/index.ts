import request from '@api/Methods/Request'
import { FilteredBikes } from './types'

const get = () =>
	request<null, FilteredBikes>('/search', {
		filteredData: true,
	})

export default {
	get,
}
