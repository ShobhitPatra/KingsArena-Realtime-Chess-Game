import { useState, useEffect, type ReactNode } from "react";
import { Github, History, Home, LogOut, Menu, X } from "lucide-react";

interface NavItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
}

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      const menuButton = document.getElementById("menu-button");

      if (
        isOpen &&
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        menuButton &&
        !menuButton.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logout clicked");
    setIsOpen(false);
  };

  const navItems: NavItem[] = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/history", icon: History, label: "History" },
    { href: "/contribute", icon: Github, label: "Contribute" },
    { href: "#", icon: LogOut, label: "Logout", onClick: handleLogout },
  ];

  const closeSidebar = () => setIsOpen(false);

  return (
    <div className="flex h-screen overflow-hidden ">
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - Fixed full height */}
      <aside
        id="sidebar"
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-200 shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        aria-label="Main navigation"
      >
        {/* Sidebar Header - Fixed */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <h1 className="font-bold text-lg text-gray-900">KingsArena</h1>
          {/* Close button for mobile */}
          <button
            onClick={closeSidebar}
            className="md:hidden p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation - Scrollable if needed */}
        <nav
          className="flex flex-col p-4 space-y-1 flex-1 overflow-y-auto"
          role="navigation"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={
                item.onClick
                  ? (e) => {
                      e.preventDefault();
                      item.onClick!();
                    }
                  : closeSidebar
              }
              className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md transition-colors duration-200 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-50"
              role="menuitem"
            >
              <item.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="font-medium">{item.label}</span>
            </a>
          ))}

          {/* Optional: Add more nav items or footer content */}
          <div className="mt-auto pt-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 px-3">Version 1.0.0</div>
          </div>
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col ml-0 md:ml-64 h-screen overflow-hidden">
        {/* Mobile header - Fixed */}
        <header className="flex items-center justify-between p-4 bg-white shadow-sm border-b border-gray-200 md:hidden flex-shrink-0">
          <button
            id="menu-button"
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Open sidebar"
            aria-expanded={isOpen}
            aria-controls="sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="font-semibold text-gray-900">KingsArena</h2>
          <div className="w-10" />
        </header>

        {/* Main content - Scrollable */}
        <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
      </div>
    </div>
  );
};
