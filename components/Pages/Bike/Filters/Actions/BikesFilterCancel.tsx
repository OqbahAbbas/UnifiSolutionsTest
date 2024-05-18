import { useRecoilValue } from 'recoil'
import LabelsAtom from '@atoms/Labels'
import { Button } from '@admixltd/admix-component-library'
import { useMemo } from 'react'
import { resetRecoil } from '@admixltd/admix-component-library/RecoilNexus'
import { FormFieldDataUpdater, FormFieldErrorsDataUpdater } from '@forms/index'
import { BikeFiltersAtom } from '@atoms/Bikes'
import { useResponsive } from '@hooks/useResponisve'

const BikeFilterCancel = () => {
	const { clear } = useRecoilValue(LabelsAtom).pages.bikes.filters.actions
	const { mobileOnly } = useResponsive()

	const handleCancel = () => {
		resetRecoil(BikeFiltersAtom)
		resetRecoil(FormFieldErrorsDataUpdater)
		resetRecoil(FormFieldDataUpdater)
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
				{clear}
			</Button>
		),
		[clear, mobileOnly]
	)
}

export default BikeFilterCancel
