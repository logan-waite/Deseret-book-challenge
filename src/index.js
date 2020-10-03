import React, { useState } from 'react'
import { render } from 'react-dom'
import * as R from 'ramda'

import data from './data'

/**
 * Deseret Book Code Challenge
 *
 * Please don't spend any longer than an hour on this. Please email
 * responses to webdev@deseretbook.com and include a link to your
 * solution as well as the total time you spent on it. Thanks!!
 *
 * ------------------------------------------
 *
 * Phase 1 - Filterable List
 *
 * Requirements
 * - Display a list of clickable links from the given `data`
 * - Allow users to type in an input to filter the data by the `name` property.
 * - Filter should be case insensitive.
 * - If the input is empty, then all links should be displayed.
 *
 * Bonus Points
 * - Filtering is reusable (works with any set of data and doesn't care how contents are rendered)
 *
 * ------------------------------------------
 *
 * Phase 2 - Pagination (Load More Button)
 *
 * Requirements
 * - Display only 5 items initially
 * - If more items available, show a "Load More button"
 * - Hide "Load More" button once all items have been rendered.
 * - Pagination resets when the dataset changes (when filters change)
 *
 * Bonus Points
 * - Pagination is reusable (works with any set of data and doesn't care how contents are rendered.)
 */
const byText = (text) => ({ name }) => name.toLowerCase().includes(text)

const App = () => {
  const paginationAmount = 5
  const [filterText, setFilterText] = useState('')
  const [currentPagination, setPaginationCount] = useState(paginationAmount)

  const handleFilterUpdate = (event) => {
    setPaginationCount(paginationAmount)
    setFilterText(event.target.value)
  }

  const handleLoadMoreClick = () =>
    setPaginationCount(currentPagination + paginationAmount)

  let listLength = data.length

  return (
    <div>
      <input value={filterText} onChange={handleFilterUpdate}></input>
      <ul>
        {R.pipe(
          R.filter(byText(filterText)),
          R.tap((list) => (listLength = list.length)),
          R.take(currentPagination),
          R.map((site) => (
            <li key={site.name}>
              <a href={site.uri}>{site.name}</a>
            </li>
          )),
        )(data)}
      </ul>
      {currentPagination < listLength ? (
        <button onClick={handleLoadMoreClick}>Load More</button>
      ) : null}
    </div>
  )
}

render(<App />, document.getElementById('root'))
