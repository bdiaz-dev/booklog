export const placeholderImg = "https://covers.openlibrary.org/b/id/10909258-L.jpg"

type Rating ="wonderfull" | "like" | "normal" | "dislike"

// export type ratingEmojis = {
//   [key in Rating]: string
// }
export type ratingSvgEmojis = {
  [key in Rating]: string
}

export   const ratingEmojis = {
  wonderfull: "😍",
  like: "😃",
  normal: "😑",
  dislike: "😡"
}

export const ratingSvgEmojis = {
  wonderfull: "/wonderfull.svg",
  like: "/like.svg",
  normal: "/normal.svg",
  dislike: "/dislike.svg"
}
