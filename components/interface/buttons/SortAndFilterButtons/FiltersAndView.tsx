import { AnimatePresence } from 'framer-motion';
import DeployBox from '../../DeployBox';
import { useSortAndFilterContext } from '@/context/SortAndFilterContext'
import { useListContext } from '@/context/ListsContext';
import { useBookData } from '@/context/BookDataContext';
import { useEffect, useState } from 'react';

export default function FiltersAndView({ showFilters }: { showFilters: boolean }) {

  const {
    filters,
    setFilters,
    mode,
    changeMode
  } = useSortAndFilterContext()

  const { isReadingList } = useListContext()
  // const { readedList, readingList } = useBookData()


  return (
    <div className='deploy-box-container'>
      <AnimatePresence>
        {showFilters &&
          <DeployBox>
            {isReadingList && [
              { label: 'Empezados', filterKey: 'showStarted' },
              { label: 'No empezados', filterKey: 'showNoStarted' }
            ].map(({ label, filterKey }) => (
              <label key={filterKey}>
                <input
                  type="checkbox"
                  checked={filters[filterKey as keyof typeof filters]}
                  onChange={() => setFilters({ ...filters, [filterKey as keyof typeof filters]: !filters[filterKey as keyof typeof filters] })}
                />
                {label}
              </label>
            ))}
            <div>
              <p style={{margin: '0'}}>Vista: </p>
              <button className='button primary' onClick={changeMode}>
                {mode === "list" ? "Lista" : "Completa"}
              </button>
            </div>
          </DeployBox>}
      </AnimatePresence>
    </div>
  )
}
