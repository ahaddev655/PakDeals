import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// ==================== MAIN PAGES ====================
import HomePage from "./pages/main/HomePage";
import MainLayout from "./layouts/MainLayout";
import FavoritesPage from "./pages/main/FavoritesPage";
import AddAdPage from "./pages/main/AddAdPage";
import ErrorPage from "./pages/ErrorPage";
// ==================== AUTH ROUTES ====================
import SignUpComponent from "./components/main/SignUpComponent";
import LoginComponent from "./components/main/LoginComponent";
// ==================== USER ROUTES ====================
import UserLayout from "./layouts/UserLayout";
import UserDashboardPage from "./pages/user/UserDashboardPage";
import UserAdsPage from "./pages/user/UserAdsPage";
import UserAdAdsPage from "./pages/user/UserAdAdsPage";
import UserFavoritesPage from "./pages/user/UserFavoritesPage";
import UserPaymentsPage from "./pages/user/UserPaymentsPage";
import UserChatsPage from "./pages/user/chats/UserChatsPage";
import ChatsMainComponent from "./components/user/chats/ChatsMainComponent";
import UserProfilePage from "./pages/user/chats/UserProfilePage";
import UserProfileSettingsPage from "./pages/user/UserProfileSettingsPage";
import PersonalProfilePage from "./pages/user/PersonalProfilePage";
import AllAdsPage from "./pages/main/AllAdsPage";
import PricingPage from "./pages/main/PricingPage";
import BlogsPages from "./pages/main/BlogsPages";
import ContactPage from "./pages/main/ContactPage";
// ==================== ADMIN PAGES ====================

function App() {
  const router = createBrowserRouter([
    {
      errorElement: <ErrorPage />,
    },
    // ==================== MAIN ROUTES ====================
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
        {
          path: "all-ads",
          element: <AllAdsPage />,
        },
        {
          path: "pricing",
          element: <PricingPage />,
        },
        {
          path: "blogs",
          element: <BlogsPages />,
        },
        {
          path: "contact",
          element: <ContactPage />,
        },

        // -------------------- SIGNUP PAGE --------------------
        {
          path: "signup",
          element: <SignUpComponent />,
        },
        // -------------------- LOGIN PAGE --------------------
        {
          path: "login",
          element: <LoginComponent />,
        },
      ],
    },
    // ==================== USER ROUTES ====================
    {
      path: "/user-dashboard",
      element: <UserLayout />,
      children: [
        {
          index: true,
          element: <UserDashboardPage />,
        },
        {
          path: "my-ads",
          element: <UserAdsPage />,
        },
        {
          path: "add-ad",
          element: <UserAdAdsPage />,
        },
        {
          path: "favorites",
          element: <UserFavoritesPage />,
        },
        {
          path: "payments",
          element: <UserPaymentsPage />,
        },
        {
          path: "chats",
          element: <UserChatsPage />,
          children: [
            {
              path: ":id",
              element: <ChatsMainComponent />,
            },
          ],
        },
        {
          path: "profile/:id",
          element: <UserProfilePage />,
        },
        {
          path: "profile-settings",
          element: <UserProfileSettingsPage />,
        },
        {
          path: "profile",
          element: <PersonalProfilePage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
