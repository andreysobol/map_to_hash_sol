# MapToHash

```
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
```

# Performing a calculation

```shell
npx hardhat run scripts/gastest.ts
```