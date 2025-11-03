import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthForm from "./components/AuthForm";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
