
import { BrowserRouter, Route, Routes } from 'react-router'
import { HomePage } from 'pages/homePage'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:airline/:route" element={<HomePage />} />
        <Route path="/favorites" element={<HomePage />} />
        <Route path="/favorites/:airline/:route" element={<HomePage />} />
        <Route path="*" element={<h1>Route does not exist</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}