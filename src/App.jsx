import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// ==================== MAIN PAGES ====================
import HomePage from "./pages/main/HomePage";
import MainLayout from "./layouts/MainLayout";
import FavoritesPage from "./pages/main/FavoritesPage";
import AddAdPage from "./pages/main/AddAdPage";
import ErrorPage from "./pages/ErrorPage";
// ==================== AUTH PAGES ====================
import SignUpComponent from "./components/main/SignUpComponent";
import LoginComponent from "./components/main/LoginComponent";
// ==================== USER PAGES ====================
import UserLayout from "./layouts/UserLayout";
import UserDashboardPage from "./pages/user/UserDashboardPage";
import UserAdsPage from "./pages/user/UserAdsPage";
import UserAdAdsPage from "./pages/user/UserAdAdsPage";
import UserFavoritesPage from "./pages/user/UserFavoritesPage";
import UserPaymentsPage from "./pages/user/UserPaymentsPage";
import UserProfileSettingsPage from "./pages/user/UserProfileSettingsPage";
import PersonalProfilePage from "./pages/user/PersonalProfilePage";
import AllAdsPage from "./pages/main/AllAdsPage";
import PricingPage from "./pages/main/PricingPage";
import BlogsPages from "./pages/main/BlogsPages";
import ContactPage from "./pages/main/ContactPage";
import CategoryPage from "./pages/main/CategoryPage";
import AdsDetailPage from "./pages/main/AdsDetailPage";
// ==================== ADMIN PAGES ====================
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminUserPage from "./pages/admin/AdminUserPage";
import AdminAdsPage from "./pages/admin/AdminAdsPage";
import AdminAdAdsPage from "./pages/admin/AdminAdAdsPage";
import AdminFavoritesPage from "./pages/admin/AdminFavoritesPage";
import AdminPaymentsPage from "./pages/admin/AdminPaymentsPage";
import AdminProfileSettingsPage from "./pages/admin/AdminProfileSettingsPage";
import AdminPersonalProfilePage from "./pages/admin/AdminPersonalProfilePage";

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
        {
          path: "categories/:category/:id",
          element: <AllAdsPage />,
        },
        {
          path: "category/:category",
          element: <CategoryPage />,
        },
        {
          path: "/ad/:table_name/:id",
          element: <AdsDetailPage />,
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
          path: "profile-settings",
          element: <UserProfileSettingsPage />,
        },
        {
          path: "profile",
          element: <PersonalProfilePage />,
        },
      ],
    },
    // ==================== ADMIN ROUTES ====================
    {
      path: "/87b27389",
      element: <AdminLayout />,
      children: [
        {
          index: true,
          element: <AdminDashboardPage />,
        },
        {
          path: "users",
          element: <AdminUserPage />,
        },
        {
          path: "ads",
          element: <AdminAdsPage />,
        },
        {
          path: "add-ad",
          element: <AdminAdAdsPage />,
        },
        {
          path: "favorites",
          element: <AdminFavoritesPage />,
        },
        {
          path: "payments",
          element: <AdminPaymentsPage />,
        },
        {
          path: "profile-settings",
          element: <AdminProfileSettingsPage />,
        },
        {
          path: "profile",
          element: <AdminPersonalProfilePage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
