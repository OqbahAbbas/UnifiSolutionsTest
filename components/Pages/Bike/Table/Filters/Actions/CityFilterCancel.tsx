import { useRecoilValue } from 'recoil'
import LabelsAtom from '@atoms/Labels'
import { Button } from '@admixltd/admix-component-library'
import { useMemo } from 'react'
import { resetRecoil } from '@admixltd/admix-component-library/RecoilNexus'
import { FormFieldDataUpdater, FormFieldErrorsDataUpdater } from '@forms/index'
import { CityFiltersAtom } from '@atoms/Geo/Cities/Table'
import CityFormUpdatedAtom from '@atoms/Geo/Cities/Edit/CityFormUpdated'
import CityFormLoadingAtom from '@atoms/Geo/Cities/Edit/CityFormLoadingAtom'
import { useResponsive } from '@hooks/useResponsive'
import { TextButton } from '@components/Pages/ContactUs/ConatctCard.styles'

const CityFilterCancel = () => {
	const { clear } = useRecoilValue(LabelsAtom).pages.geo.cities.filters.actions
	const { mobileOnly } = useResponsive()

	const handleCancel = () => {
		resetRecoil(CityFiltersAtom)
		resetRecoil(FormFieldErrorsDataUpdater)
		resetRecoil(CityFormUpdatedAtom)
		resetRecoil(FormFieldDataUpdater)
		resetRecoil(CityFormLoadingAtom)
	}

	return useMemo(
		() => (
			<Button
				round
				color="primary300"
				size={mobileOnly ? 'medium' : 'large'}
				variant="contained"
				onClick={handleCancel}
			>
				<TextButton>{clear}</TextButton>
			</Button>
		),
		[clear, mobileOnly]
	)
}

export default CityFilterCancel
