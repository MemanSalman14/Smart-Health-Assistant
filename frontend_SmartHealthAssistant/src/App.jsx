import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "lucide-react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setOnlineUsers } from "./store/slices/authSlice";
import { connectSocket, disconnectSocket } from "./lib/socket";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register"; 
import { ToastContainer } from "react-toastify";
import ChatbotButton from "./components/ChatBot/ChatbotButton";
import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/clerk-react";

const App = () => {
  const { user, isLoaded } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const socket = connectSocket(user.id);
      socket.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users));
      });
      return () => disconnectSocket();
    }
  }, [user, dispatch]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <SignedIn>
                <Home />
              </SignedIn>
            }
          />
          <Route
            path="/profile"
            element={
              <SignedIn>
                <Profile />
              </SignedIn>
            }
          />
          <Route
            path="/login"
            element={
              <SignedOut>
                <Login />
              </SignedOut>
            }
          />
          <Route
            path="/register"
            element={
              <SignedOut>
                <Register /> 
              </SignedOut>
            }
          />
          {/* Redirect all other routes to sign in if not authenticated */}
          <Route
            path="*"
            element={
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            }
          />
        </Routes>
        <ToastContainer />
        {/* Show ChatbotButton only when signed in */}
        <SignedIn>
          <ChatbotButton />
        </SignedIn>
      </Router>
    </>
  );
};

export default App;