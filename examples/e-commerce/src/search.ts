import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import {
  brands,
  designers,
  categoriesFactory,
  clearFilters,
  clearFiltersEmptyResults,
  clearFiltersMobile,
  configuration,
  hitsPerPage,
  pagination,
  products,
  resultsNumberMobile,
  saveFiltersMobile,
  searchBox,
} from './widgets';
import getRouting from './routing';

const searchClient = algoliasearch(
  'EUEY0IRRO5',
  '77785c53c15c248b6467e988fdd8e175'
);

const search = instantsearch({
  searchClient,
  indexName: 'dezeen_staging',
  routing: getRouting({ indexName: 'dezeen_staging' }),
});

search.addWidgets([
  brands,
  designers,
  categoriesFactory('[data-widget="categories-lvl-1"]', 'categoryLevel1', 'Primary Category'),
  categoriesFactory('[data-widget="categories-lvl-2"]', 'categoryLevel2', 'Secondary Category'),
  clearFilters,
  clearFiltersEmptyResults,
  clearFiltersMobile,
  configuration,
  hitsPerPage,
  pagination,
  products,
  resultsNumberMobile,
  saveFiltersMobile,
  searchBox,
]);

export default search;
