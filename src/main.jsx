import React from 'react'
import ReactDOM from 'react-dom/client'
import { Pokedex } from './pages/Home'
import { Pokemon } from './pages/Pokemon';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Pokedex />
  },
  {
    path: "/pokemon/:id",
    element: <Pokemon />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
