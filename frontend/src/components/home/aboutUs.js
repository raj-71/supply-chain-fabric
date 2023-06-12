import { useState } from 'react';
import AboutUsToggleSection from './aboutUsToggleSection';
import aboutUs1 from '../../assets/images/landingPage/aboutUs_1.jpg';
import aboutUs2 from '../../assets/images/landingPage/aboutUs_2.png';
import React from 'react';

function AboutUs() {
  const [aboutUsToggle, setAboutUsToggle] = useState('A');

  const aboutUsToggleData = {
    A: {imgSrc: aboutUs1, title: 'Campus Suvidha', text: 'Welcome to our website! We are dedicated to making life on campus more convenient for students. Our services include a buy and sell platform for selling & buying old items, an auto/cab sharing service which will help you to split your bills.'},
    C: {imgSrc: aboutUs2, title: 'Our Vision', text: `We're a student-run service dedicated to making college life easier. From ride-sharing to meal deals, we're here to help. Our team understands the demands of campus life and is always looking for ways to improve. Trust us to provide fast, reliable service to all students.`},
  }

  return (
    <>
      <div className='select-none'>
        <div>
        <div className="text-center text-4xl font-bold mt-12">
            Know about us!
          </div>
        </div>

        <div className="text-center flex justify-around text-xl mt-10 mx-10 lg:mx-40 cursor-pointer">
          <div onClick={() => setAboutUsToggle('A')} className={`w-full border-b-2 pb-5 ${aboutUsToggle === 'A' ? 'text-indigo-500 border-indigo-500' : ''} hover:border-blue-600 hover:text-blue-600`}>
            About Us
          </div>
          <div onClick={() => setAboutUsToggle('C')} className={`w-full border-b-2 pb-5 ${aboutUsToggle === 'C' ? 'text-indigo-500 border-indigo-500' : ''} hover:border-blue-600 hover:text-blue-600`}>
            Our Vision
          </div>
        </div>

        <div className="flex mx-10 mt-10 lg:mx-40 bg-gradient-to-l from-blue-50 rounded-md">
          {
            ({
              A: <AboutUsToggleSection data={aboutUsToggleData['A']}/>,
              C: <AboutUsToggleSection data={aboutUsToggleData['C']}/>
            })[aboutUsToggle]
          }
        </div>
      </div>
    </>
  );
}

export default AboutUs;