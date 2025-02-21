import React, { createContext, useContext, useEffect, useState } from "react"
import { Product } from "@prisma/client"
import { prismaClient } from "../services/db"
import { compareItems, normalizeString } from "../utils"
import { AddProductProps, UpdateProductProps } from "../types/product"
import { useListContext } from "./ListContext"

interface ProductContextProps {
	products: Product[]
	setProducts: React.Dispatch<React.SetStateAction<Product[]>>
	fetchProducts: () => void
	addProduct: ({ name, price, amount, totalPrice }: AddProductProps) => Promise<void>
	updateProduct: ({ id, name, price, amount, totalPrice }: UpdateProductProps) => Promise<void>
	removeProduct: (Items: Product[]) => Promise<void>
	newPurchase: (id: number) => Promise<void>
	listId: number | null
	setListId: React.Dispatch<React.SetStateAction<number | null>>
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined)

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [products, setProducts] = useState<Product[]>([])
	const [listId, setListId] = useState<number | null>(null)

	const { fetchSingleList } = useListContext()

	const fetchProducts = async () => {
		if (listId === null) return

		try {
			const ProductsFound = await prismaClient.Product.findMany({
				where: {
					listId: listId
				},
				orderBy: {
					name: 'asc'
				}
			})

			const normalizedProducts = ProductsFound.sort((a: any, b: any) => {
				const nameA = normalizeString(a.name)
				const nameB = normalizeString(b.name)
				return nameA.localeCompare(nameB)
			})

			setProducts(normalizedProducts)
		} catch (error) {
			console.error("Failed to fetch products:", error)
		}
	}

	const handleUpdateTotal = async () => {
		if (listId === null) return

		try {
			const newTotal = products.reduce((acc, product) => acc + product.totalPrice, 0)

			await prismaClient.List.update({
				where: { id: listId },
				data: { total: newTotal }
			})
		} catch (error) {
			console.error("Failed to update total:", error)
		}
	}

	useEffect(() => {
		handleUpdateTotal()
	}, [products])

	useEffect(() => {
		fetchProducts()
	}, [listId])

	const addProduct = async ({ name, price, amount, totalPrice }: AddProductProps) => {
		try {
			const newProduct = await prismaClient.Product.create({
				data: {
					name: name,
					price: price,
					amount: amount,
					totalPrice: totalPrice,
					listId: listId
				}
			})

			setProducts(prev => {
				const updatedProducts = [...prev, newProduct]
				return updatedProducts.sort(compareItems)
			})
			fetchSingleList(Number(listId))
		} catch (error) {
			console.error("Failed to add product:", error)
		}
	}

	const updateProduct = async ({ id, name, price, amount, totalPrice }: UpdateProductProps) => {
		try {
			const updatedProduct = await prismaClient.Product.update({
				where: {
					id
				},
				data: {
					name,
					price,
					amount,
					totalPrice
				}
			})

			setProducts(prevProducts => {
				const updatedProducts = prevProducts.map(product =>
					product.id === id ? updatedProduct : product
				)
				return updatedProducts.sort(compareItems)
			})
			fetchSingleList(Number(listId))
		} catch (error) {
			console.log("Failed to update product:", error)
		}
	}

	const removeProduct = async (items: Product[]) => {
		for (const item of items) {
			await prismaClient.Product.delete({
				where: {
					id: item.id
				}
			})

			setProducts(prevProducts => prevProducts.filter(product => String(product.id) !== String(item.id)))
		}
		fetchSingleList(Number(listId))
	}

	const updateListTotal = async (id: number, total: number) => {
		try {
			await prismaClient.List.update({
				where: { id },
				data: { total }
			})
		} catch (error) {
			console.error("Erro ao atualizar o total da lista:", error)
			throw error
		}
	}

	const updateProductsPrice = async (listId: number, price: number, totalPrice: number) => {
		try {
			await prismaClient.Product.updateMany({
				where: { listId },
				data: { price, totalPrice }
			})
		} catch (error) {
			console.error("Erro ao atualizar os preços dos produtos:", error)
			throw error
		}
	}

	const newPurchase = async (id: number) => {
		try {
			await updateListTotal(id, 0)
			await updateProductsPrice(id, 0, 0)

			fetchProducts()
		} catch (error) {
			console.error("Erro ao processar a nova compra:", error)
		}
	}

	return (
		<ProductContext.Provider value={{ fetchProducts, products, setProducts, addProduct, updateProduct, removeProduct, listId, setListId, newPurchase }}>
			{children}
		</ProductContext.Provider>
	)
}


export const useProductContext = () => {
	const context = useContext(ProductContext)
	if (!context) {
		throw new Error('useProductContext must be used with ProductProvider')
	}
	return context
}