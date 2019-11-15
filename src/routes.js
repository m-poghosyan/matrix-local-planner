import Menus from './views/Menus'
import Planner from './views/Planner'
import Recipes from './views/Recipes'
import Dashboard from './views/Dashboard'
import TopMenu from './components/TopMenu'

const routes = [
  {
    path: '/',
    exact: true,
    main: Menus,
    menu: TopMenu,
    title: 'Menu Selection',
    breadcrumbName: 'Home',
  },
  {
    path: '/planner/:id',
    exact: false,
    main: Planner,
    menu: TopMenu,
    title: 'Planner',
    breadcrumbName: 'Planner',
  },
  {
    path: '/recipes',
    exact: false,
    main: Recipes,
    menu: TopMenu,
    title: 'Recipe Search',
    breadcrumbName: 'Recipes',
  },
  {
    path: '/dashboard',
    exact: false,
    main: Dashboard,
    menu: TopMenu,
    title: 'Statistics',
    breadcrumbName: 'Dashboard',
  },
]

export default routes
