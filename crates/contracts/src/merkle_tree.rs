// Copyright 2023-2024 LightDotSo.
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

// Copyright 2023-2024 Pia Park.
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

#![allow(clippy::unwrap_used)]

// From: https://github.com/rkdud007/alloy-merkle-tree/blob/de47ec9e67ce62d6bb8981051f94f2d8296f51da/src/tree.rs
// License: Apache-2.0
// Thank you to `rkdud007` for the original implementation!

use alloy::primitives::{Keccak256, B256};

#[derive(Debug)]
pub struct MerkleProof {
    pub leaf: B256,
    pub siblings: Vec<B256>,
    pub path_indices: Vec<usize>,
    pub root: B256,
}

#[derive(Debug)]
pub struct MerkleTree {
    leaves: Vec<B256>,
    is_tree_ready: bool,
    layers: Vec<Vec<B256>>,
    depth: u64,
    pub root: B256,
}

impl Default for MerkleTree {
    fn default() -> Self {
        Self::new()
    }
}

impl MerkleTree {
    pub fn new() -> Self {
        MerkleTree {
            leaves: Vec::new(),
            is_tree_ready: false,
            layers: Vec::new(),
            depth: 0,
            root: B256::default(),
        }
    }

    pub fn insert(&mut self, leaf: B256) {
        self.leaves.push(leaf);
    }

    // Hash two leaves together
    // From: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/c01a0fa27fb2d1546958be5d2cbbdd3fb565e4fa/contracts/utils/cryptography/Hashes.sol#L10-L13
    // License: MIT
    // Hash two leaves together, if the left is greater than the right, swap them
    fn hash(left: &B256, right: &B256) -> B256 {
        let mut hasher = Keccak256::new();

        let combined = if left <= right { left } else { right };
        let second = if left <= right { right } else { left };

        hasher.update(combined);
        hasher.update(second);

        let result = hasher.finalize();
        B256::from(result)
    }

    pub fn finish(&mut self) {
        if self.is_tree_ready {
            return;
        }

        self.depth = 0;
        let mut current_layer = self.leaves.clone();

        while current_layer.len() > 1 {
            let mut new_layer = Vec::new();
            for chunk in current_layer.chunks(2) {
                if chunk.len() == 2 {
                    new_layer.push(Self::hash(&chunk[0], &chunk[1]));
                } else {
                    new_layer.push(chunk[0]);
                }
            }
            self.layers.push(current_layer);
            current_layer = new_layer;
            self.depth += 1;
        }

        self.layers.push(current_layer.clone());
        self.root = current_layer[0];
        self.is_tree_ready = true;
    }

    pub fn create_proof(&self, leaf: &B256) -> Option<MerkleProof> {
        let mut index = match self.leaves.iter().position(|x| x == leaf) {
            Some(index) => index,
            None => return None,
        };

        let mut proof = MerkleProof {
            leaf: *leaf,
            siblings: Vec::new(),
            path_indices: Vec::new(),
            root: self.root,
        };

        for layer in &self.layers {
            if index % 2 == 0 {
                if index + 1 < layer.len() {
                    proof.siblings.push(layer[index + 1]);
                    proof.path_indices.push(1);
                }
            } else {
                proof.siblings.push(layer[index - 1]);
                proof.path_indices.push(0);
            }
            index /= 2;
        }

        Some(proof)
    }

    pub fn verify_proof(proof: &MerkleProof) -> bool {
        let mut hash = proof.leaf;
        for (i, sibling) in proof.siblings.iter().enumerate() {
            hash = if proof.path_indices[i] == 0 {
                Self::hash(sibling, &hash)
            } else {
                Self::hash(&hash, sibling)
            };
        }
        hash == proof.root
    }
}

#[cfg(test)]
mod test {
    use std::str::FromStr;

    use super::*;
    use alloy::primitives::{hex::FromHex, U256};

    #[test]
    fn test_tree() {
        let mut tree = MerkleTree::new();

        // Should be 2 ^ N leaves
        let num_leaves = 16;
        for i in 0..num_leaves {
            tree.insert(B256::from(U256::from(i)));
        }
        tree.finish();

        for i in 0..num_leaves {
            let proof = tree.create_proof(&B256::from(U256::from(i))).unwrap();
            assert!(MerkleTree::verify_proof(&proof));
        }
    }

    #[test]
    fn test_tree_odd_leaves() {
        let mut tree = MerkleTree::new();

        let num_leaves = 100;
        for i in 0..num_leaves {
            tree.insert(B256::from(U256::from(i)));
        }
        tree.finish();

        for i in 0..num_leaves {
            let proof = tree.create_proof(&B256::from(U256::from(i))).unwrap();
            assert!(MerkleTree::verify_proof(&proof));
        }
    }

    #[test]
    fn test_tree_bytes32_type() {
        let mut leaves = Vec::new();

        let leaf =
            B256::from_str("0x46296bc9cb11408bfa46c5c31a542f12242db2412ee2217b4e8add2bc1927d0b")
                .unwrap();

        leaves.push(leaf);

        let mut tree = MerkleTree::new();

        tree.insert(leaf);
        tree.finish();

        let proof = tree.create_proof(&leaf).unwrap();
        assert!(MerkleTree::verify_proof(&proof));

        assert_eq!(
            tree.root,
            B256::from_hex("0x46296bc9cb11408bfa46c5c31a542f12242db2412ee2217b4e8add2bc1927d0b")
                .unwrap()
        );
    }

    #[test]
    fn test_one_tree() {
        let hashes =
            ["0x0000000000000000000000000000000000000000000000000000000000000001".to_string()];

        let leaf_hashes: Vec<B256> =
            hashes.iter().map(|hash| B256::from_str(hash).unwrap()).collect();

        let mut tree = MerkleTree::new();

        for leaf in leaf_hashes {
            tree.insert(leaf);
        }
        tree.finish();

        let root = tree.root;
        assert_eq!(
            root,
            B256::from_hex("0x0000000000000000000000000000000000000000000000000000000000000001")
                .unwrap()
        );
    }

    #[test]
    fn test_simple_tree() {
        let hashes = [
            "0x0000000000000000000000000000000000000000000000000000000000000001".to_string(),
            "0x0000000000000000000000000000000000000000000000000000000000000002".to_string(),
        ];

        let leaf_hashes: Vec<B256> =
            hashes.iter().map(|hash| B256::from_str(hash).unwrap()).collect();

        let mut tree = MerkleTree::new();

        for leaf in leaf_hashes {
            tree.insert(leaf);
        }
        tree.finish();

        let root = tree.root;
        assert_eq!(
            root,
            B256::from_hex("0xe90b7bceb6e7df5418fb78d8ee546e97c83a08bbccc01a0644d599ccd2a7c2e0")
                .unwrap()
        );
    }

    #[test]
    fn test_simple_nested_tree() {
        let hashes = [
            "0x0000000000000000000000000000000000000000000000000000000000000001".to_string(),
            "0x0000000000000000000000000000000000000000000000000000000000000002".to_string(),
            "0x0000000000000000000000000000000000000000000000000000000000000003".to_string(),
            // "0x0000000000000000000000000000000000000000000000000000000000000000".to_string(),
        ];

        let leaf_hashes: Vec<B256> =
            hashes.iter().map(|hash| B256::from_str(hash).unwrap()).collect();

        let mut tree = MerkleTree::new();

        for leaf in leaf_hashes {
            tree.insert(leaf);
        }
        tree.finish();

        let root = tree.root;
        assert_eq!(
            root,
            B256::from_hex("0x9b0225f2c6f59eeaf8302811ea290e95258763189b82dc033158e99a6ef45a87")
                .unwrap()
        );
    }

    #[test]
    fn test_simple_deep_nested_tree() {
        let hashes = [
            "0x0000000000000000000000000000000000000000000000000000000000000001".to_string(),
            "0x0000000000000000000000000000000000000000000000000000000000000002".to_string(),
            "0x0000000000000000000000000000000000000000000000000000000000000003".to_string(),
            "0x0000000000000000000000000000000000000000000000000000000000000004".to_string(),
            "0x0000000000000000000000000000000000000000000000000000000000000005".to_string(),
            "0x0000000000000000000000000000000000000000000000000000000000000006".to_string(),
            "0x0000000000000000000000000000000000000000000000000000000000000007".to_string(),
            "0x0000000000000000000000000000000000000000000000000000000000000008".to_string(),
            "0x0000000000000000000000000000000000000000000000000000000000000009".to_string(),
            "0x0000000000000000000000000000000000000000000000000000000000000010".to_string(),
            "0x0000000000000000000000000000000000000000000000000000000000000011".to_string(),
            "0x0000000000000000000000000000000000000000000000000000000000000012".to_string(),
            "0x0000000000000000000000000000000000000000000000000000000000000013".to_string(),
            "0x0000000000000000000000000000000000000000000000000000000000000014".to_string(),
            "0x0000000000000000000000000000000000000000000000000000000000000015".to_string(),
            "0x0000000000000000000000000000000000000000000000000000000000000016".to_string(),
            "0x0000000000000000000000000000000000000000000000000000000000000017".to_string(),
            "0x0000000000000000000000000000000000000000000000000000000000000018".to_string(),
            "0x0000000000000000000000000000000000000000000000000000000000000019".to_string(),
            "0x0000000000000000000000000000000000000000000000000000000000000020".to_string(),
            "0x0000000000000000000000000000000000000000000000000000000000000021".to_string(),
            "0x0000000000000000000000000000000000000000000000000000000000000022".to_string(),
            "0x0000000000000000000000000000000000000000000000000000000000000023".to_string(),
            "0x0000000000000000000000000000000000000000000000000000000000000024".to_string(),
        ];

        let leaf_hashes: Vec<B256> =
            hashes.iter().map(|hash| B256::from_str(hash).unwrap()).collect();

        let mut tree = MerkleTree::new();

        for leaf in leaf_hashes {
            tree.insert(leaf);
        }
        tree.finish();

        let root = tree.root;
        assert_eq!(
            root,
            B256::from_hex("0x829aa29a4940648ff39373741e8cf185ad9cff8af1529623eacce5b528406827")
                .unwrap()
        );
    }
}
