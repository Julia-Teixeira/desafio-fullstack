import Header from "@/components/header";
import { Suspense } from "react";
import Loading from "./loading";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="w-full bg-purple-600">
        <Header />
      </div>
      <div className="flex min-h-screen flex-col items-center  px-8 md:px-24">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
      <div className="w-full bg-purple-400">{/* <Footer /> */}</div>
    </main>
  );
}
