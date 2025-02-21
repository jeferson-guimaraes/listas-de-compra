import React, { useEffect, useState } from "react"
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import FeatherIcon from 'react-native-vector-icons/Feather'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'

import NewListModal from "../Modal/NewList/NewListModal"
import RemoveListModal from "../Modal/RemoveListModal/RemoveListModal"
import UpdateListModal from "../Modal/UpdateList/UpdateListModal"
import { useSelectionMode } from "../../contexts/SelectModeContext"
import { List } from "@prisma/client"

const HeaderHomePage: React.FC = () => {
	const {selectedItems} = useSelectionMode<List>()
	const [modalNewListVisible, setModalNewListVisible] = useState<boolean>(false)
	const [modalUpdateListVisible, setModalUpdateListVisible] = useState<boolean>(false)
	const [modalDeleteListVisible, setModalDeleteListVisible] = useState<boolean>(false)

	const [displayTrash, setDisplayTrash] = useState<'none' | 'flex'>('none')
	const [displayEdit, setDisplayEdit] = useState<'none' | 'flex'>('none')

	useEffect(() => {
		selectedItems.length > 0 ? setDisplayTrash('flex') : setDisplayTrash('none')
		selectedItems.length == 1 ? setDisplayEdit('flex') : setDisplayEdit('none')
	}, [selectedItems])

	function handleOpenModalNewList() {
		setModalNewListVisible(true)
	}

	function handleOpenModalDeleteList() {
		setModalDeleteListVisible(true)
	}

	function handleOpenModalUpdateList() {
		setModalUpdateListVisible(true)
	}

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.titulo}>Marcaê</Text>
			</View>

			<View style={styles.iconeArea}>
				<TouchableOpacity
					onPress={handleOpenModalUpdateList}
					style={{ display: displayEdit }}
				>
					<AntDesignIcon
						name="edit"
						size={30}
						color="#F2F2F2"
					/>
				</TouchableOpacity>

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
					onPress={handleOpenModalNewList}
				>
					<FeatherIcon
						name="plus"
						size={30}
						color="#F2F2F2"
					/>
				</TouchableOpacity>
			</View>

			<Modal
				visible={modalNewListVisible}
				animationType='fade'
				transparent={true}
			>
				<NewListModal handleClose={() => setModalNewListVisible(false)} />
			</Modal>

			<Modal
				visible={modalUpdateListVisible}
				animationType='fade'
				transparent={true}
			>
				<UpdateListModal item={selectedItems[0]} handleClose={() => setModalUpdateListVisible(false)} />
			</Modal>

			<Modal
				visible={modalDeleteListVisible}
				animationType='fade'
				transparent={true}
			>
				<RemoveListModal items={selectedItems} handleClose={() => setModalDeleteListVisible(false)} />
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
	titulo: {
		fontSize: 25,
		color: '#F2F2F2',
		fontWeight: 'bold'
	},
	iconeArea: {
		flexDirection: 'row',
		gap: 15,
		alignContent: 'center'
	}
})

export default HeaderHomePage