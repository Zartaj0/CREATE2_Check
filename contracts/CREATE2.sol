// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract ToBeDeployed {
    string hello = "deployed via Create2";
}

contract Create2 {
    event Deployed(address contractAddres);
    address public ContractDeployedOn;

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

    function DeployViaCreate2(uint256 salt) public {
        ToBeDeployed to = new ToBeDeployed{salt: bytes32(salt)}();
        emit Deployed(address(to));
        ContractDeployedOn = address(to);
    }
}
