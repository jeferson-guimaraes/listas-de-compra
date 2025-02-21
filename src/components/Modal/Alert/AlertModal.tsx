import { Modal, Pressable, StyleSheet, Text, View } from "react-native"
import { useAlert } from "../../../contexts/AlertContext"

const AlertModal: React.FC = () => {
  const { isVisible, title, message, closeAlert } = useAlert()

  if (!isVisible) return null; // Não renderiza nada se o modal não estiver visível

  return (
    <Modal
      visible={isVisible}
      animationType='fade'
      transparent={true}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{message}</Text>
          <View style={styles.footer}>
            <Pressable style={styles.button} onPress={closeAlert}>
              <Text style={styles.buttonCancelText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
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
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center'
  },
  text: {
    color: '#000',
    fontSize: 17,
    marginTop: 20,
    paddingHorizontal: 20,
    textAlign: 'center'
  },
  footer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    justifyContent: 'center'
  },
  buttonCancelText: {
    fontSize: 18,
    color: "#000000ae",
    textDecorationLine: 'underline'
  },
})

export default AlertModal