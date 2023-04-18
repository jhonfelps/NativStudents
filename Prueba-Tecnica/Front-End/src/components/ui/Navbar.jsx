import { Link, NavLink } from 'react-router-dom';


export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Estudiantes y Cursos
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink 
                        className="nav-item nav-link" 
                        to="/"
                    >
                        Estudiantes
                    </NavLink>

                    <NavLink 
                        className="nav-item nav-link" 
                        to="/courses"
                    >
                        Cursos
                    </NavLink>
                    <NavLink 
                        className="nav-item nav-link" 
                        to="/coursestopthree"
                    >
                        Cursos Top 3
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}