// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract MatToHash {

    mapping(uint256 => uint256) public values;
    bytes32 public result;

    function getHash(uint256 size) public returns (bytes32) {
        bytes memory tos = new bytes(32*size);

        for (uint256 i=0; i<size; i++) { 
            uint256 v = values[i];
            uint256 pointer = 32 + i*32;
            assembly {
                mstore(add(tos, pointer), v)
            }
        }
        result = sha256(tos);
        return result;
    }

    function set(uint256 key, uint256 value) public {
        values[key] = value;
    }

}