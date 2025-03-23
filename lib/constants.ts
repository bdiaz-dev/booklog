export const placeholderImg = "https://covers.openlibrary.org/b/id/10909258-L.jpg"

type Rating = "like" | "normal" | "dislike"

export type ratingEmojis = {
  [key in Rating]: string
}

export   const ratingEmojis = {
  wonderfull: "😍",
  like: "😃",
  normal: "😑",
  dislike: "😡"
}
