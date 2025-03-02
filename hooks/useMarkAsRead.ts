import { useRouter } from "next/navigation"

export function useMarkAsRead() {
  const router = useRouter()

  const handleMarkAsRead = async (bookId) => {
    await fetch("/api/books/mark-as-read", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId }),
    })
    router.refresh()
  }

  return { handleMarkAsRead }
}
