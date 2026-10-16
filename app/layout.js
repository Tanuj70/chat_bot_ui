import "./globals.css";
import "./prism.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "TejAI - Intelligent AI Assistant",
  description: "TejAI - Next-Generation AI Assistant",
};

export default function RootLayout({ children }) {
  return (
    <AppContextProvider>
      <html lang="en">
        <body className="antialiased">
          <Toaster toastOptions={
            {
              success: {style: { background: "black", color: "white"}},
              error: {style: { background: "black", color: "white"}}
            }
          }/>
          {children}
        </body>
      </html>
    </AppContextProvider>
  );
}
