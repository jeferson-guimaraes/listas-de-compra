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
  StyleSheet,
} from "react-native"

import CurrencyInput from 'react-native-currency-input'

import { FormatCurrency } from '../../../utils'
import { useProductContext } from "../../../contexts/ProductContext"
import { useSelectionMode } from "../../../contexts/SelectModeContext"
import { useAlert } from "../../../contexts/AlertContext"

interface ModalProps {
  handleClose: () => void
}

const AddItemModal: React.FC<ModalProps> = ({ handleClose }) => {
  const { showAlert } = useAlert()
  const inputProduct = useRef<TextInput>(null)
  const inputAmount = useRef<TextInput>(null)
  const inputPrice = useRef<TextInput>(null)

  const [product, setProduct] = useState('')
  const [amount, setAmount] = useState<string>('')
  const [price, setPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState('0,00')

  const { addProduct } = useProductContext()
  const { clearSelection } = useSelectionMode()

  const handlePriceChange = (value: number | null) => {
    setPrice(value ?? 0)
  }

  const handleCreate = () => {
    if (product.length < 1 || amount.length < 1) {
      showAlert('Opa!', 'O nome e a quantidade do produto devem ser preenchidos')
      return
    }

    addProduct({
      name: product.trim(),
      price,
      amount: parseInt(amount),
      totalPrice: parseFloat(totalPrice)
    })

    setProduct('')
    setAmount('')
    setPrice(0)
    clearSelection()
    inputProduct.current?.focus()
  }

  useEffect(() => {
    if (price > 0) {
      let formatedValue = price.toString().replace(/[^\d.,]/g, '')
      formatedValue = formatedValue.replace(',', '.')
      setPrice(parseFloat(formatedValue))
    }

    const amountNumber = parseInt(amount || '0', 10)

    if (!isNaN(price) && (!isNaN(amountNumber))) {
      const tot = price * amountNumber
      setTotalPrice(tot.toFixed(2))
    }

  }, [amount, price])

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
          <Text style={styles.title}>Adicionar Produto</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Produto</Text>
            <TextInput
              ref={inputProduct}
              style={styles.input}
              placeholderTextColor="#888"
              value={product}
              autoFocus={true}
              placeholder="Ex: Arroz"
              onChangeText={(text) => setProduct(text)}
            />

            <Text style={styles.label}>Quantidade</Text>
            <TextInput
              ref={inputAmount}
              style={styles.input}
              keyboardType="numeric"
              value={amount}
              onChangeText={(value) => setAmount(value)}
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
            <Text style={styles.label}>R${FormatCurrency(totalPrice)}</Text>

            <View style={styles.footer}>

              <Pressable onPress={handleClose}>
                <Text style={styles.buttonCancelText}>Cancelar</Text>
              </Pressable>
              <TouchableOpacity
                style={styles.buttonAdd}
                onPress={handleCreate}
              >
                <Text style={styles.buttonAddText}>Adicionar</Text>
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
    justifyContent: "center",
  },
  content: {
    backgroundColor: "#f2f2f2",
    width: "80%",
    paddingTop: 24,
    paddingBottom: 12,
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
    color: '#000000e6',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  input: {
    color: '#000000b7',
    borderBottomColor: "#000000e6",
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
    textDecorationLine: 'underline',
  },
  buttonAdd: {
    backgroundColor: "#085e61",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 20,
  },
  buttonAddText: {
    color: "#FFF",
    fontSize: 20,
  },
})

export default AddItemModal
