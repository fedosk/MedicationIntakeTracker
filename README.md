# Medication Intake Tracker

Welcome to the Medication Intake Tracker app! This README will guide you through setting up and running the app on your local development environment.

## Prerequisites

Before you start, ensure you have the following installed:

- **Node.js** (version 18 or later)
- **Yarn** (version 1.x or 2.x)
- **React Native CLI**

## Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/your-repo/medication-intake-tracker.git
   cd medication-intake-tracker
   ```

2. **Install dependencies**:

   ```sh
   yarn install
   ```

## Running the App

### Android

To run the app on an Android device or emulator, make sure you have the Android development environment set up. Refer to the [React Native Documentation](https://reactnative.dev/docs/environment-setup) for detailed setup instructions.

1. **Start the Metro server**:

   ```sh
   yarn start
   ```

2. **Run the app on Android**:

   ```sh
   yarn android
   ```

### iOS

To run the app on an iOS simulator or device, make sure you have the iOS development environment set up. Refer to the [React Native Documentation](https://reactnative.dev/docs/environment-setup) for detailed setup instructions.

1. **Install pods**:

   ```sh
   cd ios
   pod install
   ```

2. **Start the Metro server**:

   ```sh
   yarn start
   ```

3. **Run the app on iOS**:

   ```sh
   yarn ios
   ```

   By default, this command will attempt to run the app on the iPhone 15 simulator. Make sure you have at least Xcode 14 installed.

## Linting and Formatting

To ensure your code follows the project's linting and formatting rules, use the following commands:

- **Lint the code**:

  ```sh
  yarn lint
  ```

- **Format the code using Prettier**:

  ```sh
  yarn prettier --write .
  ```

## Testing

To run the tests, use the following command:

```sh
yarn test
```

## Environment Variables

The project may require certain environment variables. Make sure you have a `.env` file at the root of your project with the required variables:

```env
API_URL=http://localhost:8090/api
```