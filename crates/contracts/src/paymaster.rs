// Copyright 2023-2024 Light
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

use ethers::{
    contract::abigen,
    providers::{Http, Provider},
    types::Address,
};
use eyre::{Context, Result};
use std::convert::TryInto;

use crate::provider::get_provider;

abigen!(Lightaymaster, "abi/Lightaymaster.json",);

pub async fn get_paymaster(
    chain_id: u64,
    verifying_paymaster_address: Address,
) -> Result<Lightaymaster<Provider<Http>>> {
    // Get the provider.
    let provider = get_provider(chain_id).await?;

    // Get the contract.
    let contract = Lightaymaster::new(verifying_paymaster_address, provider.into());

    // Return the contract.
    Ok(contract)
}

/// Construct the paymaster and data.
pub fn decode_paymaster_and_data(msg: Vec<u8>) -> Result<(Address, u64, u64, Vec<u8>)> {
    // Get the verifying paymaster address.
    let verifying_paymaster_address = Address::from_slice(&msg[0..20]);

    // Get the valid until.
    let valid_until =
        u64::from_be_bytes(msg[44..52].try_into().wrap_err("Failed to convert valid_until data")?);
    // Get the valid after.
    let valid_after =
        u64::from_be_bytes(msg[76..84].try_into().wrap_err("Failed to convert valid_after data")?);
    // Get the signature.
    let signature = msg[84..].to_vec();

    Ok((verifying_paymaster_address, valid_until, valid_after, signature))
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::constants::LIGHT_PAYMASTER_ADDRESSES;
    use ethers::utils::hex;
    use eyre::Result;

    #[ignore]
    #[tokio::test]
    async fn test_get_paymaster() {
        let chain_id = 1;
        // Get the address
        let verifying_paymaster_address = LIGHT_PAYMASTER_ADDRESSES[0];

        let res = get_paymaster(chain_id, verifying_paymaster_address).await;
        assert!(res.is_ok());

        // If you want to test the details of the resulting contract:
        let contract = res.unwrap();
        assert_eq!(contract.address(), verifying_paymaster_address);
    }

    #[test]
    fn test_decode_paymaster_and_data() -> Result<()> {
        // Get the expected msg.
        let expected_msg: Vec<u8> = hex::decode("0dcd1bf9a1b36ce34237eeafef220931846bcd8200000000000000000000000000000000000000000000000000000000deadbeef0000000000000000000000000000000000000000000000000000000000001234dd74227f0b9c29afe4ffa17a1d0076230f764cf3cb318a4e670a47e9cd97e6b75ee38c587228a59bb37773a89066a965cc210c49891a662af5f14e9e5e74d6a51c").unwrap();

        // Decode the paymaster and data.
        let (verifying_paymaster_address, valid_until, valid_after, signature) =
            decode_paymaster_and_data(expected_msg)?;

        // Expected result.
        let expected_verifying_paymaster_address =
            "0x0DCd1Bf9A1b36cE34237eEaFef220931846BCD82".parse().unwrap();
        let expected_valid_until = u64::from_str_radix("00000000deadbeef", 16).unwrap();
        let expected_valid_after = u64::from_str_radix("0000000000001234", 16).unwrap();
        let expected_signature: Vec<u8> = hex::decode("dd74227f0b9c29afe4ffa17a1d0076230f764cf3cb318a4e670a47e9cd97e6b75ee38c587228a59bb37773a89066a965cc210c49891a662af5f14e9e5e74d6a51c").unwrap();

        // Assert that the result matches the expected value
        assert_eq!(verifying_paymaster_address, expected_verifying_paymaster_address);
        assert_eq!(valid_until, expected_valid_until);
        assert_eq!(valid_after, expected_valid_after);
        assert_eq!(signature, expected_signature);

        Ok(())
    }

    // #1
    // https://polygonscan.com/tx/0x3e0b0fbe2036274e96157534a3ab82327113f11881a9a3d34c5dbabc5034d25b
    // Calldata:
    // 0x6df0e4a8000000000000000000000000000000000000000000000000000000000301bf3100000000000000000000000000000000000000000000000000000000000000600000000000000000000000005ff137d4b0fdcd49dca30c7cf57e578a026d278900000000000000000000000000000000000000000000000000000000000004a41fad948c00000000000000000000000000000000000000000000000000000000000000400000000000000000000000002978231d983d32c5ea3e97021e6a7d636ef42bef00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000e9586d5bb60179b9b364c19ce17b995cbe51ce520000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000001e0000000000000000000000000000000000000000000000000000000000044e1c000000000000000000000000000000000000000000000000000000000001c4b4000000000000000000000000000000000000000000000000000000000001c4b400000000000000000000000000000000000000000000000000000000d320b3b350000000000000000000000000000000000000000000000000000000b323dbb3100000000000000000000000000000000000000000000000000000000000002a0000000000000000000000000000000000000000000000000000000000000036000000000000000000000000000000000000000000000000000000000000000580000000000756d3e6464f5efe7e413a0af1c7474183815c882d5d90f13ae7d2866bf58606eb960783bc6d181f0f729f74fae246ea1cf89c00000000000000000000000000000000000000000000000000000018c0fab8bb800000000000000000000000000000000000000000000000000000000000000000000000000000084b61d27f60000000000000000000000004fd9d0ee6d6564e80a9ee00c0163fc952d0a45ed0000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000095000000000003193facb32d1c120719892b7ae977000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000656459c5a8db79acb7d63838be51e9fef633a7bb5cb024c5b00120f3288869d0e052e5395eba458e03a3107e25bab992a1154bf19cb6ca75be8fdcd48845840c2ece416f1b0000000000000000000000000000000000000000000000000000000000000000000000000000000000008d010001000000000001edca1cded6709adedc20cd162fcec52ec826533023457a8b24750fcc320b2a2b68a12ea777093e3066e1f8733d23dce9db6658f8987fb4a47eba45f0a7af5e101c0201012af8ddab77a7c90a38cf26f29763365d0028cfef0101b06a8f16d740df4fcd026b9afad0158b326ac62b0101285f0e30c55d61a3463b85ad189f934d5f48fbdd0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
    // PaymasterAndData:
    // 0x000000000003193facb32d1c120719892b7ae977000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000656459c5a8db79acb7d63838be51e9fef633a7bb5cb024c5b00120f3288869d0e052e5395eba458e03a3107e25bab992a1154bf19cb6ca75be8fdcd48845840c2ece416f1b

    // #2
    // https://polygonscan.com/tx/0x261f6a7712ca549d53c163b62537d8c147ac98b0d955409f15d0f54a983e7951
    // Calldata:
    // 0x6df0e4a8000000000000000000000000000000000000000000000000000000000301b01300000000000000000000000000000000000000000000000000000000000000600000000000000000000000005ff137d4b0fdcd49dca30c7cf57e578a026d278900000000000000000000000000000000000000000000000000000000000004841fad948c00000000000000000000000000000000000000000000000000000000000000400000000000000000000000002978231d983d32c5ea3e97021e6a7d636ef42bef00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000fbd80fe5ce1ece895845fd131bd621e2b6a1345f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000001e0000000000000000000000000000000000000000000000000000000000044e1c000000000000000000000000000000000000000000000000000000000001c4b4000000000000000000000000000000000000000000000000000000000001c4b400000000000000000000000000000000000000000000000000000000d320b3b350000000000000000000000000000000000000000000000000000000b323dbb3100000000000000000000000000000000000000000000000000000000000002a0000000000000000000000000000000000000000000000000000000000000036000000000000000000000000000000000000000000000000000000000000000580000000000756d3e6464f5efe7e413a0af1c7474183815c806eedcf823b5a64f8528accf0d78edb31b7715f351e4c9b6d8b3ac69a16e094e0000000000000000000000000000000000000000000000000000018bac7d2d7700000000000000000000000000000000000000000000000000000000000000000000000000000084b61d27f60000000000000000000000004fd9d0ee6d6564e80a9ee00c0163fc952d0a45ed0000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000095000000000003193facb32d1c120719892b7ae97700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000065643124173269fd5124338fe57905c8e9402a934232072eedc3420d5973db004087c40323361543d1ace025caea2b7904d343e6927856318f19fac43ca66a4ef935216a1c00000000000000000000000000000000000000000000000000000000000000000000000000000000000061010001000000000001560d53016ad5d7ee5afd8545206fcfdf2279dce6369e445db6c4c282e6daac676137f6f1d1d02d1fed93a72d2daefaac5dbb517aabb30cfb8687f8c5bcce51ad1b0201017f4c8bd0acc303599a1ae92414b055514ffb6f810000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
    // 0x000000000003193facb32d1c120719892b7ae97700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000065643124173269fd5124338fe57905c8e9402a934232072eedc3420d5973db004087c40323361543d1ace025caea2b7904d343e6927856318f19fac43ca66a4ef935216a1c

    #[test]
    fn test_decode_paymaster_and_data_raw() -> Result<()> {
        // Get the expected msg.
        let number_one_msg: Vec<u8> = hex::decode("0x000000000003193facb32d1c120719892b7ae977000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000656459c5a8db79acb7d63838be51e9fef633a7bb5cb024c5b00120f3288869d0e052e5395eba458e03a3107e25bab992a1154bf19cb6ca75be8fdcd48845840c2ece416f1b").unwrap();

        // Decode the paymaster and data.
        let (_verifying_paymaster_address, valid_until, valid_after, _signature) =
            decode_paymaster_and_data(number_one_msg)?;

        // Log the result.
        println!("#1");
        println!("valid_until: {:?}", valid_until);
        println!("valid_after: {:?}", valid_after);

        // Get the expected msg.
        let number_two_msg: Vec<u8> = hex::decode("0x000000000003193facb32d1c120719892b7ae97700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000065643124173269fd5124338fe57905c8e9402a934232072eedc3420d5973db004087c40323361543d1ace025caea2b7904d343e6927856318f19fac43ca66a4ef935216a1c").unwrap();

        // Decode the paymaster and data.
        let (_verifying_paymaster_address, valid_until, valid_after, _signature) =
            decode_paymaster_and_data(number_two_msg)?;

        // Log the result.
        println!("#2");
        println!("valid_until: {:?}", valid_until);
        println!("valid_after: {:?}", valid_after);

        Ok(())
    }
}
