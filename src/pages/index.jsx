import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Home} from './Home.jsx'
import {Page404} from './Page404'

export const Pages = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="*" element={<Page404/>}/>
            </Routes>
        </BrowserRouter>
    )
}
