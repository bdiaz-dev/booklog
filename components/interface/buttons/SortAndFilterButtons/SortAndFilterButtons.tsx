import { useSortAndFilterContext } from '@/context/SortAndFilterContext'
import { useIsMobile } from '@/hooks/use-mobile'
import SortButton from './SortButton'
import DeployBox from '../../DeployBox'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function SortAndFilterButtons({ isReadingList }: { isReadingList: boolean }) {

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
              <button
                className='config-filters-button'
                onClick={() => setShowFilters(!showFilters)}
                data-filters={Object.values(filters).some((filter) => filter === false)}
              >
                {`Filtros${(Object.values(filters).some((filter) => filter === false)) ? ' 🔴' : ''}`}
              </button>
            <div className='deploy-box-container'>

              <AnimatePresence>
                {showFilters &&
                  <DeployBox>
                    <label>
                      <input
                        type="checkbox"
                        checked={filters.showStarted}
                        onChange={() => setFilters({ ...filters, showStarted: !filters.showStarted })}
                      />
                      Empezados
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={filters.showNoStarted}
                        onChange={() => setFilters({ ...filters, showNoStarted: !filters.showNoStarted })}
                      />
                      No empezados
                    </label>
                  </DeployBox>}
              </AnimatePresence>
            </div>
          </>
        )
        : (<button
          className={`button ${sortCriteria === "readedDate" ? "active" : "info"}`}
          onClick={() => setSortCriteria("readedDate")}
        >
          {`${isMobile ? '' : 'Fecha '}Terminado`}
        </button>)
      }
    </div>
  )
}
