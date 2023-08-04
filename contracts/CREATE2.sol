// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract ToBeDeployed {
    string hello = "deployed via Create2";
}

contract Write {
    string writeOnMe;

    function wirteFun(string memory _write) external {
        writeOnMe = _write;
    }
}

contract Create2 {
    event Deployed(address contractAddres);
    address public CREATE2;
    address public CREATE;

    /// @notice this function calculates the address for deployment via CREATE2
    function getAddr(uint256 salt) public view returns (address) {
        bytes memory bytecode = type(ToBeDeployed).creationCode;

        return
            address(
                uint160(
                    uint256(
                        keccak256(
                            abi.encodePacked(
                                bytes1(0xFF),
                                address(this),
                                salt,
                                keccak256(bytecode)
                            )
                        )
                    )
                )
            );
    }
    /// @notice this function deploys via CREATE2
    function DeployViaCreate2(uint256 salt) public {
        ToBeDeployed to = new ToBeDeployed{salt: bytes32(salt)}();
        emit Deployed(address(to));
        CREATE2 = address(to);
    }
    
    /// @notice this function deploys via CREATE
    function DeployViaCreate() public {
        ToBeDeployed to = new ToBeDeployed();
        emit Deployed(address(to));
        CREATE = address(to);
    }

    /// @notice this function is to check if nonce increases after calling a write function
    function write(address _contract) external {
        Write(_contract).wirteFun("Called This Via contract");
    }
}
