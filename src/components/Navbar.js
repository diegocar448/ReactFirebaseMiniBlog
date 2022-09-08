import { NavLink } from "react-router-dom";

import { useAuthentication } from "../hooks/useAuthentication";

//para pegar o valor do contexto
import { useAuthValue } from "../context/AuthContext";

import styles from "./Navbar.module.css";

const Navbar = () => {
    const { user } = useAuthValue();
    const { logout } = useAuthentication();


  return (
    <div className={styles.navbar}>
        <NavLink to="/" className={styles.brand}>
            Mini <span>Blog</span>
        </NavLink>
        <ul className={styles.links_list}>
            <li>
                <NavLink to="/" className={({isActive}) => (isActive ? styles.active : '')}>
                    Home
                </NavLink>
                {/* verificar se há usuario */}
                {!user && (
                    <>
                        <NavLink to="/login" className={({isActive}) => (isActive ? styles.active : '')}>
                            Entrar
                        </NavLink>
                        <NavLink to="/register" className={({isActive}) => (isActive ? styles.active : '')}>
                            Cadastrar
                        </NavLink>
                    </>
                )}
                {user && (
                    <>
                        <NavLink to="/posts/create" className={({isActive}) => (isActive ? styles.active : '')}>
                            Novo Post
                        </NavLink>
                        <NavLink to="/dashboard" className={({isActive}) => (isActive ? styles.active : '')}>
                            Dashboard
                        </NavLink>
                    </>
                )}
                <NavLink to="/about" className={({isActive}) => (isActive ? styles.active : '')}>
                    Sobre
                </NavLink>
            </li>
            {user && (                
                <li>
                    <button onClick={logout}>Sair</button>
                </li>
            )}            
        </ul>
    </div>
  )
}

export default Navbar