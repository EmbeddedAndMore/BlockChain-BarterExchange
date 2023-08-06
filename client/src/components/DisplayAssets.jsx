import React, { useMemo, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import AssetCard from './AssetCard';
import { loader } from '../assets';
import { OfferContext } from "../App"
import { SelectableGroup, createSelectable } from 'react-selectable-fast'
import { useStateContext } from '../context'


const DisplayAssets = ({ title, isLoading, assets, from }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const { otherAsset, setOtherAsset, ownAsset, setOwnAsset } = useContext(OfferContext);



  var assets = assets.map((asset) => {
    return {
      asset: asset,
      disabled: false
    }
  })

  const handleNavigate = (asset) => {
    navigate(`/asset-details/${asset.title}`, { state: asset })
  }

  const handleSelection = (asset) => {
    if (from === "profile") {
      setOwnAsset(asset.asset)
    } else {
      setOtherAsset(asset.asset)
    }
    setSelected(asset)

  }

  useMemo(() => {
    assets.map((asset) => {
      if (selected === null)
        return;
      if (asset.asset !== selected.asset) {
        asset.disabled = true;
      } else {
        asset.disabled = false;
      }

    })
  }, [selected]);



  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({assets.length})</h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && assets.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any product or service yet
          </p>
        )}
        {!isLoading && assets.length > 0 &&
          assets.map((asset) =>
            <AssetCard
              key={uuidv4()}
              {...asset.asset}
              handleClick={() => handleNavigate(asset.asset)}
              handleSelect={() => handleSelection(asset)}
              disabled={asset.disabled}
            />)
        }

      </div>
    </div>
  )
}

export default DisplayAssets