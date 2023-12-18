import {Link} from "react-router-dom";


const Header = () => {
    return (
        <div className='header'>
            <Link className='header-link' to={'/'}>
                <img className='header_img' src="/logo.png" alt="" />
                <p className='header-link' style={{"fontSize": "2.5rem"}}>Educastick</p>
            </Link>
            <div className='links-header'>
            <Link className='header-link' to={'/'}>Статистика</Link>
            <Link className='header-link' to={'/groups'}>Группы</Link>
            <Link className='header-link' to={'/tests'}>Тесты</Link>
            <Link className='header-link' to={'/'}>Ответы</Link>
            <Link className='header-link' to={'/'}>
                <img className='header_img_user' src="/avatar.svg" alt="" />
            </Link>
            </div>            
        </div>
    );
};

export default Header;