import { BrowserRouter, Route, Routes } from "react-router-dom"
import { DirectoryScreen } from "../components/DirectoryScreen"

export const AppRoutes = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path = '/' element = {<DirectoryScreen/>}/>
                    <Route path = '/:path' element = {<DirectoryScreen/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}