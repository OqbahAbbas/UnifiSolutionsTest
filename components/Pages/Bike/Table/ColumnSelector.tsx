import { useRecoilValue } from 'recoil'

import LabelsAtom from '@atoms/Labels'
import ColumnSelectorCreator from '@components/Helpers/Table/ColumnSelectorCreator'

import {
	ColumnSelectorCookieName,
	ColumnVisibilityAtom,
	ColumnVisibilityDefaultState,
} from '@atoms/Bikes'
import columns from './Columns'

const ColumnSelector = () => {
	const {
		columns: columnLabels,
		fields: { columnSelector },
	} = useRecoilValue(LabelsAtom).pages.bikes

	return (
		<ColumnSelectorCreator
			{...{
				cookieName: ColumnSelectorCookieName,
				ColumnVisibilityDefaultState,
				ColumnVisibilityAtom,
				labels: columnSelector,
				columns: columns(columnLabels),
			}}
		/>
	)
}

export default ColumnSelector
