import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0xa75278272d68951D4C8cBFaBD4fCC6B046b3e459');
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

      console.log("confirmExchange call success", data)
    } catch (error) {
      console.log("confirmExchange call failure", error)
    }
  }

  const requestForExchange = async (to, offeredAssetId, requestedAssetId) => {
    try {
      const data = await proposeExchange({
        args: [
          to, offeredAssetId, requestedAssetId
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
      console.log("Assets loaded succesfully.", data)
      return data;
    } catch (error) {
      console.log("Could not fetch assets", error)
    }
  }

  const getOffers = async () => {
    const offers = await contract.call('getOffers');

    const parsedOffers = offers.map((offer, i) => ({
      from: offer.from,
      to: offer.to,
      offeredAsset: offer.offeredAsset,
      requestedAsset: offer.requestedAsset,
      isWithdrawn: offer.isWithdrawn,
      isConfirmed: offer.isConfirmed,
      eId: i
    }));
    return parsedOffers;
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