import ContentGenerator from './Components/ContentGenerator'
import { MenuContentItem } from './Components/types'
import LanguageButton from './Components/LanguageButton'
import VisitUs from './Components/VisitUs'

const MenuContent = () => {
	const LeftContent: MenuContentItem[] = []

	const RightContent: MenuContentItem[] = [
		{
			component: () => <LanguageButton />,
		},
		{
			component: () => <VisitUs />,
		},
	]

	return (
		<>
			<div>{ContentGenerator(LeftContent)}</div>
			<div>{ContentGenerator(RightContent)}</div>
		</>
	)
}

export default MenuContent
