
import React from 'react';
import { MenuIcon, SearchIcon, SunIcon, MoonIcon, BellIcon, ChevronDownIcon } from './icons';

interface HeaderProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    toggleTheme: () => void;
    currentTheme: string;
    activeView: string;
}

const Header: React.FC<HeaderProps> = ({
    sidebarOpen,
    setSidebarOpen,
    toggleTheme,
    currentTheme,
    activeView
}) => {
    return (
        <header className="sticky top-0 z-30 neumorphic-pane !rounded-none">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Header: Left side */}
                    <div className="flex items-center gap-4">
                        {/* Hamburger button */}
                        <button
                            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] md:hidden"
                            aria-controls="sidebar"
                            aria-expanded={sidebarOpen}
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <MenuIcon />
                        </button>
                        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] hidden sm:block">{activeView}</h1>
                    </div>

                    {/* Header: Right side */}
                    <div className="flex items-center space-x-3">
                         {/* Search */}
                        <div className="relative">
                           <SearchIcon className="absolute top-1/2 left-3 -translate-y-1/2 text-[var(--color-text-secondary)] w-5 h-5" />
                           <input type="search" placeholder="Search..." className="form-input !py-2 !pl-10 !w-48 md:!w-64" />
                        </div>
                        
                        {/* Theme Toggle */}
                        <button onClick={toggleTheme} className="btn-icon">
                            {currentTheme === 'light' ? <MoonIcon /> : <SunIcon />}
                        </button>

                        {/* Notifications */}
                        <button className="btn-icon">
                            <BellIcon />
                        </button>

                        {/* User menu */}
                        <div className="relative inline-flex">
                           <button className="flex items-center gap-2 p-2 rounded-full neumorphic-convex">
                               <img className="w-8 h-8 rounded-full" src="https://i.pravatar.cc/40" alt="User" />
                               <span className="hidden md:block text-sm font-semibold text-[var(--color-text-primary)]">Admin</span>
                               <ChevronDownIcon />
                           </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;