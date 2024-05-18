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

export interface BikeById {
	date_stolen: number
	description: string
	frame_colors: string[]
	frame_model: string
	id: number
	is_stock_img: boolean
	large_img: string
	location_found?: string
	manufacturer_name: string
	external_id?: number
	registry_name?: string
	registry_url?: string
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
	registration_created_at: number
	registration_updated_at: number
	api_url: string
	manufacturer_id: number
	paint_description?: string
	name: string
	frame_size: string
	rear_tire_narrow: boolean
	front_tire_narrow?: string
	type_of_cycle: string
	test_bike: boolean
	rear_wheel_size_iso_bsd: number
	front_wheel_size_iso_bsd: number
	handlebar_type_slug?: string
	frame_material_slug: string
	front_gear_type_slug?: string
	rear_gear_type_slug?: string
	extra_registration_number?: number
	additional_registration?: string
	stolen_record: {
		date_stolen: number
		location: string
		latitude: number
		longitude: number
		theft_description: string
		locking_description: string
		lock_defeat_description: string
		police_report_number: string
		police_report_department: string
		created_at: number
		create_open311: boolean
		id: number
	}
	public_images: [
		{
			name: string
			full: string
			large: string
			medium: string
			thumb: string
			id: number
		}
	]
}
