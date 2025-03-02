export function useAddBook() {

  const handleAddBook = async (book) => {
    try {
      const response = await fetch("/api/books/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: book.volumeInfo.title,
          author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : "Unknown",
          googleId: book.id,
          thumbnail: book.volumeInfo.imageLinks?.thumbnail || null,
        }),
      })
      if (response.ok) {
        // router.push("/reading-list")
        console.log(`book ${book.volumeInfo.title} added`)
      } else {
        console.error("Error adding book")
      }
      return response
    } catch (error) {
      console.error("Error adding book:", error)
    }
  }

  return { handleAddBook }

}
