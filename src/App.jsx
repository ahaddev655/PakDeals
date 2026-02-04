import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// ==================== main PAGES ====================
import HomePage from "./pages/main/HomePage";
import MainLayout from "./layouts/MainLayout";
import FavoritesPage from "./pages/main/FavoritesPage";
import AddAdPage from "./pages/main/AddAdPage";
import ErrorPage from "./pages/ErrorPage";
// ==================== AUTH ROUTES ====================
import SignUpComponent from "./components/main/SignUpComponent";
import LoginComponent from "./components/main/LoginComponent";
import UserLayout from "./layouts/UserLayout";
import UserDashboardPage from "./pages/user/UserDashboardPage";
import UserAdsPage from "./pages/user/UserAdsPage";
import UserAdAdsPage from './pages/user/UserAdAdsPage';
import UserFavoritesPage from "./pages/user/UserFavoritesPage";
import UserPaymentsPage from "./pages/user/UserPaymentsPage";
// ==================== ADMIN PAGES ====================

function App() {
  const router = createBrowserRouter([
    {
      errorElement: <ErrorPage />,
    },
    // ==================== main ROUTES ====================
    {
      path: "/",
      element: <MainLayout />,
      children: [
        // -------------------- HOME PAGE --------------------
        {
          index: true,
          element: <HomePage />,
        },
        // -------------------- FAVORITES PAGE --------------------
        {
          path: "favorites",
          element: <FavoritesPage />,
        },
        // -------------------- ADD-AD PAGE --------------------
        {
          path: "add-ad",
          element: <AddAdPage />,
        },
        // ==================== AUTH ROUTES ====================
        // -------------------- SIGNUP PAGE --------------------
        {
          path: "/signup",
          element: <SignUpComponent />,
        },
        // -------------------- LOGIN PAGE --------------------
        {
          path: "/login",
          element: <LoginComponent />,
        },
      ],
    },
    {
      path: "/user-dashboard",
      element: <UserLayout />,
      children: [
        {
          index: true,
          element: <UserDashboardPage />,
        },
        {
          path: "/user-dashboard/my-ads",
          element: <UserAdsPage />,
        },
        {
          path: "/user-dashboard/add-ad",
          element: <UserAdAdsPage />,
        },
        {
          path: "/user-dashboard/favorites",
          element: <UserFavoritesPage />,
        },
        {
          path: "/user-dashboard/payments",
          element: <UserPaymentsPage />,
        },
        {
          path: "/user-dashboard/chats",
          element: <UserDashboardPage />,
        },
        {
          path: "/user-dashboard/profile-settings",
          element: <UserDashboardPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
