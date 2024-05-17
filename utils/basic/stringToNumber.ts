const stringToNumber = (val: string) => {
	const num = parseInt(val ?? '0', 10)
	return Number.isNaN(num) ? 0 : num
}
export default stringToNumber
