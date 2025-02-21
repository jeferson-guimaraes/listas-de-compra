import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react'
import { Vibration } from 'react-native'

// Define o tipo do contexto com um tipo genérico T
interface SelectionModeContextProps<T> {
  isSelectionMode: boolean
  selectedItems: T[]
  toggleSelectionMode: () => void
  toggleItemSelection: (item: T) => void
  clearSelection: () => void
}

// Cria o contexto com valor inicial nulo e um tipo genérico T
const SelectionModeContext = createContext<SelectionModeContextProps<any> | null>(null)

// Define o tipo das props do Provider com o tipo genérico T
interface SelectionModeProviderProps<T> {
  children: ReactNode
}

// Hook personalizado para usar o contexto com um tipo genérico T
export const useSelectionMode = <T,>() => {
  const context = useContext(SelectionModeContext as React.Context<SelectionModeContextProps<T> | null>)
  if (!context) {
    throw new Error('useSelectionMode must be used within a SelectionModeProvider')
  }
  return context
}

// Função para gerenciar a vibração quando o modo de seleção é ativado
const handleVibration = (isSelectionMode: boolean, selectedItems: any[]) => {
  if (selectedItems.length >= 1 && !isSelectionMode) {
    Vibration.vibrate(100)
  }
}

// Componente Provider genérico para encapsular a aplicação
export const SelectionModeProvider = <T,>({ children }: SelectionModeProviderProps<T>) => {
  const [isSelectionMode, setIsSelectionMode] = useState(false)
  const [selectedItems, setSelectedItems] = useState<T[]>([])

  // Ativa/desativa o modo de seleção e limpa os itens selecionados se desativado
  const toggleSelectionMode = () => {
    setIsSelectionMode((prev) => {
      const newMode = !prev
      if (!newMode) {
        setSelectedItems([])
      }
      return newMode
    })
  }

  // Adiciona/remove um item da lista de selecionados
  const toggleItemSelection = (item: T) => {
    setSelectedItems((prev) =>
      prev.includes(item)
        ? prev.filter((selected) => selected !== item)
        : [...prev, item]
    )
  }

  useEffect(() => {
    handleVibration(isSelectionMode, selectedItems)
    setIsSelectionMode(selectedItems.length >= 1)
  }, [selectedItems])

  // Remove todos os itens selecionados e desativa o modo seleção
  const clearSelection = () => {
    setSelectedItems([])
    setIsSelectionMode(false)
  }

  return (
    <SelectionModeContext.Provider
      value={{
        isSelectionMode,
        selectedItems,
        toggleSelectionMode,
        toggleItemSelection,
        clearSelection,
      }}
    >
      {children}
    </SelectionModeContext.Provider>
  )
}
