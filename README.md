# Find-Phone-Country
A React Native based mobile app for retrieving information about phone numbers.
This app was designed as a port of the already existing Find Phone Country Android Application which was written in the native Java/Android Studio based approach, and will replace the version 2.5 with the revamped 3.0+ . This app could be also compiled for iOS since it is written using React Native and uploaded in the Apple App Store.

## Features
* Identify the country and city of the caller based on the phone type
* Identify the phone type (e.g. Mobile, Landline)
* For Mobile phone numbers, get information about the caller's carrier
* Load a phone number from the contact list
* Access the history of your searches


## How to use the mobile application
1. Enter the phone number you want in the main screen with the appropriate prefix of the country.
2. The prefix is usually in the form of +xx or 00xx where the x is the digits of the country code.
For example, Greece has the prefix +30 or 0030.
3. You can also load a phone number from your contacts list so you don't have to manually copy it down.


Downloads
---------------------

<strong>Find Phone Country on Google Play</strong>
<br /><br />
<a href="https://play.google.com/store/apps/details?id=com.theofilos.chamalis.findphonecountry">
  <img alt="Get it on Google Play" src="https://developer.android.com/images/brand/en_generic_rgb_wo_45.png" />
</a>

## Screenshots

![Alt text](https://lh3.googleusercontent.com/QHKcGjB1coyKFnoMMlMDKFZsxb5b2QIPDGkVRa7l2B1iYPpyqAqKp7EwNM47eivWmtQ=w720-h380-rw "Login Screen") 
![Alt text](https://lh3.googleusercontent.com/jPr6XrHdUqLu-cHzY_Dx4Rx1y7EyP2j-VIMmVrLAYwCVcMu8icfUCZI4-ebSyZIl11U=w720-h380-rw "Server Screen") 
![Alt text](https://lh3.googleusercontent.com/p_BwjT4Qvb3m_a8J7jW8HLPeI4jSLh84FT5__dJQUP6oIiObLpujtze7YMP9B-QOHwA=w720-h380-rw "Mapview Screen") 
![Alt text](https://lh3.googleusercontent.com/K5ey4JjmU2UO9Vph4RSq7qnqSWjkw9zt0Cg9S8-wRQjmGXVLg2IRvzN8LgcKLS5oh1lu=w720-h380-rw "Chat Screen")
<br/>
<br/>

## Quick Start

```bash
# clone repository
git clone https://github.com/Theofilos-Chamalis/Find-Phone-Country.git

# Install dependencies
cd Find-Phone-Country && yarn install

# Register your personal API keys at numverify.com and create a keys file
Directory: api/keys.ts
```

```bash
# To run the development server
yarn run start
```
