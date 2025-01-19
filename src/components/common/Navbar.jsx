import React from 'react'
import { Link, matchPath } from 'react-router-dom'
import { NavbarLinks } from "../../data/NavbarLinks"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import Logo from '../../assets/Logo/Logo.png'

const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }
    return (
        <div className='flex h-14 items-center justify-center bg-gradient-to-t from-richblack-800 to-richblue-600'>
            <div className='flex w-11/12 max-w-maxContent items-center justify-between mr-20'>
                {/* Image */}
                <Link to="/">
                    <img src={Logo} width={80} height={10} loading='lazy' className='mb-2 ml-16'
                        alt='Logo' />
                </Link>

                {/* Nav Links */}
                <nav>
                    <ul className='flex gap-x-6 text-richblack-25'>
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    <Link to={link?.path}>
                                        <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                            {link.title}
                                        </p>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                {/* Login/SignUp/Dashboard */}
                <div className='flex gap-x-4 items-center'>
                    {
                        token === null && (
                            <Link to="/login">
                                <button className='border border-richblack-300 bg-richblack-25 px-[10px] py-[5px] text-richblack-800 rounded-md'>
                                    Log In
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup">
                                <button className='border border-richblack-200 bg-richblack-25 px-[10px] py-[5px] text-richblack-800 rounded-md'>
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && <ProfileDropDown />
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar