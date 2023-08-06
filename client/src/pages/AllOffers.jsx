import React, { useState, useContext, useMemo, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";

import { useStateContext } from '../context';
import { logo, menu, search, thirdweb } from '../assets';
import { navlinks } from '../constants';
import { OfferContext } from "../App"
import { OfferRow } from '../components'


const AllOffers = () => {

    const [isLoading, setIsLoading] = useState(false);
    const { connect, contract, address, getOffers } = useStateContext();
    const { otherAsset, setOtherAsset, ownAsset, setOwnAsset } = useContext(OfferContext);
    const [offers, setOffers] = useState([]);

    const requestExchange = async (to, ownOffer, requestedOffer) => {
        await requestForExchange({ to, ownOffer, requestedOffer })
    }


    const loadOffers = async () => {
        setIsLoading(true);
        const data = await getOffers()
        setOffers(data);
        console.log("Offers loaded")
        setIsLoading(false);
    }


    useEffect(() => {
        if (contract) {
            loadOffers();
        }
    }, [address, contract])



    return (
        <div>
            {offers.length == 0 &&
                <div className="flex justify-center items-center bg-[#1c1c24] rounded-[20px]  py-4 mt-12">
                    <div className=''>
                        <p className='font-epilogue font-bold text-[20px] text-white text-center'> No Offers available. </p>
                    </div>
                </div>
            }

            <div>
                {
                    offers.length > 0 &&
                    offers.map((offer) =>

                        <OfferRow
                            key={uuidv4()}
                            offer={offer} />

                    )
                }
            </div>



        </div>
    )
}

export default AllOffers