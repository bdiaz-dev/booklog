export interface UserBook {
  id: string
  title: string
  author: string
  googleId: string
  isStarted: boolean
  startedDate?: string | null
  isRead: boolean
  userId?: string
  readedDate?: string | null
  addedDate?: string
  rating?: string | null
  thumbnail?: string | null
  volumeInfo?: {
    title: string
    authors: string[]
    imageLinks?: {
      thumbnail: string
    }
  }
}

export interface UserBookActions {
  handleAddBookClick: (book: UserBook, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => Promise<void>
  handleRemoveBookClick: (bookid: string, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => Promise<void>
  handleError: () => void
  isDeleting: boolean
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>
}

export interface GoogleBook {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    subtitle?: string;
    authors: string[];
    publishedDate?: string;
    description?: string;
    industryIdentifiers?: {
      type: string;
      identifier: string;
    }[];
    readingModes: {
      text: boolean;
      image: boolean;
    };
    pageCount?: number;
    printType: string;
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary?: {
      containsEpubBubbles: boolean;
      containsImageBubbles: boolean;
    };
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
    };
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
  };
  saleInfo: {
    country: string;
    saleability: string;
    isEbook: boolean;
  };
  accessInfo: {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: {
      isAvailable: boolean;
    };
    pdf: {
      isAvailable: boolean;
      acsTokenLink?: string;
    };
    webReaderLink: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
  };
  searchInfo?: {
    textSnippet: string;
  };
}
