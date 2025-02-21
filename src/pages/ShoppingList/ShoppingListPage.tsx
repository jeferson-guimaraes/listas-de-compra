import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native'

import HeaderListPage from "../../components/HeaderShoppingListPage/HeaderListPage"

import { ListScreenRouteProp } from '../../types/route'
import ShoppingList from "../../components/ShoppingList/ShoppingLists"
import TotalPurchase from "../../components/TotalPurchase/TotalPurchase"
import { useProductContext } from "../../contexts/ProductContext"

const ListPage: React.FC = () => {
	const route = useRoute<ListScreenRouteProp>();
	const { products, setListId } = useProductContext()

	useEffect(() => {
		if (route.params?.id) {
			setListId(parseInt(route.params.id))
		}
	}, [])

	return (
		<View style={styles.jumbotrom}>
			<HeaderListPage listId={Number(route.params?.id)} listName={route.params?.name} />

			{products.length > 0 ?
				<View style={styles.container}>
					<ShoppingList
						data={products}
					/>
				</View>
				:
				<View style={styles.container}>
					<Text style={styles.text}>Nenhum produto cadastrado nesta lista</Text>
				</View>
			}

			<TotalPurchase />
			<Text style={styles.contador}>Produtos na lista: {products.length}</Text>

		</View>
	)
}

const styles = StyleSheet.create({
	jumbotrom: {
		flex: 1,
		backgroundColor: '#085e61',
		alignContent: 'center',
	},
	container: {
		flex: 1,
		width: '100%',
		alignSelf: 'center',
		backgroundColor: '#f2f2f2'
	},
	text: {
		color: '#1d1d1d92',
		textAlign: 'center',
		marginTop: 20,
		fontSize: 16
	},
	contador: {
		color: '#dff7f892',
		textAlign: 'right',
		paddingRight: 10
	}
})

export default ListPage;