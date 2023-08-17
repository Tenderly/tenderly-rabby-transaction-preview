<div>
  <img width="1680" alt="Rabby Wallet with Tenderly Simulation API" src="https://github.com/Tenderly/tenderly-rabby-transaction-preview/assets/26412515/1d0f13a4-4194-476e-9197-7fed15c77459">
  <h1 align="center">Integrate Tenderly Transaction Simulations Into Rabby Wallet</h1>
</div>

<p align="center">
   Integrate the Tenderly Simulation API into Rabby Wallet to simulate ERC-20 and ERC-721 transactions and display human-readable information.
</p>

<p align="center">
  <a href="https://twitter.com/TenderlyApp">
    <img src="https://img.shields.io/twitter/follow/TenderlyApp?style=flat&label=%40TenderlyApp&logo=twitter&color=0bf&logoColor=fff" alt="Twitter" />
  </a>
  <a href="https://github.com/Tenderly/tenderly-rabby-transaction-preview/blob/develop/LICENSE">
    <img src="https://img.shields.io/github/license/Tenderly/tenderly-rabby-transaction-preview?label=license&logo=github&color=f80&logoColor=fff" alt="License" />
  </a>
</p>

<p align="center">
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#setup"><strong>Setup</strong></a> ·
  <a href="#examples"><strong>Examples</strong></a> ·
  <a href="#contributing"><strong>Contributing</strong></a>
</p>
<br/>

# Introduction

> This repo is forked from [Rabby Wallet](https://github.com/RabbyHub/Rabby) repository.

Rabby Wallet with a transaction preview option can allow users to simulate transactions and get in-depth insights before
sending them on-chain. By using the Tenderly Simulation API, Rabby Wallet, and other wallets, DEXs, and DeFi platforms,
can create a better experience for users, protect their funds, and provide the information they need to sign and send
transactions with confidence.

# Setup

Welcome to the setup guide for integrating Tenderly Simulation API into Rabby Wallet. In this tutorial, we will guide
you through each step to ensure that you are set up correctly. Follow the instructions below to get started.

For the full setup and understanding how Rabby works, follow the guide on [Rabby Wallet's GitHub repo](https://github.com/RabbyHub/Rabby/blob/develop/README.md).

## 1. Rabby Wallet Installation

### Install Rabby Wallet Chrome Extension

The next step is to install the Rabby Wallet Chrome extension. You can install it from the [Chrome Web Store](https://chrome.google.com/webstore/detail/rabby-wallet/acmacodkjbdgmoleebolmdjonilkdbch). Simply click the link and follow the instructions to add the extension to your browser.

### Disable the Production Version of Rabby Wallet

If you have the production version of Rabby Wallet installed, you'll need to disable it. Navigate to `chrome://extensions` in your browser. Locate Rabby Wallet from the list of your installed extensions, and toggle it off. Alternatively, you can start a new profile in Chrome or Brave, which will allow you to use different extensions for different purposes.

### Load an Unpacked Version

Follow the [Google Chrome instructions](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked) to load an unpacked extension in developer mode.

## 2. Tenderly Access

### Open a Tenderly Account

To utilize the features provided by the Tenderly Simulation API, you'll need a Tenderly account. If you don't have one already, visit the [Tenderly website](https://dashboard.tenderly.co/register) and create a new account.

### Create an Access Token

Once you've logged into your Tenderly account, you will need to create an `access token`. This is a unique identifier that allows the Rabby Wallet integration to interact with your Tenderly account. Generate it on the following link https://dashboard.tenderly.co/account/authorization.

<img width="616" alt="image" src="https://github.com/Tenderly/tenderly-rabby-transaction-preview/assets/26412515/9047d712-4a01-4bc8-970f-46a48a54b91c">

## 3. App Setup

### Clone the Repository

Now, you'll need to get the code for the app onto your local machine. You can do this by cloning this repository. If you're not sure how to do this, you can find detailed instructions in the GitHub documentation.

### Start the App

To clone the repository, use the following command:

```
git clone https://github.com/Tenderly/tenderly-rabby-transaction-preview.git
```

Then navigate to the root directory of the project:

```
cd tenderly-rabby-transaction-preview
```

Start the app with:

```
yarn build:dev
```

# Examples

In this section, we provide examples of how the Rabby Wallet with Tenderly Simulation API works with ERC20 and NFT transfers.

## ERC20 Token Swap on Uniswap

The images below show a successful ERC20 token swap of ETH to 1INCH with asset changes and a detailed breakdown of the transaction.

<img width="400" alt="image" src="https://github.com/Tenderly/tenderly-rabby-transaction-preview/assets/26412515/6303b243-9700-4458-a258-18418ac7b97d">

You can see the whole simulated transaction on Tenderly Dashboard here:

https://dashboard.tenderly.co/shared/simulation/a2690d05-6136-47b8-af83-b264e3defc1a

![image](https://github.com/Tenderly/tenderly-rabby-transaction-preview/assets/26412515/700c4122-3501-4fbf-9ca1-7b2b57f5ebc1)

## NFT Purchase on Joepegs

The images below show a successful purchase of several NFTs with asset changes and a detailed breakdown of the transaction.

<img width="400" alt="image" src="https://github.com/Tenderly/tenderly-rabby-transaction-preview/assets/26412515/f48e335e-6ffb-4ce5-b6e7-2e022eb1b058">

You can see the whole simulated transaction on Tenderly Dashboard here:

https://dashboard.tenderly.co/shared/simulation/f72eca66-57a9-4411-9398-0a9d5f14f560

![image](https://github.com/Tenderly/tenderly-rabby-transaction-preview/assets/26412515/30b4392d-102b-4cf9-bc72-5d47f7c5ba5d)

# Contributing

We love our contributors! Here's how you can contribute:

- [Open an issue](https://github.com/Tenderly/tenderly-rabby-transaction-preview/issues) if you believe you've encountered a bug.
- Make a [pull request](https://github.com/Tenderly/tenderly-rabby-transaction-preview/pull) to add new features/make quality-of-life improvements/fix bugs.

<a href="https://github.com/Tenderly/tenderly-rabby-transaction-preview/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Tenderly/tenderly-rabby-transaction-preview" alt="tenderly-contributors" />
</a>

# Author

- Vanja Paunović ([@dzimiks](https://twitter.com/dzimiks))
