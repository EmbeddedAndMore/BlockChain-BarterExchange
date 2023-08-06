import React, { useState, useContext, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { useStateContext } from '../context';
import { CustomButton } from './';
import { logo, menu, search, thirdweb } from '../assets';
import { navlinks } from '../constants';
import { OfferContext } from "../App"
import { OfferRow } from '../components'


const AllOffers = (offers) => {

    const { connect, address, getOffers } = useStateContext();
    const { otherAsset, setOtherAsset, ownAsset, setOwnAsset } = useContext(OfferContext);
    const [offers, setOffers] = useState([]);

    const requestExchange = async (to, ownOffer, requestedOffer) => {
        await requestForExchange({ to, ownOffer, requestedOffer })
    }


    return (
        <div className="flex  bg-[#1c1c24] rounded-[20px]  py-4 mt-12">
            {
                offers.length == 0 &&

                <div className='flex justify-center items-center'>
                    <p className='font-epilogue font-bold text-[20px] text-white'> No Offers available. </p>
                </div>
            }
            {
                offers.length > 0 &&
                offers.map((offer) => {

                    <OfferRow />

                })
            }

        </div>
    )
}

export default AllOffers