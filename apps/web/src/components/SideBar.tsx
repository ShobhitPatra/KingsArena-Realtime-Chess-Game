// SidebarLayout.tsx
import { useState } from "react";
import { Github, History, Home, LogOut, Menu } from "lucide-react"; // or use Heroicons

export const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-32 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative`}
      >
        <div className="p-4 font-bold text-lg border-b">KingsArena</div>
        <nav className="flex flex-col p-4 space-y-2">
          <a
            href="/"
            className="flex items-center gap-1 text-gray-700 hover:text-blue-500 cursor-pointer"
          >
            <Home className="h-4 w-4" />
            <h4>Home</h4>
          </a>
          <a
            href="#"
            className="flex items-center gap-1  text-gray-700 hover:text-blue-500 cursor-pointer"
          >
            <History className="h-4 w-4" />
            <h4>History</h4>
          </a>
          <a
            href="#"
            className="flex items-center gap-1  text-gray-700 hover:text-blue-500 cursor-pointer"
          >
            <Github className="h-4 w-4" />
            <h4>Contribute</h4>
          </a>
          <a
            href="#"
            className="flex items-center gap-1  text-gray-700 hover:text-blue-500 cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <h4>Logout</h4>
          </a>
        </nav>
      </aside>
      {/* Main content */}
      <div className="flex-1 flex flex-col ">
        {/* Topbar for mobile */}
        <header className="flex items-center justify-between p-4 bg-white shadow-md md:hidden">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-gray-700 focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>
          {/* <div className="font-bold text-lg">Responsive Layout</div> */}
        </header>
      </div>
    </div>
  );
};
