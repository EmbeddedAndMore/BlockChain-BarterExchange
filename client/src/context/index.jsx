import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0xbF2100F350e51934B9Da82651a2C8188b106C5E1');
  const { mutateAsync: addAsset } = useContractWrite(contract, 'addAsset');
  const { mutateAsync: deleteAsset } = useContractWrite(contract, 'deleteAsset');
  const { mutateAsync: getAssets } = useContractWrite(contract, 'getAssets');
  const { mutateAsync: confirmExchange } = useContractWrite(contract, 'confirmExchange');
  const { mutateAsync: proposeExchange } = useContractWrite(contract, 'proposeExchange');
  const { mutateAsync: withdrawExchange } = useContractWrite(contract, 'withdrawExchange');


  const address = useAddress();
  const connect = useMetamask();

  const publishAsset = async (form) => {
    try {
      const data = await addAsset({
        args: [
          address, // owner
          form.name, // title
          form.title, // description
          form.description,
          form.image
        ],
      });

      console.log("addAsset call success", data)
    } catch (error) {
      console.log("addAsset call failure", error)
    }
  }

  const removeAsset = async (aId) => {
    try {
      const data = await deleteAsset({
        args: [
          aId
        ],
      });

      console.log("deleteAsset call success", data)
    } catch (error) {
      console.log("deleteAsset call failure", error)
    }
  }

  const acceptExchange = async (eId) => {
    try {
      const data = await confirmExchange({
        args: [
          eId
        ],
      });

      console.log("Exchange accepted succesfully: ", data)
    } catch (error) {
      console.log("Exchange failed: ", error)
    }
  }

  const requestForExchange = async (to, offeredAssetId, requestedAssetId, offeredAssetName, requestedAssetName) => {
    try {
      const data = await proposeExchange({
        args: [
          to, offeredAssetId, requestedAssetId, offeredAssetName, requestedAssetName
        ],
      });

      console.log("proposeExchange call success", data)
    } catch (error) {
      console.log("proposeExchange call failure", error)
    }
  }

  const requestForWithdraw = async (eId) => {
    try {
      const data = await withdrawExchange({
        args: [
          eId
        ],
      });

      console.log("withdrawExchange call success", data)
    } catch (error) {
      console.log("withdrawExchange call failure", error)
    }
  }

  // Reads
  const fetchAssets = async (owner) => {
    try {
      const data = await getAssets({
        args: [
          owner
        ]
      });

      const data_with_id = data.map((asset, i) => ({
        id: i,
        ...asset
      })).filter(asset => asset.isInExchangeProcess === false && asset.isAvailable === true);
      console.log("Assets loaded succesfully.", data)
      return data_with_id;
    } catch (error) {
      console.log("Could not fetch assets", error)
    }
  }

  const getOffers = async () => {
    try {
      const offers = await contract.call('getOffers',);

      var filtered_offers = []
      for (var i = 0; i < offers.length; i++) {
        var offer = offers[i]
        if (offer.from === address || offer.to === address) {
          filtered_offers.push({
            from: offer.from,
            to: offer.to,
            offeredAsset: offer.offeredAsset,
            requestedAsset: offer.requestedAsset,
            offeredAssetName: offer.offeredAssetName,
            requestedAssetName: offer.requestedAssetName,
            isWithdrawn: offer.isWithdrawn,
            isConfirmed: offer.isConfirmed,
            id: i
          })
        }
      }

      console.log("Offers loaded succesfully.", filtered_offers)
      return filtered_offers;
    } catch (error) {
      console.log("Could not fetch offers", error)
    }
  }

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        addAsset: publishAsset,
        removeAsset,
        fetchAssets,
        requestForExchange,
        acceptExchange,
        requestForWithdraw,
        getOffers
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);