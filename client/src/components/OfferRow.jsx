import React, { useState, useContext, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { useStateContext } from '../context';
import { CustomButton } from './';
import { logo, menu, search, thirdweb } from '../assets';
import { navlinks } from '../constants';
import { OfferContext } from "../App"


const OfferRow = (offer) => {

    const { connect, address, acceptExchange, requestForWithdraw } = useStateContext();
    const { otherAsset, setOtherAsset, ownAsset, setOwnAsset } = useContext(OfferContext);

    const requestExchange = async (to, ownOffer, requestedOffer) => {
        await requestForExchange({ to, ownOffer, requestedOffer })
    }


    return (
        <div className="flex  bg-[#1c1c24] rounded-[20px]  py-4 mt-12">
            <div grid grid-cols-4>
                <div></div>
                <div></div>
                <div></div>
                <div grid grid-cols-2>
                    <div>
                        <CustomButton
                            btnType="button"
                            title={address ? 'Submit offer' : 'Connect'}
                            styles={address ? 'bg-[#1dc071] text-[14px] leading-[20px] min-h-[40px] ml-20' : 'bg-[#8c6dfd] text-[14px] leading-[20px] min-h-[40px] ml-20'}
                            handleClick={() => {

                            }}
                        />
                    </div>
                    <div>
                        <CustomButton
                            btnType="button"
                            title={address ? 'Submit offer' : 'Connect'}
                            styles={address ? 'bg-[#1dc071] text-[14px] leading-[20px] min-h-[40px] ml-20' : 'bg-[#8c6dfd] text-[14px] leading-[20px] min-h-[40px] ml-20'}
                            handleClick={() => {

                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OfferRow