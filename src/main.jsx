import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="529842184654-hlnhld69ga4640t6b972q1gqhgnpi7ll.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>,
);
