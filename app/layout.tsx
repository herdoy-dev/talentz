import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "react-image-crop/dist/ReactCrop.css";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";
import QueryClientProvider from "./query-client-provider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <QueryClientProvider>
          <Theme>{children}</Theme>
        </QueryClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
