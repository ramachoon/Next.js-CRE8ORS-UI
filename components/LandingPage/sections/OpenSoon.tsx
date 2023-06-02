import * as React from 'react'
import SectionTitle from '../SectionTitle';
import SectionContent from '../SectionContent';

import OpenSoonImage from '../../../assets/Landing/opensoon.png'
import Image from 'next/image'

const OpenSoon = () => {
    return (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 gap-y-4 pt-[10rem] pb-[10rem]'>
            <div className='flex flex-col justify-center'>
                <div>
                    <SectionTitle text='Applications Open Soon' />
                    <SectionContent>
                        Allowlist applications open in July. <br/> Reserve a Cre8ors Collective Passport today and secure your spot. For more info read the FAQ
                    </SectionContent>
                    <div className='lg:m-12'>
                        <button className='px-4 py-2 m-2 font-bold text-white rounded bg-[black]'>Reserve list</button>
                    </div>
                </div>
            </div>
            <div className='flex justify-center'>
                <Image src={OpenSoonImage.src} width={590} height={931}/>
            </div>
        </div>
    )
}

export default OpenSoon;