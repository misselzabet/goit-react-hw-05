import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

function Navigation() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : undefined)}>Home</NavLink>
      <NavLink to="/movies" className={({ isActive }) => (isActive ? styles.active : undefined)}>Movies</NavLink>
    </nav>
  );
}

export default Navigation;
