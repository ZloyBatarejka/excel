import {Router} from './core/router/router'
import './scss/index.scss'
import {DashboardPage} from './pages/DashBoardPage';
import {ExcelPage} from './pages/ExcelPage';

new Router('#app', {
   dashboard: DashboardPage,
   excel: ExcelPage
})
