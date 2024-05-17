import { FC, PropsWithChildren, useEffect, useState } from 'react'
import pages from '@constants/pages'
import { Button } from '@admixltd/admix-component-library'
import { useRouter } from 'next/router'
import { Bike } from '@api/Models/Bikes/types'

const EditButton: FC<PropsWithChildren<{ id: Bike['id']; closeMenu: () => void }>> = ({
	id,
	children,
	closeMenu,
}) => {
	const [loading, setLoading] = useState(false)
	const router = useRouter()
	useEffect(() => {
		router.events.on('routeChangeComplete', closeMenu)
		return () => {
			router.events.off('routeChangeComplete', closeMenu)
		}
	}, [])

	return (
		<Button
			disabled={false}
			shineLoading={loading}
			color="text"
			onClick={() => {
				if (loading) return
				setLoading(true)
				router.push(`${pages.dashboard}/${id}`)
			}}
		>
			{children}
		</Button>
	)
}

export default EditButton
