import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Quiz from "./Pages/Quiz";
import { Router, Route, Routes } from "react-router-dom";
import Category from "./Pages/Category";
import Login from "./Pages/login";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="flex justify-center items-center min-h-screen">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/option" element={<Category />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
