import { atom } from 'jotai';

// Define the atom for favourites list
export const favouritesAtom = atom([]);

// Define the atom for search history
export const searchHistoryAtom = atom([]);

// Define a function to add a new search query to the search history
export const addToSearchHistory = (query) => (get, set) => {
    const currentSearchHistory = get(searchHistoryAtom);
    const newSearchHistory = [...currentSearchHistory, query];
    set(searchHistoryAtom, newSearchHistory);
  };
  
  // Define a function to clear the search history
  export const clearSearchHistory = () => (get, set) => {
    set(searchHistoryAtom, []);
  };

