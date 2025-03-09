import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomePage,
  BlogPage,
  SignInPage,
  SignUpPage,
  CartPage,
  ProductsPage,
  NotFoundPage,
  ProductDetailsPage,
} from "./pages/export_pages.jsx";
import { ContextProvider } from "./contexts/ContextProvider";
import { Layout } from "./components/export_components.jsx";
//
const router = createBrowserRouter([
  // { path: "/", element: <HomePage />, errorElement: <NotFoundPage /> },
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage />, errorElement: <NotFoundPage /> },
      { path: "/blog", element: <BlogPage /> },
      { path: "/products-page", element: <ProductsPage /> },
      { path: "/products-details-page", element: <ProductDetailsPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/sign-in", element: <SignInPage /> },
      { path: "/sign-up", element: <SignUpPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>
);
