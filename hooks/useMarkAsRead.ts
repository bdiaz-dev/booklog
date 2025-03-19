import { useRouter } from "next/navigation"

export function useMarkAsRead() {
  const router = useRouter()

  const handleMarkAsRead = async (bookId: string, feedback: string, readedDate: string) => {
    try {
      const res = await fetch("/api/books/mark-as-read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, feedback, readedDate }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || "Failed to mark book as read")
      }

      router.refresh()
      return { success: true }
    } catch (error) {
      console.error("Error marking book as read:", error)
      return { success: false, error: error.message }
    }
  }

  return { handleMarkAsRead }
}
