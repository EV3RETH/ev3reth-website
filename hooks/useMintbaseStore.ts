import { useQuery } from "@apollo/client"
import { gql } from 'apollo-boost'
import { Wallet } from "mintbase"
import { useEffect, useState } from "react"


export type Store = {
	id: string
	name: string
}

export type Thing = {
	tokenId: string;
	id: string
	tokens: Token[]
	storeId: string;
	metadata: {
		title: string
		media: string
		description: string
		animation_url: string
	}
}

type Token = {
	id: string
	list: {
		price: string
		ownerId: string
	}
	holder: string;
}

const FETCH_STORE = gql`
  query FetchStore($storeId: String!, $limit: Int = 20, $offset: Int = 0) {
		store(where: {id: {_eq: $storeId}}) {
			name
			id
			tokens(order_by: {thingId: asc}, where: {storeId: {_eq: $storeId}, burnedAt: {_is_null: true}, list: {removedAt: {_is_null: true}}}, limit: $limit, offset: $offset, distinct_on: thingId) {
				id
				thing {
					id
					storeId
					tokens(distinct_on: id, where: {list: {removedAt: {_is_null: true}}}) {
						id
						list {
							price
							ownerId
						}
						holder
					}
					metadata {
						title
						media
						animation_url
						description
					}
				}
			}
		}
  }
`

export const buy = (wallet: Wallet, tokenID: string, tokenPrice: string) => {
	const tokenPriceNumber = Number(tokenPrice);
	tokenPrice = (tokenPriceNumber).toLocaleString('fullwide', { useGrouping: false })

	// create marketAddress env variable for testnet/mainnet
	// wallet?.makeOffer(tokenID,tokenPrice,{ marketAddress: process.env.marketAddress})
	wallet?.makeOffer(tokenID, tokenPrice)
}

export default function useMintbaseStore({ storeId }: { storeId: string }) {
	const [store, setStore] = useState<Store | null>(null)
	const [things, setThings] = useState<Thing[] | []>([])

	const { data, loading } = useQuery(FETCH_STORE, {
		variables: {
			storeId: storeId,
			limit: 10,
			offset: 0,
		},
	})

	useEffect(() => {
		if (!data) return

		if (data?.store.length === 0) return

		setStore({
			...data.store[0],
		})

		const things = data.store[0].tokens.map((token: any) => (
			{
				...token.thing,
				tokenId: token.id
			}
		))

		setThings(things)
	}, [data])

	return {
		loading,
		store,
		nfts: things
	}
}