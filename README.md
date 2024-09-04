<!-- Title -->

<p  align="center">
<h1  align="center">Solar Card React Native App</h1>
</p>
<!-- Header -->
<p  align="center">
<!-- iOS -->
<img  alt="Supports Expo iOS"  longdesc="Supports Expo iOS"  src="https://img.shields.io/badge/iOS-000.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff"  />
<!-- Android -->
<img  alt="Supports Expo Android"  longdesc="Supports Expo Android"  src="https://img.shields.io/badge/Android-000.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff"  />
</p>
<!-- Body -->

## Prerequisites

- [Node.js](https://nodejs.org) and yarn
- [Xcode](https://developer.apple.com/xcode)
- [Cocoapods](https://cocoapods.org)
- [JDK](https://www.oracle.com/java/technologies/downloads)
- [Android Studio and Android SDK](https://developer.android.com/studio)

## Usage

- `yarn install` : Install dependencies.
- `yarn ios` : Build the iOS App (requires a MacOS computer).
- `yarn android` : Build the Android App.

## Summary of the project
In this react native project, the recoil is used to manage states across components. We used firebase auth functionality for the authentication of users.

## New Solar Card Ordering Flow
### Dashboard
Here is a list of cards, balances, transactions, and an opportunity to order a new card and manage the older one.

### Flow of ordering plastic or platinum card
**Step 1:** User selecting the card type
Just to move forward, the user should select firstly the card type, in our case, this is a plastic or platinum card.

**Step 2:** User should provide shipping data
On this state, the user is selecting the shipping address where the card has to be delivered.

**Step 3:** Success Page
Success Message about the card and FULL PAYMENT PROCEED.

**Step 4:** Card Status
Here is the page with the status about the order process.

### Card Dashboard
On this page with active cards, the user can see a disabled card with the order date, status, and delivery prediction.

### Card Shipped
The user receives an envelope with the Card and Instructions about activation. Inside the Application, the status has been changed, and the “Activate Button” just appeared.

### Card Activation
The user should write down the card number inside the activation window.

### Virtual Card Order Process
User can order a plastic or platinum card only if he uses a virtual card already and has funds on balance to pay for card activation and delivery. After ordering a new card, the user can disable the previous card for some period.

**Step 1:** User selecting the virtual card in the list, the user able to open this card firstly only.

**Step 2:** Confirmation
User confirming the card order.

**Step 3:** Card Activation
The user should deposit the card fee within 24 hours to activate the card.

**Step 4:** Card Activated
We automatically process the payment, and the card has been fully activated. Next time (1 month), this action will be repeated because the user should pay the card fee monthly; otherwise, the card will be removed. If the user doesn’t pay, the card will be removed from the account. The card could be deactivated for a long period if the user blocked the card from settings.