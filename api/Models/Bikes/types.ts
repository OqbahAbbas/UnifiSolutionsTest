export interface Bike {
	date_stolen: number
	description: string
	frame_colors: string[]
	frame_model: string
	id: number
	is_stock_img: boolean
	large_img: string
	manufacturer_name: string
	serial: string
	status: string
	stolen: boolean
	stolen_coordinates: number[]
	stolen_location: string
	thumb: string
	title: string
	url: string
	year: number
	propulsion_type_slug: string
	cycle_type_slug: string
}

export interface ViewModel {
	title: string
	val: string
}

export interface FilteredBikes {
	bikes: Bike[]
}

export interface BikesCount {
	non: number
	stolen: number
	proximity: number
}
