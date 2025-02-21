import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"

import { FormatCurrency } from "../../utils"
import { prismaClient } from "../../services/db"
import { useProductContext } from "../../contexts/ProductContext"

const TotalPurchase: React.FC = () => {
  const { listId, products } = useProductContext()
  const [totalPurchase, setTotalPurchase] = useState<number>(0)

  const handleGetTotal = async () => {
    try {
      if(!listId) return
      
      const total = await prismaClient.List.findUnique({
        where: {
          id: listId
        }
      })

      setTotalPurchase(total.total)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    handleGetTotal()
  }, [products])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Total da sua compra</Text>
      <Text style={styles.text}>{'R$ ' + FormatCurrency(totalPurchase)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    color: '#F2F2F2',
  }
})

export default TotalPurchase