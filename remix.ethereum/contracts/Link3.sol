//SPDX-License-Identifier: MIT

pragma solidity ^0.8.30;

contract Link3 {
    /* 
        @abstract struct Link
            * @param {string} url - Full link address, before compression
            * @param {address} owner - Owner of the URL(compressed or not)
            * @param {uint256} fee - Gas to be payed for the compression process
    */
    struct Link {
        string url;
        address owner;
        uint256 fee;
    }
    mapping(string => Link) private links;
    mapping(string => mapping(address => bool)) public hasAccess;
    /* 
        @abstract function addLink
            * @param {string} url - URL to be compressed
            * @param {uint256} fee - Gas to be payed for the compression process
    */
    function addLink(string calldata url, string calldata linkId, uint256 fee) public {
       Link memory link = links[linkId];
       require(
            link.owner == address(0) ||
            link.owner == msg.sender
        , "This linkId already has an owner");
       link.url = url;
       link.fee = fee;
       link.owner = msg.sender;
       links[linkId] = link;
       hasAccess[linkId][msg.sender] = true;
    }
    function getLink(string calldata linkId) public view returns (Link memory) {
        Link memory link = links[linkId];
        if(link.fee == 0) return link;
        if(hasAccess[linkId][msg.sender] == false)
            link.url = "";
        return link;
    }
}
