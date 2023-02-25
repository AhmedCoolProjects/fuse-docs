---
title: Operators, users and merchants
sidebar_position: 3
---

Fuse V2 is an infrastructure for business adoption of web3 payments. It enables to build payment applications and wallets with ease. With the Fuse Stack, developers can focus on the business logic essentials instead on the complex blockchain tech. Fuse V2 is the core of the Stack, establishing the sufficiently decentralized infrastrcture for payments.

## Roles an Entities

**Operators** - develop and maintain the payment application, doing support and user acquisition as well. Onboard users to the application and responsible in following the local regulations.

**Users** - Users of the application, they are the customers and the merchants. They want to pay or receive a payment for their products and services. Do not expected to be blockchain or crypto savy

**Power Validators** - run and maintain the payment infrastructure that the application is using to facilitate payments.

Every entity on the network is represented with a Smart Wallet Contract. The smart contracts enable extra functionality that can be injected via payment primitives.

## Payment flow

When a user wants to pay to a merchant the following steps take place:

- User opens a wallet, and signs a transaction
- By using the fuse-SDK the transaction is relayed to a Power Validator
- Power Validator relays the transaction to the blockchain network
- The transaction is confirmed by the validators
- Merchant receives the funds in his wallet

### The services to make it work

- API's - both the user and merchant use multiple APIs in the flow
- Relayer - sending a gas less transaction
- Extra features like payment links to pay for the product online, or a webhook to get a notification about the payment

For the use of those services, operators are paying to the Power Validators.

Operators Business model
