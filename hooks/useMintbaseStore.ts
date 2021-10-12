import { useQuery } from "@apollo/client"
import { gql } from 'apollo-boost'
import { useEffect, useState } from "react"


export type Store = {
	id: string
	name: string
	symbol: string
	baseUri: string
	owner: string
	minters: {
		account: string
		enabled: string
	}[]
}

export type Thing = {
	id: string
	metadata: {
		title: string
		media: string
	}
	memo: string
	metaId: string
}

export const FETCH_STORE = gql`
  query FetchStore($storeId: String!, $limit: Int = 20, $offset: Int = 0) {
    store(where: { id: { _eq: $storeId } }) {
      id
      name
      symbol
      baseUri
      owner
      minters {
        account
        enabled
      }
      tokens(
        order_by: { thingId: asc }
        where: { storeId: { _eq: $storeId }, burnedAt: { _is_null: true } }
        limit: $limit
        offset: $offset
        distinct_on: thingId
      ) {
        id
        thingId
        thing {
          id
          metaId
          memo
          tokens {
            minter
          }
          metadata {
            title
            media
          }
        }
      }
    }
  }
`

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

		const things = data.store[0].tokens.map((token: any) => token.thing)

		setThings(things)
	}, [data])

	return {
		loading,
		store,
		nfts: things
	}
}