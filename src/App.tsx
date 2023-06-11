import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
const SignIn = React.lazy(() => import("./pages/SignIn"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const Home = React.lazy(() => import("./pages/Home"));
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "./features/currentUserSlice";
import { AppDispatch } from "./app/store";
const AppBar = React.lazy(() => import( "./components/AppBar"));
import { CreateTicket } from "./pages/CreateTicket";
import TicketPurchasePage from "./pages/TicketPurchasePage";
const TicketList = React.lazy(() => import("./pages/TicketsList"));

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  return (
    <div className="bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee] h-screen">
      <BrowserRouter>
        <AppBar />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/signin"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <SignIn />
              </Suspense>
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <SignUp />
              </Suspense>
            }
          />
          <Route
            path="/my-tickets"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <TicketList />
              </Suspense>
            }
          />
          <Route
            path="/create/ticket"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <CreateTicket />
              </Suspense>
            }
          />
          <Route
            path="/ticket/:ticketId"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <TicketPurchasePage />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
