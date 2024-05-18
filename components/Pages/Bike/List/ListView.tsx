import { BikeFilterLoadingAtom, BikesCountAtom, BikesDataAtom, LoadingAtom } from '@atoms/Bikes'
import { useRecoilValue } from 'recoil'
import BikeCardSkeleton from '@components/Skeletons/BikeCardSkeleton'
import BikeCard from './BikeCard'
import TableFooter from '../Table/TableFooter'
import NoData from '../NoData'

const ListView = () => {
	const filterLoading = useRecoilValue(BikeFilterLoadingAtom)
	const loading = useRecoilValue(LoadingAtom)
	const totalBikesCount = useRecoilValue(BikesCountAtom)
	const bikes = useRecoilValue(BikesDataAtom)

	return (
		<>
			{!filterLoading && totalBikesCount > 0 && !loading && (
				<>
					<div className="cardsContainer">
						{bikes.map(bike => (
							<BikeCard bike={bike} key={bike.id} />
						))}
					</div>
					<TableFooter />
				</>
			)}
			{!filterLoading && totalBikesCount <= 0 && !loading && <NoData />}
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
