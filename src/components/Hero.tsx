import { ArrowRight, Code2, Users, Calendar, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 px-3 sm:px-4 overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

            {/* Gradient Blobs */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 animate-pulse delay-1000" />

            <div className="container relative z-10 mx-auto px-3 sm:px-4">
                <div className="flex flex-col items-center text-center space-y-6 sm:space-y-10">

                    {/* Badge */}
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-cyan-100/50 dark:bg-cyan-950/30 border border-cyan-500/20 text-cyan-700 dark:text-cyan-400 text-xs sm:text-sm font-medium animate-fade-in backdrop-blur-sm shadow-sm flex-wrap justify-center">
                        <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                        <span className="font-semibold">Innovate. Connect. Transform.</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] flex flex-col gap-2 animate-fade-in [animation-delay:200ms]">

                        <span className="flex items-center gap-4">
                            <span>Computer Innovation</span>

                            <img
                                src="./&nobg.png"
                                alt="&"
                                className="w-12 md:w-16 lg:w-20 shrink-0"
                            />
                        </span>

                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 relative">
                            Tech Club
                            <span className="absolute -inset-1 bg-cyan-500/20 blur-2xl -z-10 opacity-50" />
                        </span>

                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in [animation-delay:400ms]">
                        Join the premier student community at NCIT. Where lines of code turn into
                        <span className="text-slate-900 dark:text-slate-200 font-medium"> innovation</span> and students become
                        <span className="text-slate-900 dark:text-slate-200 font-medium"> leaders</span>.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 animate-fade-in [animation-delay:600ms]">
                        <a href="https://forms.gle/ye4PRPt5VpGiNAeF6" target="_blank" rel="noopener noreferrer" className="group relative px-8 py-4 bg-white text-slate-900 font-bold rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                            <span className="relative flex items-center gap-2">
                                Join the Club <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </a>
                        <Link to="/events" className="px-8 py-4 text-slate-900 dark:text-white font-medium hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-2 group">
                            Explore Events
                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-cyan-100 dark:group-hover:bg-cyan-500/20 transition-colors">
                                <ArrowRight className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                            </div>
                        </Link>
                    </div>

                    {/* Stats / Interactive Elements */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 pt-12 border-t border-slate-200 dark:border-white/5 animate-fade-in [animation-delay:800ms]">
                        {[
                            { label: 'Active Members', value: '15+', icon: Users },
                            { label: 'Events Hosted', value: '1+', icon: Calendar },
                            { label: 'Projects Built', value: '3+', icon: Code2 },
                        ].map((stat) => (
                            <div key={stat.label} className="flex flex-col items-center gap-2 group cursor-pointer">
                                <stat.icon className="w-6 h-6 text-slate-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-2" />
                                <span className="text-3xl font-bold text-slate-900 dark:text-white group-hover:scale-110 transition-transform duration-300">
                                    {stat.value}
                                </span>
                                <span className="text-sm text-slate-500 font-medium uppercase tracking-wider">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
