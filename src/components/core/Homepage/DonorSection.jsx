import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from './Button'
import { FaArrowRight } from 'react-icons/fa'
import donor1 from '../../../assets/Images/donor1.jpg'
import donor2 from '../../../assets/Images/donor2.webp'
import donor3 from '../../../assets/Images/donor3.jpg'

const DonorSection = () => {
  return (
    <div className='mt-24 mb-16'> 
        <div className='flex flex-col gap-5 items-center'>
            <div className='text-4xl font-semibold text-center'>
                Every Shared Meal Is A Story Of <HighlightText text={'Care And Kindness'}/>
            </div>
            <div className='text-center text-richblack-600 mx-auto text-lg font-medium w-[75%]'>
                Together We Can Ensure That Food Doesn't Go To Waste And Reaches Those Who Need It Most
            </div>            
              <div className='flex flex-row items-center justify-center mt-10'>
                <img src={donor3} alt='' className='object-contain -mr-16 rotate-12 rounded-xl'/>
                <img src={donor2} width={459} alt='' className='object-contain z-10 rounded-xl'/>
                <img src={donor1} alt='' className='object-contain -ml-16 rotate-12 z-20 rounded-xl'/>
                </div> 
                <div className='flex flex-row gap-7 mt-6 items-center justify-center mb-3'>
                        <CTAButton active={true} linkto={'/signup'}><div className='flex flex-row gap-2 items-center'>
                            Learn More
                            <FaArrowRight/>
                            </div></CTAButton>
                        <CTAButton active={false} linkto={'/login'}>Serve Smiles</CTAButton>
                    </div>     
        </div>
    </div>
  )
}

export default DonorSection