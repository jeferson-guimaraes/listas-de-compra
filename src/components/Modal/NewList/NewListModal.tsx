import { useEffect, useReducer, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Keyboard
} from "react-native";
import { useListContext } from "../../../contexts/ListContext";
import { useSelectionMode } from "../../../contexts/SelectModeContext";
import { useAlert } from "../../../contexts/AlertContext";

interface ModalProps {
  handleClose: () => void;
}

const AddListModal: React.FC<ModalProps> = ({ handleClose }) => {
  const { showAlert } = useAlert()
  const { createList } = useListContext()
  const { clearSelection } = useSelectionMode()
  const inputName = useRef<TextInput>(null)

  const [name, setName] = useState<string>('')

  const handleCreate = async () => {
    if (String(name).trim().length < 1) {
      showAlert('Opa!', 'O nome da lista deve ser preenchido')
      return
    }

    createList(name)
    clearSelection()
    setName('')
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
          <Text style={styles.title}>Nova Lista</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              ref={inputName}
              style={styles.input}
              value={name}
              autoFocus={true}
              placeholder="Ex: Mercado X"
              placeholderTextColor="#888"
              onChangeText={(text) => setName(text)}
            />

            <View style={styles.footer}>

              <Pressable style={styles.button} onPress={handleClose}>
                <Text style={styles.buttonCancelText}>Cancelar</Text>
              </Pressable>
              <TouchableOpacity
                style={[styles.button, styles.buttonCreate]}
                onPress={handleCreate}
              >
                <Text style={styles.buttonCreateText}>Adicionar</Text>
              </TouchableOpacity>

            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

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
    borderBottomColor: "#000000b7",
    color: '#000000e6',
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
  buttonCancelText: {
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
});

export default AddListModal;
