import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { List } from '@prisma/client'
import { prismaClient } from '../services/db'
import { compareItems } from '../utils'

interface ListContextProps {
  lists: List[]
  setLists: React.Dispatch<React.SetStateAction<List[]>>
  fetchLists: () => void
  fetchSingleList: (id: number) => Promise<void>
  createList: (Items: string) => Promise<void>
  updateList: (id: number, name: string) => Promise<void>
  removeList: (Items: List[]) => Promise<void>
}

const ListContext = createContext<ListContextProps | undefined>(undefined)

export const ListProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lists, setLists] = useState<List[]>([])

  const fetchLists = async () => {
    try {
      const listsFound = await prismaClient.List.findMany()
      setLists(listsFound.sort(compareItems))
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    fetchLists()
  }, [])

  const fetchSingleList = useCallback(async (id: number) => {
    try {
      const updatedList = await prismaClient.List.findUnique({ where: { id } })
      setLists(prevLists => prevLists.map(list => (list.id === id ? updatedList : list)))
    } catch (err) {
      console.log(err)
    }
  }, [])

  const createList = async (name: string) => {
    const newList = await prismaClient.List.create({
      data: {
        name: name.trim()
      }
    })

    setLists(prevLists => {
      const updatedLists = [...prevLists, newList]
      return updatedLists.sort(compareItems)
    })
  }

  const updateList = async (id: number, name: string) => {
    try {
      const updatedList = await prismaClient.List.update({
        where: {
          id
        },
        data: {
          name: name.trim()
        }
      })

      setLists(prevLists => {
        const updatedLists = prevLists.map(list =>
          list.id === id ? updatedList : list
        )
        return updatedLists.sort(compareItems)
      })
    }catch(err){
      console.log(err)
    }
  }

  const removeList = async (items: List[]) => {
    try{
      for (const item of items) {
        await prismaClient.list.delete({
          where: {
            id: item.id
          }
        })

        setLists(prevLists => prevLists.filter(list => String(list.id) !== String(item.id)))
      }
    }catch(err){
      console.log("Erro ao deletar lista " + err)
    }
  }

  return (
    <ListContext.Provider value={{ lists, setLists, fetchLists, fetchSingleList, createList, updateList, removeList }}>
      {children}
    </ListContext.Provider>
  )
}

export const useListContext = () => {
  const context = useContext(ListContext)
  if (!context) {
    throw new Error('useListContext must be used within a ListProvider')
  }
  return context
}
