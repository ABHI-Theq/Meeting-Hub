import { Link, useLocation } from "react-router-dom";
import { Home, User, Mail, LogOut, Sparkles } from "lucide-react";
import useLogin from "../hooks/useLogin";
import useLogout from "../hooks/useLogout";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  const logout=useLogout()

  const callLogout=async()=>{
    await logout()
  }

  return (
    <div className="relative overflow-hidden">
      {/* Animated background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-90"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-base-100/10 to-transparent"></div>
      
      {/* Floating orbs for visual interest */}
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-secondary/30 rounded-full blur-lg animate-bounce"></div>
      
      <header className="relative bg-gradient-to-r from-base-100/95 via-base-200/90 to-base-100/95 backdrop-blur-lg border-b border-base-content/20 shadow-2xl">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex justify-center items-center">
            <div className="flex items-center gap-2 bg-base-100/80 backdrop-blur-sm rounded-full px-8 py-3 shadow-lg border border-base-content/10">
              
              {/* Home Link */}
              <div className="group relative">
                <Link 
                  to="/home"
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm md:text-base lg:text-lg transition-all duration-300 transform hover:scale-105 ${
                    isActive('/home') 
                      ? 'bg-primary text-primary-content shadow-lg shadow-primary/25' 
                      : 'text-base-content hover:text-primary hover:bg-primary/10'
                  }`}
                >
                  <Home className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:inline">Home</span>
                </Link>
                {isActive('/home') && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full animate-ping"></div>
                )}
              </div>

              {/* Separator */}
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-base-content/30 to-transparent mx-2"></div>

              {/* About Link */}
              <div className="group relative">
                <Link 
                  to="/about"
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm md:text-base lg:text-lg transition-all duration-300 transform hover:scale-105 ${
                    isActive('/about') 
                      ? 'bg-secondary text-secondary-content shadow-lg shadow-secondary/25' 
                      : 'text-base-content hover:text-secondary hover:bg-secondary/10'
                  }`}
                >
                  <User className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:inline">About</span>
                </Link>
                {isActive('/about') && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-secondary rounded-full animate-ping"></div>
                )}
              </div>

              {/* Separator */}
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-base-content/30 to-transparent mx-2"></div>

              {/* Contact Link */}
              <div className="group relative">
                <Link 
                  to="/contactus"
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm md:text-base lg:text-lg transition-all duration-300 transform hover:scale-105 ${
                    isActive('/contactus') 
                      ? 'bg-accent text-accent-content shadow-lg shadow-accent/25' 
                      : 'text-base-content hover:text-accent hover:bg-accent/10'
                  }`}
                >
                  <Mail className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:inline">Contact</span>
                </Link>
                {isActive('/contactus') && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-accent rounded-full animate-ping"></div>
                )}
              </div>

              {/* Separator */}
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-base-content/30 to-transparent mx-2"></div>

              {/* Logout Button */}
              <div onClick={callLogout} className="group relative">
                <Link 
                  to="/"
                  className="flex items-center gap-2 bg-gradient-to-r from-error to-warning text-error-content px-4 py-2 rounded-full font-bold text-sm md:text-base lg:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-error/30 hover:from-error-focus hover:to-warning-focus"
                >
                  <LogOut className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="hidden sm:inline">Logout</span>
                  <Sparkles className="w-3 h-3 opacity-75 animate-pulse" />
                </Link>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-error/30 to-warning/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            </div>
          </nav>
        </div>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
      </header>
    </div>
  );
};

export default Header;