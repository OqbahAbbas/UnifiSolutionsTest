import request from '@api/Methods/Request'
import { BikesCount, FilteredBikes } from './types'

const get = (query?: string) =>
	request<null, FilteredBikes>(`/search${query}`, {
		filteredData: true,
	})

const count = (query?: string) =>
	request<null, BikesCount>(`/search/count${query}`, {
		filteredData: true,
	})

export default {
	get,
	count,
}
