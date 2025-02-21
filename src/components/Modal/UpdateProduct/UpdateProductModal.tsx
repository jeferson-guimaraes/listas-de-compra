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

import { Product } from "@prisma/client"
import { useProductContext } from "../../../contexts/ProductContext"
import CurrencyInput from "react-native-currency-input"
import { FormatCurrency } from "../../../utils"
import { useSelectionMode } from "../../../contexts/SelectModeContext"
import { useAlert } from "../../../contexts/AlertContext"

interface ModalProps {
  product: Product
  handleClose: () => void
}

const UpdateProductModal: React.FC<ModalProps> = ({ handleClose, product }) => {
  const { showAlert } = useAlert()
  const { updateProduct } = useProductContext()
  const { clearSelection } = useSelectionMode()
  const inputProduct = useRef<TextInput>(null)
  const inputAmount = useRef<TextInput>(null)
  const inputPrice = useRef<TextInput>(null)

  const [name, setName] = useState('')
  const [amount, setAmount] = useState<number | string>(0)
  const [price, setPrice] = useState<number>(0)
  const [totalPrice, setTotalPrice] = useState<number>(0)

  useEffect(() => {
    setName(product.name || '')
    setAmount(product.amount || 0)
    setPrice(product.price ?? 0)
  }, [product])

  useEffect(() => {
    if (!amount) return
    const total = parseFloat(amount as string) * price
    setTotalPrice(total)
  }, [amount, price])

  const handlePriceChange = (value: number | null) => {
    setPrice(value ?? 0)
  }

  const handleUpdate = async () => {
    if (name.length < 1 || String(amount).length < 1) {
      showAlert('Opa!', 'O nome e a quantidade do produto devem ser preenchidos')
      return
    }

    await updateProduct({
      id: product.id,
      name,
      amount: Number(amount),
      price,
      totalPrice
    })

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
          <Text style={styles.title}>Atualizar Produto</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Produto</Text>
            <TextInput
              ref={inputProduct}
              style={styles.input}
              placeholderTextColor="#888"
              value={name}
              autoFocus={true}
              placeholder="Ex: Arroz"
              onChangeText={(text) => setName(text)}
            />

            <Text style={styles.label}>Quantidade</Text>
            <TextInput
              ref={inputAmount}
              style={styles.input}
              keyboardType="numeric"
              value={String(amount)}
              onChangeText={(value) => setAmount(value ? parseInt(value) : '')}
            />

            <Text style={styles.label}>Preço unitário</Text>
            <CurrencyInput
              ref={inputPrice}
              value={price}
              onChangeValue={handlePriceChange}
              renderTextInput={textInputProps => <TextInput {...textInputProps} />}
              prefix="R$"
              delimiter="."
              separator=","
              precision={2}
              style={styles.input}
            />

            <Text style={styles.label}>Valor Total</Text>
            <Text style={styles.label}>R$ {FormatCurrency(totalPrice)}</Text>

            <View style={styles.footer}>
              <Pressable onPress={handleClose}>
                <Text style={styles.buttonCancelText}>Cancelar</Text>
              </Pressable>
              <TouchableOpacity
                style={styles.buttonUpdate}
                onPress={handleUpdate}
              >
                <Text style={styles.buttonUpdateText}>Atualizar</Text>
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
  buttonCancelText: {
    fontSize: 18,
    color: "#000000ae",
    textDecorationLine: 'underline'
  },
  buttonUpdate: {
    backgroundColor: "#085e61",
    paddingHorizontal:20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buttonUpdateText: {
    color: "#FFF",
    fontSize: 20,
  },
})

export default UpdateProductModal
