import React, { useState, useContext, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { useStateContext } from '../context';
import { CustomButton } from './';
import { logo, menu, search, thirdweb } from '../assets';
import { navlinks } from '../constants';
import { OfferContext } from "../App"


const Footer = () => {

    const { connect, address, requestForExchange } = useStateContext();
    const { otherAsset, setOtherAsset, ownAsset, setOwnAsset } = useContext(OfferContext);

    const requestExchange = async (to, ownOffer, requestedOffer) => {
        await requestForExchange({ to, ownOffer, requestedOffer })
    }


    return (
        <div className="flex justify-center items-center bg-[#1c1c24] rounded-[20px]  py-4 mt-12">
            <div>
                <span className="font-epilogue font-bold text-[20px] text-white ">Other: </span>
                <span className="font-epilogue text-[20px] text-white truncate">{otherAsset?.title}</span>

                <span className="font-epilogue font-bold text-[20px] text-white ml-20">Own: </span>
                <span className="font-epilogue text-[20px] text-white truncate">{ownAsset?.title}</span>

                <CustomButton
                    btnType="button"
                    title={address ? 'Submit offer' : 'Connect'}
                    styles={address ? 'bg-[#1dc071] text-[14px] leading-[20px] min-h-[40px] ml-20' : 'bg-[#8c6dfd] text-[14px] leading-[20px] min-h-[40px] ml-20'}
                    handleClick={() => {
                        if (address) {
                            if (otherAsset !== null && ownAsset != null)
                                requestExchange({ otherAsset.owner, ownAsset, other })
                        }
                        else connect();
                    }}
                />
            </div>
        </div>
    )
}

export default Footer