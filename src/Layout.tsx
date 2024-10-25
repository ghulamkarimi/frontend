
import Navbar from "@/components/menu/Navbar"; // Überprüfe den Pfad
import "./globals.css"; // Überprüfe den Pfad
import ReduxProvider from "../feature/provider/ReduxProvider";

interface LayoutProps {
  children: React.ReactNode;
}

export default function SpecificPageLayout({ children }: LayoutProps) {
  return (
    <ReduxProvider>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <footer>
        {/* Footer-Inhalt für diese spezifische Seite */}
      </footer>
    </ReduxProvider>
  );
}
