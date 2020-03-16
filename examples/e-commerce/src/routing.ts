/* eslint @typescript-eslint/camelcase: ["error", { allow: ["free_shipping"] }], complexity: off */

import { history as historyRouter } from 'instantsearch.js/es/lib/routers';
import {
  getFallbackHitsPerPageRoutingValue,
} from './widgets';

interface RouteState {
  query?: string;
  page?: string;
  brands?: string[];
  designers?: string[];
  categoriesLevel1?: string[];
  categoriesLevel2?: string[];
  hitsPerPage?: string;
}

interface UiState {
  query?: string;
  page?: string;
  refinementList?: {
    categoryLevel1: string[];
    categoryLevel2: string[];
    brandName?: string[];
    designerName?: string[];
  };
  hitsPerPage?: number;
}

const routeStateDefaultValues = {
  query: '',
  page: '1',
  brands: undefined,
  designers: undefined,
  categoriesLevel1: '',
  categoriesLevel2: '',
  hitsPerPage: '20',
};

const originalWindowTitle = document.title;

const router = historyRouter({
  windowTitle({ category, query }) {
    const queryTitle = query ? `Results for "${query}"` : '';

    return [queryTitle, category, originalWindowTitle]
      .filter(Boolean)
      .join(' | ');
  },
});

const getStateMapping = ({ indexName }) => ({
  stateToRoute(uiState: UiState): RouteState {
    const indexUiState = uiState[indexName];
    return {
      query: indexUiState.query,
      page: indexUiState.page,
      brands: indexUiState.refinementList && indexUiState.refinementList.brandName,
      categoriesLevel1: indexUiState.refinementList && indexUiState.refinementList.categoryLevel1,
      categoriesLevel2: indexUiState.refinementList && indexUiState.refinementList.categoryLevel2,
      hitsPerPage:
        (indexUiState.hitsPerPage && String(indexUiState.hitsPerPage)) ||
        undefined,
    };
  },

  routeToState(routeState: RouteState): UiState {
    return {
      [indexName]: {
        query: routeState.query,
        page: routeState.page,
        hierarchicalMenu: {
          'categories.lvl0':
            (routeState.category && routeState.category.split('/')) ||
            undefined,
        },
        refinementList: {
          categoryLevel1: routeState.categoriesLevel1,
          categoryLevel2: routeState.categoriesLevel2,
          brandName: routeState.brands,
          designerName: routeState.designers,
        },
        hitsPerPage: Number(routeState.hitsPerPage),
      },
    };
  },
});

const getRouting = ({ indexName }) => ({
  router,
  stateMapping: getStateMapping({ indexName }),
});

export default getRouting;
