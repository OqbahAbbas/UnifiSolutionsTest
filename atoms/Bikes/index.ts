import { Bike, ViewModel } from '@api/Models/Bikes/types'
import { atom } from 'recoil'

const prefix = 'Bikes'

export const BikesAtom = atom<Bike[]>({
	key: `${prefix}bike`,
	default: [],
})

export const BikesFiltersAtom = atom({
	key: `${prefix}bikesFilters`,
	default: {},
})

export const ActiveBikesAtom = atom<Bike[]>({
	key: `${prefix}activeBikes`,
	default: [],
})

export const ViewMoviesAtom = atom<ViewModel>({
	key: `${prefix}viewMovies`,
	default: {
		title: 'List',
		val: 'list',
	},
})

export const BikesCookieName = `${prefix}Bikes`

export const ColumnSelectorCookieName = `${prefix}ColumnSelector`
export const ColumnVisibilityDefaultState: Set<keyof Bike> = new Set()
export const ColumnVisibilityAtom = atom<Set<keyof Bike>>({
	key: `${prefix}ColumnVisibility`,
	default: ColumnVisibilityDefaultState,
})
