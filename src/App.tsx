import { Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';

import { Menu } from './components/Menu';
import { Home, Game, Reference, FindGames, NewGame, Redeem } from './routes';

const App = () => {
    const location = useLocation();
    return (
        <Routes location={location}>
            <Route element={

                <Menu path={location.pathname}>
                    <Outlet />
                </Menu>
            }>
                <Route path='/' element={<Home />} />
                <Route path='/newgame' element={<NewGame />} />
                <Route path='/game' element={<Game />} />
                <Route path='/referral' element={<Reference />} />
                <Route path='/findgames' element={<FindGames />} />
                <Route path='/redeem' element={<Redeem />} />
                <Route path='*' element={<Navigate to='' />} />
            </Route>
        </Routes>
    );
}

export default App;
