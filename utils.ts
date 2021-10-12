import { utils } from 'near-api-js'

export function formatNear(amount: string) {
	return utils.format.formatNearAmount(amount, 2)
}
export function parseNear(amount: string) {
	return utils.format.parseNearAmount(amount)
}