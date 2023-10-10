import {Link} from "react-router-dom";


const Header = () => {
    return (
        <div className='header'>
            <Link className='header-link' to={'/'}>Стартовая</Link>
            <Link className='header-link' to={'/groups'}>Группы</Link>
        </div>
    );
};

export default Header;