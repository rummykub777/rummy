import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Public from './pages/Public';

export default function Routing(props) {
    return <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='/game' element={<Game />}></Route>
        <Route exact path='/public' element={<Public />}></Route>
    </Routes>
}
