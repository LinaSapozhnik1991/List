import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className='Navbar'>
      <Link className='NavLink' to="/">Продукты</Link>
      <Link className='NavLink' to="/create-product">Создать</Link>
    </nav>
  );
};

export default Navbar;