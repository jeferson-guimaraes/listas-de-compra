import { View, Text, StyleSheet, FlatList, Pressable, Modal } from "react-native"
import { Product } from '@prisma/client'
import { FormatCurrency } from "../../utils"
import { ProductsProps } from "../../types/product"
import { useSelectionMode } from "../../contexts/SelectModeContext"
import UpdateProductModal from "../Modal/UpdateProduct/UpdateProductModal"
import { useState } from "react"

const ShoppingList: React.FC<ProductsProps> = ({ data }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [modalUpdateProductVisible, setModalUpdateProductVisible] = useState<boolean>(false)
  const { isSelectionMode, selectedItems, toggleItemSelection } = useSelectionMode<Product>()

  function togglePress(product: Product) {
    if (!isSelectionMode) {
      setSelectedProduct(product)
      setModalUpdateProductVisible(true)
    } else {
      toggleItemSelection(product)
    }
  }

  function toggleLongPress(item: Product) {
    if (!isSelectionMode) {
      toggleItemSelection(item)
    }
  }

  const Item = ({ item }: { item: Product }) => {
    const isSelected = selectedItems.includes(item);

    return (
      <Pressable
        onPress={() => togglePress(item)}
        onLongPress={() => toggleLongPress(item)}
        style={[
          styles.row,
          isSelected ? { backgroundColor: '#098a8f83' } : {},
        ]}
      >
        <View style={[styles.col, { flex: .7 }]}>
          <Text style={styles.titleLabel}>Qnt</Text>
          <Text style={[
            styles.label,
          ]}
          >
            {item.amount}
          </Text>
        </View>
        <View style={[styles.col, { flex: 3 }]}>
          <Text style={styles.titleLabel}>Produto</Text>
          <Text style={[
            styles.label,
          ]}
          >
            {item.name}
          </Text>
        </View>
        <View style={[styles.col, { flex: 1.5 }]}>
          <Text style={styles.titleLabel}>Preço</Text>
          <Text
            style={[
              styles.label,
            ]}
          >
            {item.price != 0 ? 'R$ ' + FormatCurrency(item.price) : '--'}
          </Text>
        </View>
        <View style={[styles.col, { flex: 1.5, alignItems: 'flex-end' }]}>
          <Text style={styles.titleLabel}>Total</Text>
          <Text
            style={[
              styles.label,
            ]}
          >
            {item.totalPrice != 0 ? 'R$ ' + FormatCurrency(item.totalPrice) : '--'}</Text>
        </View>
      </Pressable>
    )
  }

  const Separator = () =>
    <View
      style={{
        flex: 1,
        height: .5,
        backgroundColor: '#063d3f',
        width: '70%',
        alignSelf: 'center',
      }}
    />

  return (
    <View style={{ flex: 1, marginBottom: 10 }}>
      <FlatList
        data={data}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={Item}
        keyExtractor={(item) => String(item.id)}
      />

      <Modal
        visible={modalUpdateProductVisible}
        animationType='fade'
        transparent={true}
      >
        {selectedProduct && (
          <UpdateProductModal product={selectedProduct} handleClose={() => setModalUpdateProductVisible(false)} />
        )}
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  col: {
    paddingVertical: 15,
  },
  titleLabel: {
    color: '#33333378',
    fontSize: 10,
    marginBottom: 5
  },
  label: {
    fontSize: 15,
    color: '#000000c5',
    fontWeight: 'semibold'
  }
})

export default ShoppingList