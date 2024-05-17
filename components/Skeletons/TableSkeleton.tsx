import React from 'react'
import { Skeleton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import styled from '@emotion/styled'

interface Props {
	rows: number
	columns: number
}

const TableSkeleton = ({ rows, columns }: Props) => (
	<Table aria-label="table skeleton">
		<TableHead>
			<StyledTableRow>
				{Array.from(Array(columns).keys()).map(column => (
					<TableCell key={column}>
						<Skeleton variant="text" />
					</TableCell>
				))}
			</StyledTableRow>
		</TableHead>
		<TableBody>
			{Array.from(Array(rows).keys()).map(row => (
				<TableRow key={row}>
					{Array.from(Array(columns).keys()).map(column => (
						<TableCell key={column}>
							<Skeleton variant="text" />
						</TableCell>
					))}
				</TableRow>
			))}
		</TableBody>
	</Table>
)

const StyledTableRow = styled(TableRow)`
	background: #eaedf5;
`

export default TableSkeleton
