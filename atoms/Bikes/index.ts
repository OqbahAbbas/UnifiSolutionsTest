import { atom } from 'recoil'
import { Bike, ViewModel } from '@api/Models/Bikes/types'

const prefix = `Bikes`
export const BikesDataAtom = atom<Bike[]>({
	key: `${prefix}Data`,
	default: [],
})

export const BikesCountAtom = atom<number>({
	key: `${prefix}Count`,
	default: 0,
})

export const ColumnSelectorCookieName = `${prefix}ColumnSelector`

export const PageSizeAtom = atom({
	key: `${prefix}Size`,
	default: 10,
})

export const PageIndexAtom = atom({
	key: `${prefix}PageIndex`,
	default: 0,
})

export const LoadingAtom = atom({
	key: `${prefix}Loading`,
	default: false,
})

export const BikeFiltersAtom = atom({
	key: `BikeFilters`,
	default: {},
})

export const BikeFilterLoadingAtom = atom({
	key: `BikeFilterLoading`,
	default: false,
})

export const ViewBikesAtom = atom<ViewModel>({
	key: `${prefix}viewBikes`,
	default: {
		title: 'List',
		val: 'list',
	},
})

export const ColumnVisibilityDefaultState: Set<keyof Bike> = new Set()
export const ColumnVisibilityAtom = atom<Set<keyof Bike>>({
	key: `${prefix}ColumnVisibility`,
	default: ColumnVisibilityDefaultState,
})
