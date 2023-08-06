import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Sidebar, Navbar, Footer } from './components';
import { AssetDetails, CreateAsset, Home, Profile, AllOffers } from './pages';
import { useStateContext } from './context'


export const OfferContext = React.createContext(null);

const App = () => {

  const [otherAsset, setOtherAsset] = useState(null);
  const [ownAsset, setOwnAsset] = useState(null);
  const { address, contract, fetchAssets } = useStateContext();
  useEffect(() => {
    if (typeof address === 'undefined') {
      setOwnAsset(null)
      setOtherAsset(null)
      console.log("set assets to null")
    }
    return () => { };
  }, [contract, address]);



  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>

      {/* <div className=""> */}
      <OfferContext.Provider value={{ otherAsset: otherAsset, setOtherAsset: setOtherAsset, ownAsset: ownAsset, setOwnAsset: setOwnAsset }}>
        <div className="flex-1 max-sm:w-full sm:mr-5">
          <Navbar />
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/offers" element={<AllOffers />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-asset" element={<CreateAsset />} />
              <Route path="/asset-details/:id" element={<AssetDetails />} />
            </Routes>
          </div>

          <div className="sticky top-[100vh]">
            <Footer />
          </div>

        </div>
      </OfferContext.Provider>

    </div>
  )
}

export default App