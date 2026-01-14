import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Set scrolled state for styling
            setIsScrolled(currentScrollY > 20);

            // Auto-hide logic: Hide after 100px when scrolling down, show when scrolling up
            if (currentScrollY > 100) {
                if (currentScrollY > lastScrollY) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }
            } else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const handleHomeClick = () => {
        window.scrollTo(0, 0);
    };

    const navLinks = [
        { name: 'Home', href: '/', type: 'route' },
        { name: 'About', href: '/#about', type: 'anchor' },
        { name: 'Events', href: '/events', type: 'route' },
        { name: 'Team', href: '/team', type: 'route' },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
                    } ${isScrolled ? 'py-4' : 'py-6'}`}
            >
                <div className="container mx-auto px-4 md:px-6">
                    <div
                        className={`mx-auto max-w-7xl rounded-2xl transition-all duration-300 ${isScrolled
                            ? 'bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-lg px-6 py-3'
                            : 'bg-transparent border border-transparent px-0 py-2'
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            {/* Logo */}
                            <Link to="/" className="flex items-center gap-3 group" onClick={handleHomeClick}>
                                <div className={`relative flex items-center justify-center rounded-xl transition-all duration-300 ${isScrolled ? 'w-10 h-10' : 'w-20 h-20'}`}>
                                    <img src="/CITCLOGO.png" alt="CITC Logo" className="w-full h-full object-contain" />
                                </div>
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex items-center bg-black/5 dark:bg-white/[0.03] rounded-full px-2 py-1 border border-black/5 dark:border-white/[0.05]">
                                {navLinks.map((link) => (
                                    link.type === 'route' ? (
                                        <Link
                                            key={link.name}
                                            to={link.href}
                                            onClick={link.name === 'Home' ? handleHomeClick : undefined}
                                            className="px-5 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/[0.05] rounded-full transition-all duration-300"
                                        >
                                            {link.name}
                                        </Link>
                                    ) : (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            className="px-5 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/[0.05] rounded-full transition-all duration-300"
                                        >
                                            {link.name}
                                        </a>
                                    )
                                ))}
                            </div>

                            {/* Action Button & Theme Toggle */}
                            <div className="hidden md:flex items-center gap-4">
                                <ThemeToggle />
                                <Link
                                    to="/register/ai"
                                    className="group relative px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-full overflow-hidden hover:bg-slate-800 dark:hover:bg-cyan-50 transition-colors"
                                >
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-300 to-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                                    <span className="relative flex items-center gap-2">
                                        Join Club <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Link>
                            </div>

                            {/* Mobile Menu Button */}
                            <div className="flex md:hidden items-center gap-4">
                                <ThemeToggle />
                                <button
                                    className="text-slate-900 dark:text-white p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors relative z-[60]"
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    aria-label="Toggle menu"
                                >
                                    {isMobileMenuOpen ? <X /> : <Menu />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Backdrop */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-[55] bg-black/20 dark:bg-black/40 backdrop-blur-sm transition-opacity duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Menu Sidebar (Drawer) */}
            <div
                className={`fixed top-0 right-0 bottom-0 z-[56] w-full max-w-xs bg-white dark:bg-[#0f172a] shadow-2xl transition-transform duration-500 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full pt-28 px-8 pb-10">
                    <div className="flex flex-col space-y-6">
                        {navLinks.map((link) => (
                            link.type === 'route' ? (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-xl font-bold text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        if (link.name === 'Home') {
                                            handleHomeClick();
                                        }
                                    }}
                                >
                                    {link.name}
                                </Link>
                            ) : (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-xl font-bold text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            )
                        ))}
                    </div>

                    <div className="mt-auto">
                        <Link
                            to="/register/ai"
                            className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/25 w-full text-center"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Join Club Now
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
