import React, { useState } from "react";
import { liteClient } from "algoliasearch/lite";
import {
  InstantSearch,
  Configure,
} from "react-instantsearch";
import "./index.css";
import SearchBar from "./search-bar";
import SearchResults from "./search-results";
import EmptyQueryBoundary from "./empty-query-boundary";

const searchClient = liteClient(
  import.meta.env.VITE_ALGOLIA_APPLICATION_ID!,
  import.meta.env.VITE_ALGOLIA_SEARCH_API_KEY!,
  {}
);

const AlgoliaSearchBar: React.FC = () => {
  const [showResults, setShowResults] = useState(false);

  return (
    <InstantSearch searchClient={searchClient} indexName="unified">
      <Configure />
      <div className="relative w-full max-w-lg mx-auto">
        <SearchBar setShowResults={setShowResults} />
        {showResults && (
          <EmptyQueryBoundary>
            <SearchResults setShowResults={setShowResults} />
          </EmptyQueryBoundary>
        )}
      </div>
    </InstantSearch>
  );
};

export default AlgoliaSearchBar;
