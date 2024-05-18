import fetchBikesParameters from '@constants/fetchBikesParameters'

export interface QueryParams {
	pageIndex: number
	pageSize: number
	filter?: Record<string, string | string[]>
}

const queryParams = (params: QueryParams) => {
	// get basic query parameters
	const query = `?page=${params.pageIndex + 1}&per_page=${params.pageSize}`
	// get constant query parameters
	const constantQueryArray = Object.keys(fetchBikesParameters).map(key => {
		const item = fetchBikesParameters[key as keyof typeof fetchBikesParameters]
		return `&${key}=${item}`
	})
	const constantQuery = constantQueryArray.join('')
	// get filter query parameters
	const { filter } = params ?? {}
	if (!filter || !Object.keys(filter).length) return query + constantQuery
	const filterQueryArray = Object.keys(filter).map(key => {
		const item = filter[key]
		return item ? `&${key}=${item}` : ''
	})
	const filterQuery = filterQueryArray.join('')

	return query + constantQuery + filterQuery
}

export default queryParams
