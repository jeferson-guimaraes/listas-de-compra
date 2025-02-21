import { Product } from '@prisma/client'
import { StyleProp, ViewStyle } from 'react-native'

export interface ProductsProps {
  data: Product[],
  style?: StyleProp<ViewStyle>
}

export interface AddProductProps{
  name: string,
  price: number,
  amount: number,
  totalPrice: number
}

export interface UpdateProductProps extends AddProductProps{
  id: number
}