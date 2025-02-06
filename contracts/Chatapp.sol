// SPDX-License-Provider:MIT
pragma solidity ^0.8.25;

contract ChatApp{
    struct User{
        string name;
        friend[] friends;
    }
    struct friend{
        address friendAddress;
        string name;
    }
    struct message{
        address sender;
        uint256 timestamp;
        string message;
    }
    mapping(address => User) users;
    mapping(bytes32 => message[]) messages;

    function CheckUserExists(address _address) public view returns(bool){
        if(bytes(users[_address].name).length == 0){
            return false;
        }
        return true;
    }

    function CreateaAccount(string calldata _name) public{
        require(CheckUserExists(msg.sender), "User already exists");
        require(bytes(_name).length > 0, "Username cannot be empty");
        users[msg.sender].name = _name;
    }

    function getUserName(address pubkey) external view returns(string memory){
        require(!CheckUserExists(msg.sender), "User doesn't exists");
        return users[pubkey].name;
    }

    function AddFriend(address _address, string calldata _name) public{
        require(!CheckUserExists(msg.sender), "Create an account first");
        require(!CheckUserExists(_address), "User not found");
        require(msg.sender != _address, "Cannot add yourself as a friend");
        require(CheckAlreadyFriends(_address, msg.sender), "Already friends");
        users[msg.sender].friends.push(friend(_address, _name));

        _addFriend(msg.sender, _address, _name);
        _addFriend( _address,msg.sender, _name);
    }

    function CheckAlreadyFriends(address _address, address _friend) public view returns(bool){
        for(uint i = 0; i < users[_address].friends.length; i++){
            if(users[_address].friends[i].friendAddress == _friend){
                return true;
            }
        }
        return false;
    }
    function _addFriend(address _address, address _friend, string calldata _name) private{
        users[_address].friends.push(friend(_friend, _name));
    }
}
