import { useEffect, useState } from 'react'
import { useBookSearch } from './useBookSearch'
import { placeholderImg } from '@/lib/constants'


export interface FormatedBookData {
  title: string
  autor: string
  description: string
  publishedDate: string
  publisher: string
  pageCount: string
  isbn: string
  categories: string
  image: string
  pages: string
}

export default function useGetOneBookData(book: any) {
  const [bookData, setBookData] = useState(book)
  const [isLoading, setIsLoading] = useState(true)
  const [formatedBookData, setFormatedBookData] = useState<FormatedBookData | null>(null)
  const { searchBookById } = useBookSearch()

  useEffect(() => {
    const fetchBookData = async () => {
      if (book.googleId && !book.volumeInfo) {
        setIsLoading(true)
        const data = await searchBookById(book.googleId)
        setBookData(data)
        setIsLoading(false)
      } else {
        setBookData(book)
        setIsLoading(false)
      }
    }

    fetchBookData()
  }, [book.googleId])

  useEffect(() => {
    if (bookData) {
      const formated: FormatedBookData = {
        title: bookData?.volumeInfo?.title || 'desconocido',
        autor: bookData?.volumeInfo?.authors?.join(', ') || 'desconocido',
        description: bookData?.volumeInfo?.description || 'sin descripción',
        publishedDate: bookData?.volumeInfo?.publishedDate || 'desconocido',
        publisher: bookData?.volumeInfo?.publisher || 'desconocido',
        pageCount: bookData?.volumeInfo?.pageCount?.toString() || 'desconocido',
        isbn: bookData?.volumeInfo?.industryIdentifiers?.find((id: { type: string; identifier: string }) => id.type === 'ISBN_13')?.identifier || 'desconocido',
        categories: bookData?.volumeInfo?.categories?.join(', ') || 'sin categorías',
        image: bookData?.volumeInfo?.imageLinks?.thumbnail || placeholderImg,
        pages: bookData?.volumeInfo?.pageCount?.toString() || 'desconocido',
      }
      setFormatedBookData(formated)
    }
  }, [bookData])

  return { formatedBookData, isLoading, setIsLoading }
}
