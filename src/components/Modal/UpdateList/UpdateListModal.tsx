import { useEffect, useRef, useState } from "react"
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet
} from "react-native"

import { useListContext } from "../../../contexts/ListContext"
import { List } from "@prisma/client"
import { useSelectionMode } from "../../../contexts/SelectModeContext"
import { useAlert } from "../../../contexts/AlertContext"

interface ModalProps {
  item: List
  handleClose: () => void
}

const UpdateListModal: React.FC<ModalProps> = ({ handleClose, item }) => {
  const { showAlert } = useAlert()
  const { updateList } = useListContext()
  const { clearSelection } = useSelectionMode()
  const inputName = useRef<TextInput>(null)

  const [name, setName] = useState<string>('')

  useEffect(() => {
    if (item && item.name) {
      setName(item.name);
    }
  }, [item])

  const handleUpdate = async () => {
    if (String(name).trim().length < 1) {
      showAlert('Opa!', 'O nome da lista deve ser preenchido')
      return
    }

    await updateList(item.id, name)

    clearSelection()
    handleClose()
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
        keyboardVerticalOffset={60}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Renomear Lista</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              ref={inputName}
              style={styles.input}
              defaultValue={name}
              autoFocus={true}
              placeholder="Ex: Mercado X"
              placeholderTextColor="#888"
              onChangeText={(text) => setName(text)}
            />

            <View style={styles.footer}>
              <Pressable style={styles.button} onPress={handleClose}>
                <Text style={styles.buttonFecharText}>Cancelar</Text>
              </Pressable>
              <TouchableOpacity
                style={[styles.button, styles.buttonCreate]}
                onPress={handleUpdate}
              >
                <Text style={styles.buttonCreateText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(24, 24, 24, .6)",
    flex: 1,
    alignItems: 'center',
    justifyContent: "center"
  },
  content: {
    backgroundColor: "#f2f2f2",
    width: "80%",
    paddingTop: 24,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#085e61",
  },
  scrollViewContent: {
    paddingVertical: 10,
    paddingBottom: 30,
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#000000e6",
    textAlign: "center",
  },
  form: {
    width: "90%",
    alignSelf: "center",
  },
  label: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#000000e6"
  },
  input: {
    color: "#000000b7",
    borderBottomColor: "#0000005e",
    borderBottomWidth: 1,
    height: 50,
    fontSize: 20,
  },
  footer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    justifyContent: 'center'
  },
  buttonFecharText: {
    fontSize: 18,
    color: "#000000ae",
    textDecorationLine: 'underline'
  },
  buttonCreate: {
    backgroundColor: "#085e61",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 20,
  },
  buttonCreateText: {
    color: "#FFF",
    fontSize: 20,
  },
})

export default UpdateListModal
