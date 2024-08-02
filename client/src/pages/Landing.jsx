import React from 'react'

const Landing = () => {
  return (
    <div className=''>
        <div className='hero h-[calc(100vh-100px)]'>
                <div className='border h-full w-full bg-black/40 flex flex-col items-center justify-center'>
                    <div className='flex flex-col items-center justify-center'>
                        <h1 className='text-[6vw] text-white leading-none font-semibold'>Transform Your Future <br></br>
                         with High Impact Talent</h1>
                        <p className='text-2xl text-white'>Bridging the Gap Between Top-Tier Strategic Professionals and Leading Organizations</p>
                    </div>
                    {/* <div className='flex gap-2'>
                        <div className='bg-blue-500 p-2 text-white'>Find Yor Next Job</div>
                        <div className='bg-blue-500 p-2 text-white'>Post a Job</div>
                    </div> */}
                </div>
        </div>
        <div className='h-screen'>
            <div className='h-full w-full flex items-center justify-center'>
                <p className='text-2xl max-w-[500px]'>Welcome to High Impact Talent, your premier destination for connecting exceptional talent with high-impact roles. Whether you're a job seeker aiming to elevate your career or an employer searching for strategic professionals to drive your business forward, we are here to make it happen. Founded by seasoned experts from Bain & Company and the Mahindra Group, we specialize in strategic recruitment that aligns with your goals.</p>
            </div>
        </div>
        <div className='h-screen flex items-center justify-center'>

            <div className='flex flex-col max-w-[600px] gap-5 text-xl'>
                <div className='border border-[#1176DB] p-2'>
                    <p>Top-Tier Talent: Access a curated pool of professionals with expertise in digital transformation, sustainability, data-driven decision-making, and more</p>
                </div>
                <div className='border border-[#1176DB] p-2'>
                    <p>Industry Insights: Stay ahead with the latest hiring trends and strategies for 2024 and beyond.</p>
                </div>
                <div className='border border-[#1176DB] p-2'>
                    <p>Personalized Matching: Our advanced algorithms and expert team ensure the best fit for both candidates and employers.</p>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Landing