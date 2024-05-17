import { Labels } from '@labels'

import { ColumnDefinition, TableActionMenu } from '@admixltd/admix-component-library/Table'
import StyledMenu from '@components/Layouts/Main/StyledMenu/StyledMenu'
import EditButton from './EditButton'

export default (labels: Labels[keyof Labels]['pages']['bikes']['columns']) =>
	({
		align: 'right',
		type: 'actions',
		field: 'action',
		renderCell: ({ row: { id } }) => (
			<TableActionMenu id={id}>
				{({ close: closeMenu }) => (
					<StyledMenu>
						<div className="titleContainer">{labels.actions.menuTitle}</div>
						<div className="menuGroup">
							<EditButton id={id} closeMenu={closeMenu}>
								{labels.actions.edit}
							</EditButton>
						</div>
					</StyledMenu>
				)}
			</TableActionMenu>
		),
	} as ColumnDefinition)
