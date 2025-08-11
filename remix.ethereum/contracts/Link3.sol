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
    uint256 public comission = 1;
    address public immutable admin;
    mapping(string => Link) private links;
    mapping(string => mapping(address => bool)) public hasAccess;
    //Executes constructor() body only on deploy action
    constructor() {
        admin = msg.sender;
    }
    /* 
        @abstract function addLink
            * @param {string} url - URL to be compressed
            * @param {uint256} fee - Gas to be payed for the compression process
    */
    function addLink(
        string calldata url,
        string calldata linkId,
        uint256 fee
    ) public {
        Link memory link = links[linkId];
        require(
            link.owner == address(0) || link.owner == msg.sender,
            "This linkId already has an owner"
        );
        require(fee == 0 || fee > comission, "Fee must be more than comission");
        link.url = url;
        link.fee = fee;
        link.owner = msg.sender;
        links[linkId] = link;
        hasAccess[linkId][msg.sender] = true;
    }

    function payLink(string calldata linkId) public payable {
        Link memory link = links[linkId];
        require(link.owner != address(0), "Link not found");
        require(
            hasAccess[linkId][msg.sender] == false,
            "You already have access"
        );
        require(msg.value >= link.fee, "Insufficient payment");
        hasAccess[linkId][msg.sender] = true;
        payable(link.owner).transfer(msg.value - comission);
    }

    function getLink(string calldata linkId) public view returns (Link memory) {
        Link memory link = links[linkId];
        if (link.fee == 0) return link;
        if (hasAccess[linkId][msg.sender] == false) link.url = "";
        return link;
    }
    function withdraw() public {
        require(msg.sender == admin, "Access denied");
        uint256 amount = address(this).balance;
        payable(admin).transfer(amount);
    }
}
