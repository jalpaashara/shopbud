# Shopbud
Shopbud is a mobile application that compares prices accross ecommerce websites such as best buy and ebay

This project was made as a part of coursework CS 641 - Mobile Web Development

The application is build using Ionic framework with Angular. CSS3 and ionic provided custom animations is used for styling.

## Setup

This document will help set up local environment to run this project locally.

## Requirements
1. [Install NodeJS](#install-nodejs)
2. [Install Ionic and Cordova](#install-ionic-and-cordova-using-npm)
3. [Clone this repository](#clone-this-repository)
4. [Install Dependencies](#install-dependencies)
5. [Run Shopbud](#run-shopbud)


### Install NodeJS
From your terminal/command line, run the following command to check if NodeJS is installed in your system:
#### `node -v`
You should see a version number, and the version number should be at least 8.9.0.

If you have NodeJS installed, check if npm is installed by running the following command:
#### `npm -v`

You should see a version number, and the version number should be at least 5.5.1.

If you dont see a version number, then grab the LTS installer from [NodeJS.org](https://nodejs.org/en/) to install NodeJS. If it asks you to also install NPM, say yes!
<hr>

### Install Ionic and Cordova using npm
Let's make sure that you also have crdova and ionic installed.
#### `npm install -g cordova`
#### `npm install -g ionic`

### Clone this repository
 Clone this repository using your git client!

The repository URL is 'https://github.com/jalpaashara/shopbud.git'. If you've never done this before, you want to go into your terminal or git bash and type:
#### `git clone https://github.com/jalpaashara/shopbud.git`

This will clone the repository into your current working directory.

<hr>

### Install Dependencies
Once the repository is cloned, enter that directory in your terminal, and run
#### `npm install`

You can also add the platform(iOs or Android or browser if you want a webapp that runs on a browser instead of an app) on which you might want to run this application.
#### `ionic cordova platform add [ios|android|browser]`
OR you can just restore the platform that I have used which is the browser mode using the following command.
#### `ionic cordova build`
Don't get scared if you see a www folder being created as well.
www is the compiled code, every time you build your project the www content is erased and created again. You can also deploy your application on web using the code that's inside www folder.

<hr>

### Run Shopbud
Before you can run the application, you will need an API key for Bestbuy and eBay APIs that is used in this application. 

Once you have the API key, use them in the environment.ts file which can be found in src/environments folder

And finally to run the application type in the below command in your terminal:
#### `ionic serve`

To run the app directly on your mobile (if you have windows machine then android phone is required) use the following command while plugged in to the machine:
#### `ionic cordova run [ios|android]`
use ios for iPhone and android for Android phones

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

<hr>
