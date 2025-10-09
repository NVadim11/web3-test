import { Header, Menu } from "@widgets";
import { Layout } from "@shared";
import type { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <Layout>
      <div className="h-full flex flex-col">
        <Header />
        <div className="flex flex-1 min-h-0">
          <Menu />
          <main className="flex-1 min-h-0">
            {children}
          </main>
        </div>
      </div>
    </Layout>
  );
}
