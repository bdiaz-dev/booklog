import { useSortAndFilterContext } from '@/context/SortAndFilterContext'
import { useIsMobile } from '@/hooks/use-mobile'
import SortButton from './SortButton'
import DeployBox from '../../DeployBox'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import FiltersAndView from './FiltersAndView'
import { useListContext } from '@/context/ListsContext'

export default function SortAndFilterButtons() {

  const {
    searchTerm,
    setSearchTerm,
    sortAscendent,
    setSortAscendent,
    sortCriteria,
    setSortCriteria,
    filters,
    setFilters,
    sortedBooks
  } = useSortAndFilterContext()

  const { isReadingList } = useListContext()

  const isMobile = useIsMobile()
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className='sort-buttons' data-ismobile={isMobile}>
      <SortButton isAscending={sortAscendent} onClick={() => setSortAscendent(!sortAscendent)} />
      <button
        className={`button ${sortCriteria === "title" ? "active" : "info"}`}
        onClick={() => setSortCriteria("title")}
      >
        A-Z
      </button>
      <button
        className={`button ${sortCriteria === "startedDate" ? "active" : "info"}`}
        onClick={() => setSortCriteria("startedDate")}
      >
        {`${isMobile ? '' : 'Fecha '}Empezado`}
      </button>
      {isReadingList
        ? (
          <>
            <button
              className={`button ${sortCriteria === "addedDate" ? "active" : "info"}`}
              onClick={() => setSortCriteria("addedDate")}
            >
              {`${isMobile ? '' : 'Fecha '}Añadido`}
            </button>
          </>
        )
        : (<button
          className={`button ${sortCriteria === "readedDate" ? "active" : "info"}`}
          onClick={() => setSortCriteria("readedDate")}
        >
          {`${isMobile ? '' : 'Fecha '}Terminado`}
        </button>)
      }
      <button
        className='config-filters-button'
        onClick={() => setShowFilters(!showFilters)}
        data-filters={Object.values(filters).some((filter) => filter === false)}
      >
        Vista
      </button>
      <FiltersAndView showFilters={showFilters} />
    </div>
  )
}
