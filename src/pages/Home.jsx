import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import HighlightText from '../components/core/Homepage/HighlightText'
import CTAButton from '../components/core/Homepage/Button'
import Background from '../assets/Images/background.jpg'
import Hiw1 from '../assets/Images/hiw1.jpg'
import Hiw2 from '../assets/Images/hiw2.jpg'
import Hiw3 from '../assets/Images/hiw3.jpg'
import CodeBlocks from '../components/core/Homepage/CodeBlocks'
import DonorSection from '../components/core/Homepage/DonorSection'
import RecepientSection from '../components/core/Homepage/RecepientSection'
import Footer from '../components/common/Footer'

const Home = () => {
    return (
        <div>
            {/* SECTION 1 */}
            <div className='bg-black bg-opacity-70 bg-blend-darken bg-cover bg-center h-screen max-w-[100%]' style={{ backgroundImage: `url(${Background})` }}>
                <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent text-richblack-5'>
                    <Link to={'/signup'}>
                        <div className='group mt-16 p-1 rounded-full bg-blue-500 font-bold text-white
            transition-all duration-200 hover:scale-95 w-fit'>
                            <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                transition-all duration-200 group-hover:bg-blue-600'>
                                <p>Share A Meal</p>
                                <FaArrowRight></FaArrowRight>
                            </div>
                        </div>
                    </Link>
                    <div className='text-4xl font-semibold mt-16'>
                        From LeftOvers To Lifelines,<HighlightText text={'Every Meal Matters'} />
                    </div>
                    <div className='mt-8 w-[42%] text-lg font-bold text-richblack-30'>
                        Connecting Donors And Recepients To Reduce Food Waste And Fight Hunger Through Efficient Tracking, Quality Check And Real Time Updates.
                    </div>
                    <div className='flex flex-row gap-7 mt-8'>
                        <CTAButton active={true} linkto={'/signup'}>Sign Up</CTAButton>
                        <CTAButton active={false} linkto={'/login'}>Login</CTAButton>
                    </div>
                </div>
            </div>

            {/* SECTION 2 */}
            <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent text-richblack-200 mb-5'>
               <CodeBlocks
                    position={"lg:flex-row"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Make A
                            <HighlightText text={'Difference '} />
                            With Our App
                        </div>
                    }
                    subheading={
                        'Monitor The Journey Of Your Donations From Collection To Distribution.'
                    }
                    ctabtn1={
                        {
                            btnText: "Start Donating",
                            linkto: "/signup",
                            active: true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Request Food",
                            linkto: "/login",
                            active: false,
                        }
                    }
                    codeblock={`Guaranteeing Safe And Fresh Food Through Quality Checks Before Delivery.\nFind And Donate Food Nearby With Location-Based Matching.\nOffer Surplus Food Or Support Causes With Multiple Donation Options.\nShare Your Experience And Rate Interactions For Continual Improvement.\nStay Updated Of Requests And Progress.\nRead Inspiring Stories Of Donors And Recepients Making A Difference.`}
                    codeColor={"text-yellow-200"}
                />
            <div>
                    <div className='text-4xl font-semibold text-center mb-10'>
                        How It
                        <HighlightText text={"Works"} />

                    </div>
                    <div className='flex m-3 w-11/12'>
                        <div className='group hover:scale-95 transition-all duration-200'>
                        <img src={Hiw1} alt='Connect And Share' className='h-48 block m-auto'/>
                        <div className='bg-richblack-25 p-6 mt-9 mr-5 ml-5 rounded-lg text-richblack-600 group-hover:text-white group-hover:bg-caribbeangreen-600'>
                <h2 className='text-center font-bold text-2xl'>Connect And Share</h2>
                <p className='text-center text-lg px-10 mt-3'>Donors Register And List Surplus Food, While Recepients Browse Available Donations Based On Locations</p>
                </div>
                        </div>
                        <div className='group hover:scale-95 transition-all duration-200'>
                        <img src={Hiw2} alt='Track In Real Time' className='h-48 block m-auto rounded-full'/>
                        <div className='bg-richblack-25 p-6 mt-9 mr-5 ml-5 rounded-lg text-richblack-600 group-hover:text-white group-hover:bg-caribbeangreen-600'>
                <h2 className='text-center font-bold text-2xl'>Track In Real Time</h2>
                <p className='text-center text-lg px-10 mt-3'>Real Time Tracking Ensures Safe Collection, Storage And Timely Delivery Of Fresh-Food</p>
                </div>
                        </div>
                        <div className='group hover:scale-95 transition-all duration-200'>
                        <img src={Hiw3} alt='Deliver With Care' className='h-48 block m-auto'/>
                        <div className='bg-richblack-25 p-6 mt-9 mr-5 ml-5 rounded-lg text-richblack-600 group-hover:text-white group-hover:bg-caribbeangreen-600'>
                <h2 className='text-center font-bold text-2xl'>Deliver With Care</h2>
                <p className='text-center text-lg px-10 mt-3'>Verified Recepients Receive Donations With Quality Checks Ensuring Food Safety</p>
                </div>
                        </div>                        
                        </div>                    
                </div>    
            </div>
            {/* SECTION3  */}
            <div className='bg-pure-greys-5 text-richblack-700'>
                <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify between gap-7'>
                    <DonorSection/>
                    <RecepientSection/>
                </div>

            </div>
            <Footer/>
        </div>
    )
}

export default Home