import request from '@api/Methods/Request'
import { BikeById, BikesCount, FilteredBikes } from './types'

const get = (query?: string) => request<null, FilteredBikes>(`/search${query}`)

const count = (query?: string) => request<null, BikesCount>(`/search/count${query}`)

const getById = (id: number) => request<null, { bike: BikeById }>(`/bikes/${id}`)

export default {
	get,
	count,
	getById,
}
