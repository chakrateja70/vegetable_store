import SignUpPage from "./components/SignUpPage"
import SignInPage from "./components/SignInPage"
import WelcomePage from "./components/WelcomePage"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
