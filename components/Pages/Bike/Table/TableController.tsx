import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { debounce } from '@mui/material'
import { getRecoil, setRecoil } from '@admixltd/admix-component-library/RecoilNexus'
import { Snackbar } from '@admixltd/admix-component-library/Snackbar'
import { useFirstRender } from '@admixltd/admix-component-library'
import getLabels from '@helpers/getLabels'
import BikeService from '@api/Models/Bikes'
import {
	BikeFilterLoadingAtom,
	BikeFiltersAtom,
	BikesCountAtom,
	BikesDataAtom,
	LoadingAtom,
	PageIndexAtom,
	PageSizeAtom,
} from '@atoms/Bikes'
import queryParams from '@utils/basic/queryParameters'

const handleTableUpdateFunction = async () => {
	setRecoil(LoadingAtom, true)
	const pageIndex = getRecoil(PageIndexAtom)
	const pageSize = getRecoil(PageSizeAtom)
	const filter = getRecoil(BikeFiltersAtom)

	const query = queryParams({ pageIndex, pageSize, filter })
	const bikesResponse = await BikeService.get(query)
	const bikesCountResponse = await BikeService.count(query)

	if (
		!bikesResponse ||
		'error' in bikesResponse ||
		!bikesCountResponse ||
		'error' in bikesCountResponse
	) {
		Snackbar.error(
			!bikesResponse || !bikesCountResponse
				? getLabels().errors.request.noRequest
				: getLabels().pages.bikes.errors.noListLoaded
		)
		setRecoil(LoadingAtom, false)
		setRecoil(BikeFilterLoadingAtom, false)
		return
	}

	setRecoil(BikesDataAtom, bikesResponse.bikes)
	setRecoil(BikesCountAtom, bikesCountResponse?.proximity ?? 0)
	setRecoil(LoadingAtom, false)
	setRecoil(BikeFilterLoadingAtom, false)
}

export const handleTableUpdate = debounce(handleTableUpdateFunction, 500)

const TableController = () => {
	const firstRender = useFirstRender()
	const pageSize = useRecoilValue(PageSizeAtom)
	const [pageIndex, setPageIndex] = useRecoilState(PageIndexAtom)

	const filters = useRecoilValue(BikeFiltersAtom)

	useEffect(() => {
		if (firstRender) return
		setPageIndex(0)
	}, [filters, pageSize])

	useEffect(() => {
		if (firstRender) return
		handleTableUpdate()
	}, [pageSize, pageIndex, filters])

	return null
}

export default TableController
