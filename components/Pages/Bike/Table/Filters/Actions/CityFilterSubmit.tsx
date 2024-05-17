import { useRecoilState, useRecoilValue } from 'recoil'
import LabelsAtom from '@atoms/Labels'
import { Button } from '@admixltd/admix-component-library'
import { useMemo } from 'react'
import { getDataByFieldsList } from '@forms/index'
import { setRecoil } from '@admixltd/admix-component-library/RecoilNexus'
import { CityFilterLoadingAtom, CityFiltersAtom } from '@atoms/Geo/Cities/Table'
import { cityFiltersFormDataToFilters } from '@api/Models/Geo/Cities/formDataConverter'
import dataPrefix from '../dataPrefix'
import { useResponsive } from '@hooks/useResponsive'
import { TextButton } from '@components/Pages/ContactUs/ConatctCard.styles'

const CityFilterSubmit = () => {
	const { Filter } = useRecoilValue(LabelsAtom).pages.geo.cities.filters.actions
	const [CityFilterLoading, setCityFilterLoading] = useRecoilState(CityFilterLoadingAtom)
	const { mobileOnly } = useResponsive()

	const handleSubmit = () => {
		setCityFilterLoading(true)
		const formData = getDataByFieldsList({ dataPrefix })
		const filters = cityFiltersFormDataToFilters({ formData })
		setRecoil(CityFiltersAtom, filters)
	}

	return useMemo(
		() => (
			<Button
				round
				loading={CityFilterLoading}
				type="submit"
				size={mobileOnly ? 'medium' : 'large'}
				variant="contained"
				onClick={handleSubmit}
			>
				<TextButton>{Filter}</TextButton>
			</Button>
		),
		[Filter, CityFilterLoading, mobileOnly]
	)
}

export default CityFilterSubmit
