import React from "react"
import Footer from "../components/common/Footer"
import ContactFormSection from "../components/core/AboutPage/ContactFormSection"
import LearningGrid from "../components/core/AboutPage/LearningGrid"
import Quote from "../components/core/AboutPage/Quote"
import StatsComponent from "../components/core/AboutPage/Stats"
import HighlightText from "../components/core/Homepage/HighlightText"
import BannerImage1 from "../assets/Images/BannerImage1.webp"
import BannerImage2 from "../assets/Images/BannerImage2.jpg"
import BannerImage3 from "../assets/Images/BannerImage3.webp"
import FoundingStory from "../assets/Images/FoundingStory.jpg"

const About = () => {
    return (
        <div>
            <section>
                <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-richblack-200">
                    <header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
                        Your Trusted Partner In Reducing <HighlightText text={"Food Waste"} />
                        <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
                            Transform Your Everyday. Waste2Worth empowers individuals to tackle food waste, one step at a time, through smart solutions and a supportive eco-conscious community.
                        </p>
                    </header>
                    <div className="sm:h-[70px] lg:h-[150px]"></div>
                    <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
                        <img src={BannerImage1} alt="" width={300} className='object-contain ml-24 rounded-xl'/>
                        <img src={BannerImage2} alt="" width={300} className='object-contain ml-12 rounded-xl'/>
                        <img src={BannerImage3} alt="" width={300} className='object-contain mr-32 rounded-xl'/>
                    </div>
                </div>
            </section>

            <section className="border-b border-richblack-700">
                <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500 mb-5">
                    <div className="h-[100px] "></div>
                    <Quote />
                </div>
            </section>

            <section>
                <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between text-richblack-500">
                    <div className="flex flex-col items-center gap-5 lg:flex-row justify-between">
                        <div className="mt-24 mb-12 flex lg:w-[50%] flex-col gap-10">
                            <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                                Our Founding Story
                            </h1>
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                                Waste2Worth was born out of a simple yet profound realisation: the power of small, consistent actions to transform lives. The founders, driven by personal experiences, understood the challenge of reducing waste, staying mindful and making a difference in a fast-paced world.
                            </p>
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                                We envisioned a tool that not only will help individuals reduce food waste, but also will inspire them to donate the ones in need while fostering a supportive community.
                            </p>
                        </div>

                        <div>
                            <img
                                src={FoundingStory}
                                width={350}
                                alt=""
                                className="shadow-[0_0_20px_0] shadow-[#FC6767]"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between ">
                        <div className="my-24 flex lg:w-[40%] flex-col gap-10">
                            <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                                Our Vision
                            </h1>
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                                With this vision in mind, we set out on a journey to create a world where everyone has the tool and support they need to reduce food waste. We believe in the transforming power of donation to create lasting change in individuals' lives.
                            </p>
                        </div>
                        <div className="my-24 flex lg:w-[40%] flex-col gap-10">
                            <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
                                Our Mission
                            </h1>
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                                Our mission is to simplify and enhance the way people engage with each other to reduce food waste. We are commited to providing a user-friendly platform that promotes donation, and community support.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <StatsComponent />
            <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
                <LearningGrid />
                <ContactFormSection />
            </section>

            <Footer />
        </div>
    )
}

export default About