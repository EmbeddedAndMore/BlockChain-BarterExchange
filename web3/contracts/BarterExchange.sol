// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract BarterExchange {
    address public owner;

    struct Asset {
        address owner;
        string name;
        string title;
        string description;
        string image;
        bool isAvailable;
        bool isInExchangeProcess;
    }

    struct ProposedExchange {
        address from;
        address to;
        uint256 offeredAsset; // ID of offered Asset
        uint256 requestedAsset; // ID of requested Asset
        string offeredAssetName;
        string requestedAssetName;
        bool isWithdrawn;
        bool isConfirmed;
    }

    mapping(uint256 => Asset) public assets;
    uint256 public numberOfAssets = 0;

    mapping(uint256 => ProposedExchange) public proposedExchanges;
    uint256 public numberOfProposedExchanges;

    function addAsset(
        address _owner,
        string memory _assetName,
        string memory _assetTitle,
        string memory _assetDesc,
        string memory _assetImage
    ) public returns (uint256) {
        Asset storage asset = assets[numberOfAssets];
        require(!asset.isAvailable, "Asset already exists");

        asset.owner = _owner;
        asset.name = _assetName;
        asset.title = _assetTitle;
        asset.description = _assetDesc;
        asset.image = _assetImage;
        asset.isAvailable = true;
        asset.isInExchangeProcess = false;

        numberOfAssets = numberOfAssets + 1;
        return numberOfAssets - 1;
    }

    function getAssets(address _owner) public view returns (Asset[] memory) {
        Asset[] memory allAssets = new Asset[](numberOfAssets);

        for (uint256 i = 0; i < numberOfAssets; i++) {
            allAssets[i] = assets[i];
        }

        return allAssets;
    }

    function deleteAsset(uint256 idOfAsset) public {
        Asset storage asset = assets[idOfAsset];
        require(asset.owner == msg.sender, "You are not owner of thos asset.");

        asset.isAvailable = false;
    }

    function proposeExchange(
        address to,
        uint256 offeredAsset,
        uint256 requestedAsset,
        string memory offeredAssetName,
        string memory requestedAssetName
    ) public returns (uint256) {
        require(
            assets[offeredAsset].isAvailable,
            "Offered asset does not exist"
        );
        require(
            assets[offeredAsset].owner == msg.sender,
            "You don't own the offered asset"
        );
        require(
            assets[requestedAsset].isAvailable,
            "Requested asset does not exist"
        );

        ProposedExchange storage pex = proposedExchanges[
            numberOfProposedExchanges
        ];
        pex.from = msg.sender;
        pex.to = to;
        pex.offeredAsset = offeredAsset;
        pex.requestedAsset = requestedAsset;
        pex.offeredAssetName = offeredAssetName;
        pex.requestedAssetName = requestedAssetName;
        pex.isWithdrawn = false; // true if it is withdrawn. Withdrawn exchanges will considered to be deleted
        pex.isConfirmed = false; // true if confirmed.

        // Assets will be not be availabe for request until when it is withdrawn.
        assets[offeredAsset].isInExchangeProcess = true;
        assets[requestedAsset].isInExchangeProcess = true;

        numberOfProposedExchanges = numberOfProposedExchanges + 1;
        return numberOfProposedExchanges - 1;
    }

    function withdrawExchange(uint256 idOfExchange) public {
        // Exchange will be widthdrawn.
        ProposedExchange storage pex = proposedExchanges[idOfExchange];
        pex.isWithdrawn = true;
        pex.isConfirmed = false;

        // Assets will be availables again.
        assets[pex.offeredAsset].isInExchangeProcess = false;
        assets[pex.requestedAsset].isInExchangeProcess = false;
    }

    function confirmExchange(uint256 idOfExchange) public {
        ProposedExchange storage pex = proposedExchanges[idOfExchange];
        pex.isWithdrawn = false;
        pex.isConfirmed = true;

        require(
            assets[pex.offeredAsset].isAvailable,
            "Offered asset does not exist"
        );
        require(
            assets[pex.offeredAsset].owner == pex.from,
            "Offered asset doesn't belong to the sender"
        );
        require(
            assets[pex.requestedAsset].isAvailable,
            "Requested asset does not exist"
        );
        require(
            assets[pex.requestedAsset].owner == msg.sender,
            "You don't own the requested asset"
        );
        require(
            pex.to == msg.sender,
            "Only the person who has been requested can for an exchange can confirm it."
        );

        // swap owners
        assets[pex.offeredAsset].owner = pex.to;
        assets[pex.requestedAsset].owner = pex.from;

        assets[pex.offeredAsset].isInExchangeProcess = false;
        assets[pex.requestedAsset].isInExchangeProcess = false;
    }

    function getOffers() public view returns (ProposedExchange[] memory) {
        // this function might get called from both sides of a deal.
        ProposedExchange[] memory exchanges = new ProposedExchange[](
            numberOfProposedExchanges
        );
        for (uint256 i = 0; i < numberOfProposedExchanges; i++) {
            exchanges[i] = proposedExchanges[i];
        }
        return exchanges;
    }
}
