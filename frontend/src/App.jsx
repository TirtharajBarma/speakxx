import SearchPage from './components/Search'
import {Route, Routes} from 'react-router-dom'

function App() {

  return (
   <>
    <Routes>
      <Route path='/' element={<SearchPage />} />
    </Routes>
   </>
  )
}

export default App
