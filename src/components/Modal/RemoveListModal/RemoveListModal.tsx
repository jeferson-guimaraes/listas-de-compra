import { View, Text, Pressable, TouchableOpacity, TextInput, StyleSheet } from "react-native";

import { List } from '@prisma/client'
import { useListContext } from "../../../contexts/ListContext";
import { useSelectionMode } from "../../../contexts/SelectModeContext";

interface RemoveListModalProps {
  items: List[]
  handleClose: () => void
}

const RemoveListModal: React.FC<RemoveListModalProps> = ({ items, handleClose }) => {
  const { removeList } = useListContext()
  const { clearSelection } = useSelectionMode()

  function handleRemove() {
    removeList(items)
    clearSelection()
    handleClose()
  }

  let renderedData = []
  renderedData = items.map((item, index) => (
    `${item.name}`
  ))

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Deletar esta lista?</Text>
        <View style={styles.form}>
          <Text style={styles.label}>{renderedData.join('\n')}</Text>
          <View style={styles.footer}>
            <Pressable
              style={styles.button}
              onPress={handleClose}
            >
              <Text style={styles.buttonCancelText}>Cancelar</Text>
            </Pressable>
            <TouchableOpacity
              style={[styles.button, styles.buttonCreate]}
              onPress={() => handleRemove()}
            >
              <Text style={styles.buttonCreateText}>Remover</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(24, 24, 24, .6)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#FFF',
    width: '80%',
    paddingTop: 24,
    paddingBottom: 12,
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#085e61'
  },
  form: {
    width: '90%',
    alignSelf: 'center'
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center'
  },
  label: {
    color: '#000000e6',
    fontSize: 22,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center'
  },
  footer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    justifyContent: 'center'
  },
  buttonCancelText: {
    fontSize: 18,
    color: "#000000ae",
    textDecorationLine: 'underline'
  },
  buttonCreate: {
    backgroundColor: '#085e61',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 20
  },
  buttonCreateText: {
    color: '#FFF',
    fontSize: 20
  }
})

export default RemoveListModal