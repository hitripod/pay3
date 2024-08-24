import type { Metadata } from "next";
import { ScaffoldStarkAppWithProviders } from "~~/components/ScaffoldStarkAppWithProviders";
import "~~/styles/globals.css";
import { ThemeProvider } from "~~/components/ThemeProvider";
import { Providers } from "~~/library/providers";

export const metadata: Metadata = {
  title: "Pay3",
  description: "Pay Pay Pay",
  icons: "/logo.ico",
};

const ScaffoldStarkApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning lang="en" className="bg-green-100">
      <body>
        <ThemeProvider enableSystem>
          <ScaffoldStarkAppWithProviders>
            <Providers>
            {children}
            </Providers>
          </ScaffoldStarkAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ScaffoldStarkApp;
