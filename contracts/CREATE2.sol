// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract ToBeDeployed {
    string hello = "hiii";
}

contract Create2 {
    function getAddr() public view returns (address) {
        bytes memory bytecode = type(ToBeDeployed).creationCode;
        uint256 salt = 10;

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

    function Deploy() public returns (address) {
        uint256 a = 10;
        ToBeDeployed to = new ToBeDeployed{salt: bytes32(a)}();
        return address(to);
    }
}
