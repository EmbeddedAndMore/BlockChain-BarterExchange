import React, { useState, useEffect } from 'react'
import { zero_addr } from '../utils'

import { DisplayAssets } from '../page_components';
import { useStateContext } from '../context'

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [assetss, setAsset] = useState([]);

  const { address, contract, fetchAssets } = useStateContext();

  const fetchAllAssets = async () => {
    setIsLoading(true);
    const data = await fetchAssets(zero_addr());
    var my_assets = []
    data.map((asset) => {
      if (asset.owner === address)
        my_assets.push(asset)
    })
    setAsset(my_assets);
    setIsLoading(false);
  }


  useEffect(() => {
    if (contract) {
      fetchAllAssets();
    }
    return () => { };
  }, [address, contract]);


  return (
    <DisplayAssets
      title="My Services and Products"
      isLoading={isLoading}
      assets={assetss}
      from="profile"
    />
  );
}

export default Profile