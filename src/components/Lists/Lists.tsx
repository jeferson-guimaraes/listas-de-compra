import { View, Text, StyleSheet, FlatList, Pressable } from "react-native"
import { List, Product } from '@prisma/client'
import { FormatCurrency } from "../../utils"
import { ListsProps } from "../../types/list"
import { useSelectionMode } from "../../contexts/SelectModeContext"
import { useEffect, useState } from "react"
import { prismaClient } from "../../services/db"

const Lists: React.FC<ListsProps> = ({ data, onNavigate }) => {
  const { isSelectionMode, selectedItems, toggleItemSelection } = useSelectionMode()
  const [itemsByList, setItemsByList] = useState<Record<number, Product[]>>({})

  function togglePress(item: List) {
    if (isSelectionMode) {
      toggleItemSelection(item)
    } else {
      onNavigate(String(item.id), item.name)
    }
  }

  function toggleLongPress(item: List) {
    if (!isSelectionMode) {
      toggleItemSelection(item)
    }
  }

  const fetchItems = async (listId: number) => {
    try {
      const products = await prismaClient.Product.findMany({
        where: { listId: listId }
      })
      setItemsByList(prevItems => ({ ...prevItems, [listId]: products }))
    } catch (error) {
      console.error("Erro ao buscar os itens:", error)
    }
  }

  useEffect(() => {
    data.forEach(list => {
      fetchItems(list.id)
    })
  }, [data])

  const Item = ({ item }: { item: List }) => {
    const isSelected = selectedItems.includes(item)
    const items = itemsByList[item.id] || []

    return (
      <Pressable
        onPress={() => togglePress(item)}
        onLongPress={() => toggleLongPress(item)}
        style={isSelected ? { backgroundColor: '#098a8f83' } : {}}
      >
        <View style={[styles.col]}>
          <View style={{ flex: 2.5 }}>
            <Text style={styles.titleLabel}>Lista</Text>
            <Text style={styles.label}>{item.name}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={styles.titleLabel}>Produtos</Text>
            <Text style={styles.label}>{items.length}</Text>
          </View>
          <View style={{ flex: 2, alignItems: 'flex-end' }}>
            <Text style={styles.titleLabel}>Preço Total</Text>
            <Text style={styles.label}>{item.total != null ? 'R$' + FormatCurrency(item.total) : ''}</Text>
          </View>
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
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={Item}
        keyExtractor={(item) => String(item.id)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  col: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'space-between'
  },
  label: {
    fontSize: 15,
    color: '#000000c5',
  },
  titleLabel: {
    color: '#33333378',
    fontSize: 10,
    marginBottom: 5
  }
})

export default Lists
