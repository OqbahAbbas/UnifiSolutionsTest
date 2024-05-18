import { BikeFilterLoadingAtom, BikesDataAtom, LoadingAtom } from '@atoms/Bikes'
import { useRecoilValue } from 'recoil'
import BikeCardSkeleton from '@components/Skeletons/BikeCardSkeleton'
import BikeCard from './BikeCard'

const ListView = () => {
	const filterLoading = useRecoilValue(BikeFilterLoadingAtom)
	const loading = useRecoilValue(LoadingAtom)
	const bikes = useRecoilValue(BikesDataAtom)

	return (
		<>
			{bikes.length > 0 && !filterLoading && !loading && (
				<div className="cardsContainer">
					{bikes.map(bike => (
						<BikeCard bike={bike} key={bike.id} />
					))}
				</div>
			)}
			{(filterLoading || loading) && (
				<div className="cardsContainer">
					{[1, 2, 3, 4].map(item => (
						<BikeCardSkeleton key={item} />
					))}
				</div>
			)}
		</>
	)
}

export default ListView
