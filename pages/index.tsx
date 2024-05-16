import Meta from '@components/Layouts/Meta'
import BaseContainer from '@components/Layouts/Main/Container'
import styled from '@emotion/styled'
import MainLayout from '@components/Layouts/Main'
import initialPropsWrapper from '@helpers/initialPropsWrapper'
import { NextPageWithProps } from '@interfaces/NextPage'

const Page: NextPageWithProps = () => (
	<>
		<Meta />
		<Container>Unifi Solutions Test</Container>
	</>
)

const Container = styled(BaseContainer)`
	display: grid;
	grid-auto-flow: row;
	grid-template-rows: auto;
	padding: 32px 100px;
	background-color: #e8efff;
	min-height: 100vh;
	gap: 32px;

	${({ theme }) => theme.adaptive.md} {
		padding: 32px 0;
	}
`

export const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`

Page.getInitialProps = context =>
	initialPropsWrapper(
		async () => ({
			bikes: [],
		}),
		Page,
		context
	)

Page.getLayout = page => <MainLayout>{page}</MainLayout>

Page.recoilSetter = () => {}

export default Page
