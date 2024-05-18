import Meta from '@components/Layouts/Meta'
import styled from '@emotion/styled'
import BaseContainer from '@components/Layouts/Main/Container'
import MainLayout from '@components/Layouts/Main'
import initialPropsWrapper from '@helpers/initialPropsWrapper'
import { NextPageWithProps } from '@interfaces/NextPage'
import pages from '@constants/pages'
import BikeService from '@api/Models/Bikes'
import { SelectedBikeAtom } from '@atoms/Bikes'
import Details from '@components/Pages/Details'
import { useRecoilValue } from 'recoil'

const Page: NextPageWithProps = () => {
	const bike = useRecoilValue(SelectedBikeAtom)

	return (
		<>
			<Meta title={bike.title} />
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
	initialPropsWrapper(
		async ({ query }) => {
			const id = parseInt(query.id as string, 10)

			if (!id) {
				return {
					redirect: pages.dashboard.url,
				}
			}

			const bikeResponse = await BikeService.getById(id)

			if (bikeResponse && 'redirect' in bikeResponse) {
				const { redirect } = bikeResponse
				return {
					redirect,
				}
			}

			if (bikeResponse && 'bike' in bikeResponse) {
				const { bike } = bikeResponse
				return {
					bike,
				}
			}

			return {
				error: (bikeResponse as { error: unknown })?.error ?? 'error',
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
