import React from 'react';

import {thirdweb } from '../assets';

const AssetCard = ({ owner, name, title, description, image, handleClick, handleSelect, disabled }) => {
  // const remainingDays = daysLeft(deadline);
  return (
    <div className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer">
      <div onClick={handleClick} style={disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}>
        <img src={image} alt="fund" className="w-full h-[158px] object-cover rounded-[15px]" />

        <div className="flex flex-col p-4">

          <div className="block">
            <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">{title}</h3>
            <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">{description}</p>
          </div>

          <div className="flex items-center mt-[20px] gap-[12px]">
            <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
              <img src={thirdweb} alt="user" className="w-1/2 h-1/2 object-contain" />
            </div>
            <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">by <span className="text-[#b2b3bd]">{owner}</span></p>
          </div>
        </div>

      </div>
      <div className="flex items-center justify-center mt-[20px] mb-[20px]">
        <button className='text-white' onClick={handleSelect}>Select</button>
      </div>
    </div>
  )
}

export default AssetCard