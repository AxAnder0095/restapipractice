import './NavbarStyles.sass'
import {Link} from 'react-router-dom'

export const Navbar = () => {
    return(
        <nav className='nav-container'>
            <div style={{paddingLeft: '1rem'}}>
                <h2 className='nav-title'>Penguin's Luxury Auto's</h2>
            </div>
            <div className='nav-links' style={{paddingRight: '1rem'}}>
                <Link to={'/'} className='nav-link'>SHOWROOM</Link>
                <Link to={'/addcar'} className='nav-link'>ADD VEHICLE</Link>
            </div>
        </nav>
    )
};