import React, { useState, useContext, useMemo } from 'react'

import { useStateContext } from '../context';
import { CustomButton} from './';


const OfferRow = ({ offer, handleWithdraw, handleAccept }) => {
    const { connect, address } = useStateContext();
    const [isLoading, setIsLoading] = useState(false);



    console.log(`row rendered ${isLoading}`);

    return (
        <div>
            <div className="flex max-h-[80px] bg-[#1c1c24] rounded-[20px] py-4 mt-12 px-4" style={offer.isConfirmed || offer.isWithdrawn ? { pointerEvents: "none", opacity: "0.4" } : {}}>
                <div className='grid grid-cols-5 gap-2'>
                    <div className='flex items-center'>
                        <span className='font-epilogue font-bold text-[16px] text-white text-center'>From: </span>
                        <span className='font-epilogue text-[14px] text-white text-center truncate ml-1'>{offer.from === address ? 'you' : offer.from}</span>
                    </div>
                    <div className='flex items-center'>
                        <span className='font-epilogue font-bold text-[16px] text-white text-center'>To: </span>
                        <span className='font-epilogue text-[14px] text-white text-center truncate ml-1'>{offer.to === address ? 'you' : offer.to}</span>
                    </div>
                    <div className='flex items-center col-span-2'>
                        <span className='font-epilogue font-bold text-[16px] text-white text-center'>Requested: </span>
                        <span className='font-epilogue text-[14px] text-white text-center truncate ml-1'>{offer.offeredAssetName}</span>
                        <span className='font-epilogue font-bold text-[16px] text-white text-center truncate ml-1'>in exchange for: </span>
                        <span className='font-epilogue text-[14px] text-white text-center truncate ml-1'>{offer.requestedAssetName}</span>
                    </div>
                    {
                        offer.from === address ?
                            (<div className='grid grid-cols-2'>
                                <div></div>
                                <div>
                                    <CustomButton
                                        btnType="button"
                                        title="Withdraw"
                                        styles={address ? 'bg-[#ff0000] text-[12px] leading-[20px] min-h-[25px]' : ''}
                                        handleClick={() => {
                                            handleWithdraw();
                                        }}
                                    />
                                </div>
                            </div>) : (
                                <div className='grid grid-cols-2'>
                                    <div>
                                        <CustomButton
                                            btnType="button"
                                            title="Accept"
                                            styles={address ? 'bg-[#1dc071] text-[12px] leading-[20px] min-h-[25px]' : ''}
                                            handleClick={() => {
                                                handleAccept();
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <CustomButton
                                            btnType="button"
                                            title="Withdraw"
                                            styles={address ? 'bg-[#ff0000] text-[12px] leading-[20px] min-h-[25px]' : ''}
                                            handleClick={() => {
                                                handleWithdraw();
                                            }}
                                        />
                                    </div>
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default OfferRow