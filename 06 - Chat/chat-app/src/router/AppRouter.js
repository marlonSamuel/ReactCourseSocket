import React, { useContext, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    BrowserRouter
  } from "react-router-dom";
import { AuthContext } from '../auth/AuthContext';
import { ChatPage } from '../pages/ChatPage';
import { AuthRouter } from './AuthRouter';
import { PublicRouter } from './PublicRouter';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

  const {auth, verificaToken} = useContext(AuthContext);

  useEffect( () => {
    verificaToken();
  }, [verificaToken])

  if ( auth.checking ) {
    return <h1>Espere por favor</h1>
  }


  return (
        <BrowserRouter>
          <Routes>
                  <Route
                      path="/"
                      element={
                          <PublicRouter isAuthenticated={auth.logged}>
                              <ChatPage />
                          </PublicRouter>
                      }
                  />
                  <Route
                      path="/auth/*"
                      element={
                          <PrivateRoute isAuthenticated={auth.logged}>
                              <AuthRouter />
                          </PrivateRoute>
                      }
                  />
  
                  <Route path="*" element={<ChatPage />} />
              </Routes>
        </BrowserRouter>
  )
}
