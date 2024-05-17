import { ColumnDefinition } from '@admixltd/admix-component-library/Table'
import { Bike } from '@api/Models/Bikes/types'

export interface BikeColumnDefinition extends Omit<ColumnDefinition, 'field'> {
	field: keyof Bike
}
