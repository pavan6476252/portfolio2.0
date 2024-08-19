import React from "react";
import { Highlight, useHits } from "react-instantsearch";
import { Link, useNavigate } from "react-router-dom";

const SearchResults: React.FC = () => {
  const { items } = useHits();
  // const navigate = useNavigate();

  // const navigationHandler = (hit: any) => {
  //   switch (hit.type) {
  //     case "project":
  //       return navigate(`/projects/${hit.id}`);
  //     case "blog":
  //       return navigate(`/blogs/${hit.id}`);
  //     default:
  //       alert("Unhandled search navigation");
  //   }
  // };

  return (
    <div className="absolute w-full mt-2 bg-white dark:bg-gray-800 rounded  shadow-lg  max-h-80 overflow-y-auto z-50">
      {items.length > 0 ? (
        items.map((hit: any) => (
          <Link
            key={hit.id}
            to={`/${hit.type}s/${hit.id}`}
            className="flex items-center p-2 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <img
              src={hit.image}
              alt={hit.title}
              className="w-10 h-10 object-cover mr-3 rounded-lg"
            />
            <div className="flex-grow">
              <div className="text-sm font-semibold text-gray-800 dark:text-white">
                <Highlight attribute="title" hit={hit} />
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <Highlight attribute="desc" hit={hit} />
              </div>
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500 ml-2">
              <Highlight attribute="type" hit={hit} />
            </div>
          </Link>
        ))
      ) : (
        <div className="text-gray-500 dark:text-gray-400 text-center py-2">
          No results found.
        </div>
      )}
    </div>
  );
};

export default SearchResults;
