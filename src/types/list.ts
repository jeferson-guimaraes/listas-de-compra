import { List } from "@prisma/client"
import { StyleProp, ViewStyle } from "react-native"

export interface ListProps{
	id: number
	name: string
	total: number
}

export interface ListsProps {
  data: List[],
  onNavigate: (id: string, nome: string) => void
  style?: StyleProp<ViewStyle>
}