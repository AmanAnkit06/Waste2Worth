import React from 'react'
import CTAButton from './Button'
import recepient from '../../../assets/Images/Recepient.png'

const RecepientSection = () => {
  return (
    <div>
        <div className='flex flex-row gap-20 items-center mb-10'>
            <div className='w-[40%]'>
                <img src={recepient} alt='' className='rounded-xl'/>
            </div>
            <div className='w-[50%] flex flex-col gap-5'>
                <div className='text-2xl font-semibold text-richblack-500'>
                    A Platform Ensuring Surplus Food Reaches To Those In Need Safely, Efficiently And Sustainably! 
                </div>
                <div className='text-xl font-medium text-richblack-400'>
                    Empowering Communities To Donate, Track And Share Food Responsibly While Reducing Waste.
                </div>
                <div className='flex flex-row gap-7 mt-3 mb-3'>
                        <CTAButton active={true} linkto={'/signup'}>Sign Up To Help</CTAButton>
                        <CTAButton active={false} linkto={'/login'}>Login And Start Sharing</CTAButton>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default RecepientSection