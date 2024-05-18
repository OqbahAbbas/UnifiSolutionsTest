import { SomeObject } from '@admixltd/admix-component-library'

const BikeFiltersFormDataToFilters: ({ formData }: { formData: SomeObject }) => SomeObject = ({
	formData,
}) => {
	const title = formData.title as string
	const distance = formData.distance as number
	const theftDate = formData.theftDate as string[]
	const filters = {
		...(title && { query: title }),
		...(distance && { distance }),
		...(theftDate && { theftDate }),
	}
	return filters
}

export default BikeFiltersFormDataToFilters
