import { useState, useEffect } from 'react'
import React, { StatusBar, Text } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from './src/pages/Home/HomePage'
import List from './src/pages/ShoppingList/ShoppingListPage'
import { RootStackParamList } from './src/types/route'
import { initializeDb } from './src/services/db'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ListProvider } from './src/contexts/ListContext'
import { SelectionModeProvider } from './src/contexts/SelectModeContext'
import { ProductProvider } from './src/contexts/ProductContext'
import { AlertProvider } from './src/contexts/AlertContext'
import AlertModal from './src/components/Modal/Alert/AlertModal'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false)

  useEffect(() => {
    const setup = async () => {
      await initializeDb()
      setDbInitialized(true)
    }

    setup()
  }, [])

  if (!dbInitialized) {
    return (
      <SafeAreaView>
        <Text>Carregando...</Text>
      </SafeAreaView>
    )
  }

  return (
    <SelectionModeProvider>
      <ListProvider>
        <ProductProvider>
          <AlertProvider>
            <AlertModal />
            <NavigationContainer>
              <StatusBar backgroundColor="#085e61" barStyle={'light-content'} />
              <Stack.Navigator>
                <Stack.Screen
                  name='Home'
                  component={Home}
                  options={{
                    headerShown: false
                  }}
                />

                <Stack.Screen
                  name='List'
                  component={List}
                  options={{
                    headerShown: false
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </AlertProvider>
        </ProductProvider>
      </ListProvider>
    </SelectionModeProvider>
  )
}