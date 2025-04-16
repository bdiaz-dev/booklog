import { useRouter } from "next/navigation"

export function useMarkStarted() {
  const router = useRouter()

  const handleMarkStarted = async (bookId: string, startedDate: string) => {
    try {
      const res = await fetch("/api/books/mark-started", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, startedDate }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || "Failed to mark book as started")
      }

      router.refresh()
      return { success: true }
    } catch (error) {
      console.error("Error marking book as started:", error)
      return { success: false, error: (error as Error).message }
    }
  }

  return { handleMarkStarted }
}
