import { UserButton, auth } from "@clerk/nextjs";

import { redirect } from "next/navigation";

import Sidebar from "@/components/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="w-[100vw] max-w-[100vw] h-[100vh] flex bg-gray-50">
      <Sidebar />
      <div className="w-full">
        <header className="bg-gray-50 flex flex-col w-full shrink-0 p-5 shadow-sm border-b-2">
          <div className="flex items-center justify-between">
            <h1>Title</h1>
            <UserButton afterSignOutUrl="/" showName={true} />
          </div>
        </header>
        <section className="flex-grow-[1] p-6">{children}</section>
      </div>
    </div>
  );
}
