import React, { useEffect, useState } from "react"
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"

import FeatherIcon from 'react-native-vector-icons/Feather'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import AddItemModal from "../Modal/AddItem/AddItemModal"
import { useSelectionMode } from "../../contexts/SelectModeContext"
import RemoveProductModal from "../Modal/RemoveProductModal/RemoveProductModal"
import { Product } from "@prisma/client"
import NewPurchaseModal from "../Modal/NewPurchase/NewPurchaseModal"

interface HeaderListProps {
	listId: number
	listName: string
}

const HeaderShoppingListPage: React.FC<HeaderListProps> = ({ listId, listName }) => {
	const { selectedItems, isSelectionMode, toggleSelectionMode } = useSelectionMode<Product>()
	
	const [modalAddItemVisible, setModalAddItemVisible] = useState<boolean>(false)
	const [modalDeleteProductVisible, setModalDeleteProductVisible] = useState<boolean>(false)
	const [modalNewPurchaseVisible, setModalNewPurchaseVisible] = useState<boolean>(false)
	const [displayPlus, setDisplayPlus] = useState<'none' | 'flex'>('none')
	const [displayTrash, setDisplayTrash] = useState<'none' | 'flex'>('none')
	const [displayNewPurchase, setDisplayNewPurchase] = useState<'none' | 'flex'>('none')

	const navigation = useNavigation()

	useEffect(() => {
		selectedItems.length > 0 ? setDisplayTrash('flex') : setDisplayTrash('none')
		selectedItems.length > 0 ? setDisplayNewPurchase('none') : setDisplayNewPurchase('flex')
		selectedItems.length > 0 ? setDisplayPlus('none') : setDisplayPlus('flex')
	}, [selectedItems])

	function handleOpenModalAddProduct() {
		setModalAddItemVisible(true)
	}

	function handleOpenModalDeleteList() {
		setModalDeleteProductVisible(true)
	}

	function handleOpenModalNewPurchase() {
		setModalNewPurchaseVisible(true)
	}

	function goBack() {
		if (isSelectionMode) toggleSelectionMode()

		navigation.goBack()
	}

	return (
		<View style={styles.container}>
			<View style={styles.containerIconeVoltar}>
				<TouchableOpacity
					onPress={goBack}
				>
					<AntDesignIcon
						name="arrowleft"
						size={30}
						color="#F2F2F2"
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.tituloContainer}>
				<ScrollView
					horizontal={true} // Habilita o scroll horizontal
					contentContainerStyle={styles.scrollContent} // Estilo para os itens no scroll
					showsHorizontalScrollIndicator={false} // Remove a barra de rolagem
				>
					<Text style={styles.tituloTexto}>{listName}</Text>
				</ScrollView>
			</View>

			<View style={styles.iconeArea}>
				<TouchableOpacity
					onPress={handleOpenModalDeleteList}
					style={{ display: displayTrash }}
				>
					<FeatherIcon
						name="trash-2"
						size={30}
						color="#F2F2F2"
					/>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={handleOpenModalAddProduct}
					style={{ display: displayPlus }}
				>
					<FeatherIcon
						name="plus"
						size={30}
						color="#F2F2F2"
					/>
				</TouchableOpacity>

				<TouchableOpacity
				onPress={handleOpenModalNewPurchase}
				style={{ display: displayNewPurchase }}
				>
					<MaterialIcon
						name="add-shopping-cart"
						size={30}
						color="#F2F2F2"
					/>
				</TouchableOpacity>
			</View>

			<Modal
				visible={modalAddItemVisible}
				animationType='fade'
				transparent={true}
			>
				<AddItemModal handleClose={() => setModalAddItemVisible(false)} />
			</Modal>

			<Modal
				visible={modalDeleteProductVisible}
				animationType='fade'
				transparent={true}
			>
				<RemoveProductModal items={selectedItems} handleClose={() => setModalDeleteProductVisible(false)} />
			</Modal>

			<Modal
				visible={modalNewPurchaseVisible}
				animationType='fade'
				transparent={true}
			>
				<NewPurchaseModal id={listId} handleClose={() => setModalNewPurchaseVisible(false)} />
			</Modal>

		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: '#085e61',
		height: 60,
		paddingHorizontal: 10,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	containerIconeVoltar:{
		maxWidth: '10%'
	},
	scrollContent: {
    flexDirection: 'row',
		alignItems: 'center'
  },
	tituloContainer: {
		maxWidth: '65%',
		overflow: 'scroll'
	},
	tituloTexto: {
		fontSize: 22,
		color: '#F2F2F2',
		fontWeight: 'bold'
	},
	iconeArea: {
		flexDirection: 'row',
		gap: 15,
		alignContent: 'center'
	},
	icone: {
		fontSize: 20,
	}
})

export default HeaderShoppingListPage