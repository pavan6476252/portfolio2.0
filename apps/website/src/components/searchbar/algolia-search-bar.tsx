import React, { useCallback } from "react";
import { liteClient } from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Configure,
  useSearchBox,
} from "react-instantsearch";
import "./index.css";
import SearchBar from "./search-bar";
import SearchResults from "./search-results";
import EmptyQueryBoundary from "./empty-query-boundary";
const searchClient = liteClient(
  "SDVRN6TKB1",
  "89e2b430a93fb9f5ff3726ef0c6cff4a",
  {}
);

// const AlgoliaSearchBar: React.FC = () => {
//   return (
//     <InstantSearch searchClient={searchClient} indexName="unified">
//       <Configure  />
//       <div className="relative ais-InstantSearch w-min">
//         <SearchBox
//           className="border w-full rounded-lg p-2 mb-4"
//           translations={{  }}
//         />
//         {/* <Hits hitComponent={HitComponent} /> */}
//       </div>
//     </InstantSearch>
//   );
// }

const AlgoliaSearchBar: React.FC = () => {
  
  return (
    <InstantSearch searchClient={searchClient} indexName="unified">
      <Configure />
      <div className="relative w-full  max-w-lg mx-auto">
        <SearchBar />
        <EmptyQueryBoundary>
          <SearchResults
          />
        </EmptyQueryBoundary>
      </div>
    </InstantSearch>
  );
};

export default AlgoliaSearchBar;
