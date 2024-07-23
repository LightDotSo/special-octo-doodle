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

// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.18;

import {EntryPoint} from "@/contracts/core/EntryPoint.sol";
import {LightWalletFactory} from "@/contracts/LightWalletFactory.sol";
import {BaseLightDeployer} from "@/script/base/BaseLightDeployer.s.sol";
// solhint-disable-next-line no-console
import {console} from "forge-std/console.sol";
import {Script} from "forge-std/Script.sol";

// LightWalletFactoryDeployer -- Deploys the LightWalletFactory contract
contract LightWalletFactoryDeployer is BaseLightDeployer, Script {
    // -------------------------------------------------------------------------
    // Bytecode
    // -------------------------------------------------------------------------

    // bytes private byteCode = type(LightWalletFactory).creationCode;
    bytes private byteCode =
        hex"a2850b49daa90b2a103159bd000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000041ae60a060405234801561001057600080fd5b5060405161418e38038061418e83398101604081905261002f916100af565b6001600160a01b038116610056576040516370063fa360e01b815260040160405180910390fd5b80604051610063906100a2565b6001600160a01b039091168152602001604051809103906000f08015801561008f573d6000803e3d6000fd5b506001600160a01b0316608052506100df565b6133cd80610dc183390190565b6000602082840312156100c157600080fd5b81516001600160a01b03811681146100d857600080fd5b9392505050565b608051610cba610107600039600081816071015281816101a001526102db0152610cba6000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c8063a3f4df7e11610050578063a3f4df7e146100d0578063d3a3968614610119578063ffa1ad741461012c57600080fd5b806311464fbe1461006c578063183815c8146100bd575b600080fd5b6100937f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b6100936100cb366004610420565b610168565b61010c6040518060400160405280601281526020017f4c6967687457616c6c6574466163746f7279000000000000000000000000000081525081565b6040516100b491906104b0565b610093610127366004610420565b610289565b61010c6040518060400160405280600581526020017f302e312e3000000000000000000000000000000000000000000000000000000081525081565b6000806101758484610289565b905073ffffffffffffffffffffffffffffffffffffffff81163b801561019d57509050610283565b837f0000000000000000000000000000000000000000000000000000000000000000866040516024016101d291815260200190565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f9498bd71000000000000000000000000000000000000000000000000000000001790525161025290610413565b61025d9291906104c3565b8190604051809103906000f590508015801561027d573d6000803e3d6000fd5b50925050505b92915050565b60006103da826040518060200161029f90610413565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe082820381018352601f909101166040819052602481018790527f000000000000000000000000000000000000000000000000000000000000000090604401604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403018152918152602080830180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f9498bd71000000000000000000000000000000000000000000000000000000001790529051610383939291016104c3565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403018152908290526103bf92916020016104fa565b604051602081830303815290604052805190602001206103e1565b9392505050565b60006103da8383306000604051836040820152846020820152828152600b8101905060ff815360559020949350505050565b6107848061052a83390190565b6000806040838503121561043357600080fd5b50508035926020909101359150565b60005b8381101561045d578181015183820152602001610445565b50506000910152565b6000815180845261047e816020860160208601610442565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b6020815260006103da6020830184610466565b73ffffffffffffffffffffffffffffffffffffffff831681526040602082015260006104f26040830184610466565b949350505050565b6000835161050c818460208801610442565b835190830190610520818360208801610442565b0194935050505056fe608060405260405161078438038061078483398101604081905261002291610319565b61002e82826000610035565b5050610436565b61003e8361006b565b60008251118061004b5750805b156100665761006483836100ab60201b6100291760201c565b505b505050565b610074816100d7565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606100d0838360405180606001604052806027815260200161075d602791396101a9565b9392505050565b6100ea8161022260201b6100551760201c565b6101515760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b60648201526084015b60405180910390fd5b806101887f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b61023160201b6100711760201c565b80546001600160a01b0319166001600160a01b039290921691909117905550565b6060600080856001600160a01b0316856040516101c691906103e7565b600060405180830381855af49150503d8060008114610201576040519150601f19603f3d011682016040523d82523d6000602084013e610206565b606091505b50909250905061021886838387610234565b9695505050505050565b6001600160a01b03163b151590565b90565b606083156102a357825160000361029c576001600160a01b0385163b61029c5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610148565b50816102ad565b6102ad83836102b5565b949350505050565b8151156102c55781518083602001fd5b8060405162461bcd60e51b81526004016101489190610403565b634e487b7160e01b600052604160045260246000fd5b60005b838110156103105781810151838201526020016102f8565b50506000910152565b6000806040838503121561032c57600080fd5b82516001600160a01b038116811461034357600080fd5b60208401519092506001600160401b038082111561036057600080fd5b818501915085601f83011261037457600080fd5b815181811115610386576103866102df565b604051601f8201601f19908116603f011681019083821181831017156103ae576103ae6102df565b816040528281528860208487010111156103c757600080fd5b6103d88360208301602088016102f5565b80955050505050509250929050565b600082516103f98184602087016102f5565b9190910192915050565b60208152600082518060208401526104228160408501602087016102f5565b601f01601f19169190910160400192915050565b610318806104456000396000f3fe60806040523661001357610011610017565b005b6100115b610027610022610074565b6100b9565b565b606061004e83836040518060600160405280602781526020016102e5602791396100dd565b9392505050565b73ffffffffffffffffffffffffffffffffffffffff163b151590565b90565b60006100b47f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b3660008037600080366000845af43d6000803e8080156100d8573d6000f35b3d6000fd5b60606000808573ffffffffffffffffffffffffffffffffffffffff16856040516101079190610277565b600060405180830381855af49150503d8060008114610142576040519150601f19603f3d011682016040523d82523d6000602084013e610147565b606091505b509150915061015886838387610162565b9695505050505050565b606083156101fd5782516000036101f65773ffffffffffffffffffffffffffffffffffffffff85163b6101f6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064015b60405180910390fd5b5081610207565b610207838361020f565b949350505050565b81511561021f5781518083602001fd5b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101ed9190610293565b60005b8381101561026e578181015183820152602001610256565b50506000910152565b60008251610289818460208701610253565b9190910192915050565b60208152600082518060208401526102b2816040850160208701610253565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016919091016040019291505056fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a164736f6c6343000812000a416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a164736f6c6343000812000a60c0604052306080523480156200001557600080fd5b50604051620033cd380380620033cd833981016040819052620000389162000117565b6001600160a01b03811660a0526200004f62000056565b5062000149565b600054610100900460ff1615620000c35760405162461bcd60e51b815260206004820152602760248201527f496e697469616c697a61626c653a20636f6e747261637420697320696e697469604482015266616c697a696e6760c81b606482015260840160405180910390fd5b60005460ff9081161462000115576000805460ff191660ff9081179091556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b565b6000602082840312156200012a57600080fd5b81516001600160a01b03811681146200014257600080fd5b9392505050565b60805160a05161322d620001a06000396000818161047a015281816111250152818161163b0152611aff0152600081816106a60152818161075601528181610a7d01528181610b2d0152610ca5015261322d6000f3fe6080604052600436106101785760003560e01c806352d1902d116100cb578063b0d691fe1161007f578063d087d28811610059578063d087d2881461050c578063f23a6e6114610521578063ffa1ad741461056757600080fd5b8063b0d691fe14610453578063b61d27f6146104a4578063bc197c81146104c457600080fd5b8063853c5068116100b0578063853c5068146103955780639498bd71146103dd578063a3f4df7e146103fd57600080fd5b806352d1902d1461034c57806357c56d6b1461036157600080fd5b8063295614261161012d57806347e1da2a1161010757806347e1da2a146103045780634f1ef2861461032457806351605d801461033757600080fd5b806329561426146102965780633659cfe6146102b65780633a871cdd146102d657600080fd5b8063150b7a021161015e578063150b7a02146101e05780631626ba7e1461025657806320c13b0b1461027657600080fd5b806223de291461018457806301ffc9a7146101ab57600080fd5b3661017f57005b600080fd5b34801561019057600080fd5b506101a961019f3660046128a2565b5050505050505050565b005b3480156101b757600080fd5b506101cb6101c636600461297b565b6105b0565b60405190151581526020015b60405180910390f35b3480156101ec57600080fd5b506102256101fb366004612998565b7f150b7a020000000000000000000000000000000000000000000000000000000095945050505050565b6040517fffffffff0000000000000000000000000000000000000000000000000000000090911681526020016101d7565b34801561026257600080fd5b50610225610271366004612a07565b6105c1565b34801561028257600080fd5b50610225610291366004612a53565b6105d8565b3480156102a257600080fd5b506101a96102b1366004612abf565b61063d565b3480156102c257600080fd5b506101a96102d1366004612ad8565b61068f565b3480156102e257600080fd5b506102f66102f1366004612af3565b610891565b6040519081526020016101d7565b34801561031057600080fd5b506101a961031f366004612b8c565b6108b0565b6101a9610332366004612c55565b610a66565b34801561034357600080fd5b506102f6610c5c565b34801561035857600080fd5b506102f6610c8b565b34801561036d57600080fd5b506102f67f8713a7c4465f6fbee2b6e9d6646d1d9f83fec929edfc4baf661f3c865bdd04d181565b3480156103a157600080fd5b506103b56103b0366004612a07565b610d77565b604080519586526020860194909452928401919091526060830152608082015260a0016101d7565b3480156103e957600080fd5b506101a96103f8366004612abf565b610f3f565b34801561040957600080fd5b506104466040518060400160405280600b81526020017f4c6967687457616c6c657400000000000000000000000000000000000000000081525081565b6040516101d79190612d59565b34801561045f57600080fd5b5060405173ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001681526020016101d7565b3480156104b057600080fd5b506101a96104bf366004612daa565b6110d2565b3480156104d057600080fd5b506102256104df366004612df8565b7fbc197c810000000000000000000000000000000000000000000000000000000098975050505050505050565b34801561051857600080fd5b506102f6611121565b34801561052d57600080fd5b5061022561053c366004612e92565b7ff23a6e61000000000000000000000000000000000000000000000000000000009695505050505050565b34801561057357600080fd5b506104466040518060400160405280600581526020017f302e302e3000000000000000000000000000000000000000000000000000000081525081565b60006105bb826111db565b92915050565b60006105ce8484846112bf565b90505b9392505050565b6000806105fd86866040516105ee929190612ef8565b6040518091039020858561130a565b509050801561062f57507f20c13b0b000000000000000000000000000000000000000000000000000000009050610635565b50600090505b949350505050565b333014610683576040517fe12588940000000000000000000000000000000000000000000000000000000081523360048201523060248201526044015b60405180910390fd5b61068c81611348565b50565b73ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000163003610754576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201527f64656c656761746563616c6c0000000000000000000000000000000000000000606482015260840161067a565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166107c97f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5473ffffffffffffffffffffffffffffffffffffffff1690565b73ffffffffffffffffffffffffffffffffffffffff161461086c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201527f6163746976652070726f78790000000000000000000000000000000000000000606482015260840161067a565b610875816113de565b6040805160008082526020820190925261068c9183919061141f565b600061089b611623565b6108a584846116c4565b90506105d1826116fa565b6108b8611623565b84811480156108ce57508215806108ce57508281145b610934576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f77726f6e67206172726179206c656e6774687300000000000000000000000000604482015260640161067a565b60008390036109ea5760005b858110156109e4576109d287878381811061095d5761095d612f08565b90506020020160208101906109729190612ad8565b600085858581811061098657610986612f08565b90506020028101906109989190612f37565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061177192505050565b806109dc81612fcb565b915050610940565b50610a5e565b60005b85811015610a5c57610a4a878783818110610a0a57610a0a612f08565b9050602002016020810190610a1f9190612ad8565b868684818110610a3157610a31612f08565b9050602002013585858581811061098657610986612f08565b80610a5481612fcb565b9150506109ed565b505b505050505050565b73ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000163003610b2b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201527f64656c656761746563616c6c0000000000000000000000000000000000000000606482015260840161067a565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16610ba07f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5473ffffffffffffffffffffffffffffffffffffffff1690565b73ffffffffffffffffffffffffffffffffffffffff1614610c43576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201527f6163746976652070726f78790000000000000000000000000000000000000000606482015260840161067a565b610c4c826113de565b610c588282600161141f565b5050565b6000610c867fea7157fa25e3aa17d0ae2d5280fa4e24d421c61842aa85e45194e1145aa72bf85490565b905090565b60003073ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001614610d52576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c0000000000000000606482015260840161067a565b507f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc90565b60008060008060008087876000818110610d9357610d93612f08565b909101357fff00000000000000000000000000000000000000000000000000000000000000169150819050610de957610dcb896117ee565b9250610dd8838989611873565b92985090965094509150610f349050565b7fff0000000000000000000000000000000000000000000000000000000000000081811601610e2857610e1b896117ee565b9250610dd88389896118c4565b7ffe000000000000000000000000000000000000000000000000000000000000007fff00000000000000000000000000000000000000000000000000000000000000821601610e7a57610e1b896118f0565b7ffd000000000000000000000000000000000000000000000000000000000000007fff00000000000000000000000000000000000000000000000000000000000000821601610ede57610ece89898961195d565b9550955095509550955050610f34565b6040517f6085cd820000000000000000000000000000000000000000000000000000000081527fff000000000000000000000000000000000000000000000000000000000000008216600482015260240161067a565b939792965093509350565b600054610100900460ff1615808015610f5f5750600054600160ff909116105b80610f795750303b158015610f79575060005460ff166001145b611005576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a6564000000000000000000000000000000000000606482015260840161067a565b600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001179055801561106357600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff166101001790555b61106c82611ada565b8015610c5857600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050565b6110da611623565b61111b848484848080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061177192505050565b50505050565b60007f00000000000000000000000000000000000000000000000000000000000000006040517f35567e1a0000000000000000000000000000000000000000000000000000000081523060048201526000602482015273ffffffffffffffffffffffffffffffffffffffff91909116906335567e1a90604401602060405180830381865afa1580156111b7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c869190613003565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f150b7a0200000000000000000000000000000000000000000000000000000000148061126e57507fffffffff0000000000000000000000000000000000000000000000000000000082167f4e2312e000000000000000000000000000000000000000000000000000000000145b806105bb57507fffffffff0000000000000000000000000000000000000000000000000000000082167f01ffc9a7000000000000000000000000000000000000000000000000000000001492915050565b6000806112cd85858561130a565b50905080156112ff57507f1626ba7e0000000000000000000000000000000000000000000000000000000090506105d1565b506000949350505050565b600080600080600061131d888888610d77565b5096509194509250905082821080159061133b575061133b81611b49565b9450505050935093915050565b8061137f576040517f4294d12700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6113a87fea7157fa25e3aa17d0ae2d5280fa4e24d421c61842aa85e45194e1145aa72bf8829055565b6040518181527f307ed6bd941ee9fc80f369c94af5fa11e25bab5102a6140191756c5474a30bfa9060200160405180910390a150565b33301461068c576040517fe125889400000000000000000000000000000000000000000000000000000000815233600482015230602482015260440161067a565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff16156114575761145283611b7c565b505050565b8273ffffffffffffffffffffffffffffffffffffffff166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa9250505080156114dc575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682019092526114d991810190613003565b60015b611568576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201527f6f6e206973206e6f742055555053000000000000000000000000000000000000606482015260840161067a565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc8114611617576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f7860448201527f6961626c65555549440000000000000000000000000000000000000000000000606482015260840161067a565b50611452838383611c86565b3373ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016146116c2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f6163636f756e743a206e6f742066726f6d20456e747279506f696e7400000000604482015260640161067a565b565b6000806116de836116d9610140870187612f37565b61130a565b509050806116f05760019150506105bb565b5060009392505050565b801561068c5760405160009033907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff90849084818181858888f193505050503d8060008114611765576040519150601f19603f3d011682016040523d82523d6000602084013e61176a565b606091505b5050505050565b6000808473ffffffffffffffffffffffffffffffffffffffff16848460405161179a919061301c565b60006040518083038185875af1925050503d80600081146117d7576040519150601f19603f3d011682016040523d82523d6000602084013e6117dc565b606091505b50915091508161176a57805160208201fd5b6040517f190100000000000000000000000000000000000000000000000000000000000060208201524660228201527fffffffffffffffffffffffffffffffffffffffff0000000000000000000000003060601b166042820152605681018290526000906076015b604051602081830303815290604052805190602001209050919050565b600080808061188e87611889876006818b613038565b611cab565b6000908152873560f01c6020818152604080842084526002909a013560e01c908190529890912090999198509695509350505050565b60008080806118df876118da876001818b613038565b611873565b935093509350935093509350935093565b6040517f190100000000000000000000000000000000000000000000000000000000000060208201526000602282018190527fffffffffffffffffffffffffffffffffffffffff0000000000000000000000003060601b1660428301526056820183905290607601611856565b6000808080806004600188013560e81c826119788383613062565b905061198a8b6103b083868d8f613038565b939b50919950975095509350878710156119e2576119aa81848b8d613038565b89896040517fb006aba000000000000000000000000000000000000000000000000000000000815260040161067a94939291906130be565b8092505b88831015611acc5760038301928a013560e81c9150611a058383613062565b90506000611a27611a1588612141565b8c8c879086926103b093929190613038565b939c50919a5098509091505088881015611a7f57611a4782858c8e613038565b8a8a6040517fb006aba000000000000000000000000000000000000000000000000000000000815260040161067a94939291906130be565b848110611ac2576040517f37daf62b000000000000000000000000000000000000000000000000000000008152600481018290526024810186905260440161067a565b93509150816119e6565b505050939792965093509350565b611ae381611348565b604051819073ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016907f6f2a6aac3f1c9fc5bb4eec9d305f0036888047b27e7ca599572afe083d9879e890600090a350565b600081158015906105bb5750507fea7157fa25e3aa17d0ae2d5280fa4e24d421c61842aa85e45194e1145aa72bf8541490565b73ffffffffffffffffffffffffffffffffffffffff81163b611c20576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201527f6f74206120636f6e747261637400000000000000000000000000000000000000606482015260840161067a565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc80547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b611c8f83612175565b600082511180611c9c5750805b156114525761111b83836121c2565b60008060005b8381101561213857600181019085013560f81c7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8101611d5257601582019186013560f881901c9060581c73ffffffffffffffffffffffffffffffffffffffff81169074ff000000000000000000000000000000000000000016811785611d385780611d47565b60008681526020829052604090205b955050505050611cb1565b80611de85760018201918681013560f81c906043016000611d7e8a611d7984888c8e613038565b6121e7565b60ff841697909701969194508491905060a083901b74ff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff82161786611dcd5780611ddc565b60008781526020829052604090205b96505050505050611cb1565b60028103611f10576000808784013560f881901c9060581c73ffffffffffffffffffffffffffffffffffffffff16601586019550909250905060008885013560e81c600386018162ffffff169150809650819250505060008186019050611e618b848c8c8a908692611e5c93929190613038565b6124aa565b611ea9578a83611e7383898d8f613038565b6040517f9a94623200000000000000000000000000000000000000000000000000000000815260040161067a94939291906130e5565b60ff8416979097019694508460a084901b74ff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff84161787611ef45780611f03565b60008881526020829052604090205b9750505050505050611cb1565b60038103611f4357602082019186013583611f2b5780611f3a565b60008481526020829052604090205b93505050611cb1565b60048103611f8f576003808301928781013560e81c9190820101600080611f708b61188985898d8f613038565b60009889526020526040909720969097019650909350611cb192505050565b600681036120975760008287013560f81c60018401935060ff16905060008784013560f01c60028501945061ffff16905060008885013560e81c600386018162ffffff169150809650819250505060008186019050600080611ffd8d8d8d8b90879261188993929190613038565b9398508893909250905084821061201357988501985b604080517f53657175656e6365206e657374656420636f6e6669673a0a0000000000000000602080830191909152603882018490526058820188905260788083018a90528351808403909101815260989092019092528051910120896120795780612088565b60008a81526020829052604090205b99505050505050505050611cb1565b600581036121035760208201918601358781036120d2577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff94505b60006120dd82612691565b9050846120ea57806120f9565b60008581526020829052604090205b9450505050611cb1565b6040517fb2505f7c0000000000000000000000000000000000000000000000000000000081526004810182905260240161067a565b50935093915050565b7f8713a7c4465f6fbee2b6e9d6646d1d9f83fec929edfc4baf661f3c865bdd04d160009081526020829052604081206105bb565b61217e81611b7c565b60405173ffffffffffffffffffffffffffffffffffffffff8216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606105d183836040518060600160405280602781526020016131fa602791396126cc565b6000604282146122275782826040517f2ee17a3d00000000000000000000000000000000000000000000000000000000815260040161067a92919061311b565b600061224061223760018561312f565b85013560f81c90565b60ff169050604084013560f81c843560208601357f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08111156122b4578686826040517fad4aac7600000000000000000000000000000000000000000000000000000000815260040161067a93929190613142565b8260ff16601b141580156122cc57508260ff16601c14155b15612309578686846040517fe578897e00000000000000000000000000000000000000000000000000000000815260040161067a93929190613166565b60018403612376576040805160008152602081018083528a905260ff851691810191909152606081018390526080810182905260019060a0015b6020604051602081039080840390855afa158015612365573d6000803e3d6000fd5b50505060206040510351945061244e565b60028403612413576040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101899052600190605c01604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181528282528051602091820120600084529083018083525260ff861690820152606081018490526080810183905260a001612343565b86868560016040517f9dfba85200000000000000000000000000000000000000000000000000000000815260040161067a949392919061318d565b73ffffffffffffffffffffffffffffffffffffffff851661249f5786866040517f6c1719d200000000000000000000000000000000000000000000000000000000815260040161067a92919061311b565b505050509392505050565b60008181036124e5576040517fac241e1100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600083836124f460018261312f565b81811061250357612503612f08565b919091013560f81c915050600181148061251d5750600281145b15612562578473ffffffffffffffffffffffffffffffffffffffff166125448786866121e7565b73ffffffffffffffffffffffffffffffffffffffff16149150612688565b6003810361264d5773ffffffffffffffffffffffffffffffffffffffff8516631626ba7e878660008761259660018261312f565b926125a393929190613038565b6040518463ffffffff1660e01b81526004016125c1939291906131b9565b602060405180830381865afa1580156125de573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061260291906131dc565b7fffffffff00000000000000000000000000000000000000000000000000000000167f1626ba7e00000000000000000000000000000000000000000000000000000000149150612688565b83838260006040517f9dfba85200000000000000000000000000000000000000000000000000000000815260040161067a949392919061318d565b50949350505050565b6040517f53657175656e636520737461746963206469676573743a0a0000000000000000602082015260388101829052600090605801611856565b60606000808573ffffffffffffffffffffffffffffffffffffffff16856040516126f6919061301c565b600060405180830381855af49150503d8060008114612731576040519150601f19603f3d011682016040523d82523d6000602084013e612736565b606091505b509150915061274786838387612751565b9695505050505050565b606083156127e75782516000036127e05773ffffffffffffffffffffffffffffffffffffffff85163b6127e0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161067a565b5081610635565b61063583838151156127fc5781518083602001fd5b806040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161067a9190612d59565b803573ffffffffffffffffffffffffffffffffffffffff8116811461285457600080fd5b919050565b60008083601f84011261286b57600080fd5b50813567ffffffffffffffff81111561288357600080fd5b60208301915083602082850101111561289b57600080fd5b9250929050565b60008060008060008060008060c0898b0312156128be57600080fd5b6128c789612830565b97506128d560208a01612830565b96506128e360408a01612830565b955060608901359450608089013567ffffffffffffffff8082111561290757600080fd5b6129138c838d01612859565b909650945060a08b013591508082111561292c57600080fd5b506129398b828c01612859565b999c989b5096995094979396929594505050565b7fffffffff000000000000000000000000000000000000000000000000000000008116811461068c57600080fd5b60006020828403121561298d57600080fd5b81356105d18161294d565b6000806000806000608086880312156129b057600080fd5b6129b986612830565b94506129c760208701612830565b935060408601359250606086013567ffffffffffffffff8111156129ea57600080fd5b6129f688828901612859565b969995985093965092949392505050565b600080600060408486031215612a1c57600080fd5b83359250602084013567ffffffffffffffff811115612a3a57600080fd5b612a4686828701612859565b9497909650939450505050565b60008060008060408587031215612a6957600080fd5b843567ffffffffffffffff80821115612a8157600080fd5b612a8d88838901612859565b90965094506020870135915080821115612aa657600080fd5b50612ab387828801612859565b95989497509550505050565b600060208284031215612ad157600080fd5b5035919050565b600060208284031215612aea57600080fd5b6105d182612830565b600080600060608486031215612b0857600080fd5b833567ffffffffffffffff811115612b1f57600080fd5b84016101608187031215612b3257600080fd5b95602085013595506040909401359392505050565b60008083601f840112612b5957600080fd5b50813567ffffffffffffffff811115612b7157600080fd5b6020830191508360208260051b850101111561289b57600080fd5b60008060008060008060608789031215612ba557600080fd5b863567ffffffffffffffff80821115612bbd57600080fd5b612bc98a838b01612b47565b90985096506020890135915080821115612be257600080fd5b612bee8a838b01612b47565b90965094506040890135915080821115612c0757600080fd5b50612c1489828a01612b47565b979a9699509497509295939492505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60008060408385031215612c6857600080fd5b612c7183612830565b9150602083013567ffffffffffffffff80821115612c8e57600080fd5b818501915085601f830112612ca257600080fd5b813581811115612cb457612cb4612c26565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f01168101908382118183101715612cfa57612cfa612c26565b81604052828152886020848701011115612d1357600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b60005b83811015612d50578181015183820152602001612d38565b50506000910152565b6020815260008251806020840152612d78816040850160208701612d35565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b60008060008060608587031215612dc057600080fd5b612dc985612830565b935060208501359250604085013567ffffffffffffffff811115612dec57600080fd5b612ab387828801612859565b60008060008060008060008060a0898b031215612e1457600080fd5b612e1d89612830565b9750612e2b60208a01612830565b9650604089013567ffffffffffffffff80821115612e4857600080fd5b612e548c838d01612b47565b909850965060608b0135915080821115612e6d57600080fd5b612e798c838d01612b47565b909650945060808b013591508082111561292c57600080fd5b60008060008060008060a08789031215612eab57600080fd5b612eb487612830565b9550612ec260208801612830565b94506040870135935060608701359250608087013567ffffffffffffffff811115612eec57600080fd5b612c1489828a01612859565b8183823760009101908152919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112612f6c57600080fd5b83018035915067ffffffffffffffff821115612f8757600080fd5b60200191503681900382131561289b57600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203612ffc57612ffc612f9c565b5060010190565b60006020828403121561301557600080fd5b5051919050565b6000825161302e818460208701612d35565b9190910192915050565b6000808585111561304857600080fd5b8386111561305557600080fd5b5050820193919092039150565b808201808211156105bb576105bb612f9c565b8183528181602085013750600060208284010152600060207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116840101905092915050565b6060815260006130d2606083018688613075565b6020830194909452506040015292915050565b84815273ffffffffffffffffffffffffffffffffffffffff84166020820152606060408201526000612747606083018486613075565b6020815260006105ce602083018486613075565b818103818111156105bb576105bb612f9c565b604081526000613156604083018587613075565b9050826020830152949350505050565b60408152600061317a604083018587613075565b905060ff83166020830152949350505050565b6060815260006131a1606083018688613075565b60208301949094525090151560409091015292915050565b8381526040602082015260006131d3604083018486613075565b95945050505050565b6000602082840312156131ee57600080fd5b81516105d18161294d56fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a164736f6c6343000812000a";
    bytes private initCode = abi.encodePacked(byteCode, abi.encode(address(0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789)));

    // -------------------------------------------------------------------------
    // Run
    // -------------------------------------------------------------------------

    function run() public {
        // Log the byte code hash
        // solhint-disable-next-line no-console
        console.logBytes32(keccak256(initCode));
        // The init code hash of the LightWalletFactory
        bytes32 initCodeHash = 0xe48e047cf35221fbcbd25bb30346fb82b747cab834e52d58c59b0e3f1a3387b4;
        // Assert that the init code is the expected value
        assert(keccak256(initCode) == initCodeHash);

        // Salt for deterministic deployment
        bytes32 salt = 0x0000000000000000000000000000000000000000a2850b49daa90b2a103159bd;

        // If testing on a local chain, use without a safe create2
        if (block.chainid == 0x7a69) {
            // Use private key
            vm.startBroadcast(vm.envUint("PRIVATE_KEY"));

            // Construct the entrypoint
            entryPoint = new EntryPoint();

            // Create the factory
            factory = new LightWalletFactory(entryPoint);
        } else {
            // Use regular broadcast
            vm.startBroadcast();

            // Create LightWalletFactory
            factory = LightWalletFactory(IMMUTABLE_CREATE2_FACTORY.safeCreate2(salt, initCode));

            // Assert that the factory is the expected address
            assert(address(factory) == LIGHT_FACTORY_ADDRESS_V0_1_0);
        }

        // Stop the broadcast
        vm.stopBroadcast();
    }
}
