import Meta from '@components/Layouts/Meta'
import styled from '@emotion/styled'
import BaseContainer from '@components/Layouts/Main/Container'
import MainLayout from '@components/Layouts/Main'
import initialPropsWrapper from '@helpers/initialPropsWrapper'
import { NextPageWithProps } from '@interfaces/NextPage'
import BikeService from '@api/Models/Bikes'
import { SelectedBikeAtom } from '@atoms/Bikes'
import Details from '@components/Pages/Details'
import { useRecoilValue } from 'recoil'
import getLabels from '@helpers/getLabels'
import { BikeById } from '@api/Models/Bikes/types'
import { useEffect } from 'react'
import { Snackbar } from '@admixltd/admix-component-library/Snackbar'

interface DetailsProps {
	error: string
	bike: BikeById
}

const Page: NextPageWithProps<DetailsProps> = ({ error }) => {
	const bike = useRecoilValue(SelectedBikeAtom)

	useEffect(() => {
		if (error) {
			Snackbar.error(error)
		}
	}, [])

	return (
		<>
			<Meta title={bike?.title} />
			<Container>
				<Details />
			</Container>
		</>
	)
}

const Container = styled(BaseContainer)`
	grid-auto-flow: row;
	padding: 32px 100px;
	background-color: #e8efff;
	min-height: 100vh;
	gap: 16px;

	h1 {
		color: ${({ theme }) => theme.colors.primary};
	}

	${({ theme }) => theme.adaptive.md} {
		padding: 32px 24px;
	}
}`

Page.getInitialProps = context =>
	initialPropsWrapper<DetailsProps>(
		async ({ query }) => {
			const id = parseInt(query.id as string, 10)

			const bikeResponse = await BikeService.getById(id)

			if (bikeResponse && 'bike' in bikeResponse) {
				const { bike } = bikeResponse
				return {
					bike,
					error: '',
				}
			}
			return {
				bike: {} as BikeById,
				error:
					(bikeResponse as { error: string })?.error ??
					getLabels().errors.request.noRequest,
			}
		},
		Page,
		context
	)

Page.getLayout = page => <MainLayout>{page}</MainLayout>

Page.recoilSetter = ({ set }, { bike }) => {
	set(SelectedBikeAtom, bike)
}

export default Page
