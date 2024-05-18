import { useRecoilState, useRecoilValue } from 'recoil'
import LabelsAtom from '@atoms/Labels'
import { Button } from '@admixltd/admix-component-library'
import { useMemo } from 'react'
import { getDataByFieldsList } from '@forms/index'
import { setRecoil } from '@admixltd/admix-component-library/RecoilNexus'
import { useResponsive } from '@hooks/useResponisve'
import { BikeFilterLoadingAtom, BikeFiltersAtom } from '@atoms/Bikes'
import BikeFiltersFormDataToFilters from '@api/Models/Bikes/formDataConverter'
import { Snackbar } from '@admixltd/admix-component-library/Snackbar'
import dataPrefix from '../dataPrefix'

const BikeFilterSubmit = () => {
	const labels = useRecoilValue(LabelsAtom)
	const { filter } = labels.pages.bikes.filters.actions
	const { theftDateInfo } = labels.global
	const [BikeFilterLoading, setBikeFilterLoading] = useRecoilState(BikeFilterLoadingAtom)
	const { mobileOnly } = useResponsive()

	const handleSubmit = () => {
		setBikeFilterLoading(true)
		const formData = getDataByFieldsList({ dataPrefix })
		const filters = BikeFiltersFormDataToFilters({ formData })
		setRecoil(BikeFiltersAtom, filters)
		if (filters.theftDate) Snackbar.info(theftDateInfo, { persist: true })
	}

	return useMemo(
		() => (
			<Button
				round
				loading={BikeFilterLoading}
				type="submit"
				size={mobileOnly ? 'medium' : 'large'}
				variant="contained"
				onClick={handleSubmit}
			>
				{filter}
			</Button>
		),
		[filter, BikeFilterLoading, mobileOnly]
	)
}

export default BikeFilterSubmit
