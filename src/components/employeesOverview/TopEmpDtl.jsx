import React from 'react'
import Image from "next/image"
import empImg from "@/../../public/assets/empDetails/employeesOverview.svg";
import bag from "@/../../public/assets/empDetails/OfficeBag.svg";
import { CiMail } from "react-icons/ci";
import { AiFillEdit } from "react-icons/ai";

const TopEmpDtl = () => {
  return (
    <div className='h-full flex justify-between items-center p-5'>
        <div className='flex gap-6'>
            <Image  src={empImg} alt="Employee Overview"/>
            <div className='flex flex-col justify-evenly'>
                <h2 className='font-semibold text-lg'>Darlene Robertson</h2>
                <p className='flex items-center gap-3'><Image src={bag} alt='Office Bag' /> <span>UI/UX Designer</span></p>
                <p className='flex items-center gap-3'><CiMail className='w-5 h-5 font-semibold'/> <span>Darlene@synectiks.com</span></p>
            </div>

        </div>
        
        <button className='flex items-center gap-2 bg-[#1890FF] text-white font-semibold  border hover:text-[#1890FF] hover:bg-white hover:border-[#1890FF]  py-2 px-4 rounded-sm '> <AiFillEdit />Edit Profile</button>
    </div>
  )
}

export default TopEmpDtl