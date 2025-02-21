import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text, Button } from 'react-native'
import HeaderHomePage from "../../components/HeaderHomePage/HeaderHomePage"
import { NavigateProps } from "../../types/route"
import Lists from "../../components/Lists/Lists"
import { useListContext } from "../../contexts/ListContext"
import { useAlert } from "../../contexts/AlertContext"

const HomePage: React.FC<NavigateProps> = ({ navigation }) => {
  const { lists } = useListContext()
  const { showAlert } = useAlert()

  function navigate(id: string, name: string) {
    navigation.navigate('List', { id, name })
  }

  return (
    <View style={styles.container}>
      <HeaderHomePage />

      {lists.length > 0 ?
        <Lists
          data={lists}
          onNavigate={navigate}
          style={styles.listasArea}
        />
        :
        <View style={styles.container}>
					<Text style={styles.text}>Nenhuma lista cadastrado</Text>
				</View>
      }

      <Text style={styles.contador}>Listas cadastradas: {lists.length}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignSelf: 'center',
    width: '100%',
  },
  listasArea: {
    marginTop: 20,
  },
	text: {
		color: '#1d1d1d92',
		textAlign: 'center',
		marginTop: 20,
		fontSize: 16
	},
  contador: {
    color: '#020d3f9b',
    textAlign: 'right',
    marginRight: 20
  }
})

export default HomePage
