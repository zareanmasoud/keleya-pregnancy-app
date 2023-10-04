This is an implementation of [**Keleya Task**](https://gist.github.com/keleya-engineering/fc641063662b4643aa9b4c5f8d5b65ac) for hiring process, bootstrapped using React Native.

## Step 1: Start the Metro Server

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using Yarn
yarn start

# OR using npm
npm start
```

### For iOS - Additional

```bash
# using yarn
yarn pod-install

# OR using npm
npm run pod-install
```

## Step 2: Start the Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For iOS

```bash
# using Yarn
yarn ios
```

### For Android

```bash
# using Yarn
yarn android
```

### Additional Steps

For _e2e_ tests and image snapshots you need to first install dependencies:

```bash
yarn global add detox-cli
```

Or use it with _npx_, and:

```bash
brew tap wix/brew
brew install applesimutils
```


Then, build by:

### For iOS

```bash
# using yarn
yarn e2e:build:ios-debug
```

After that, run the tests:

```bash
# using yarn
yarn e2e:test:ios-debug
```

### For Android

```bash
# using yarn
yarn e2e:build:android-debug
```

Then:

```bash
# using yarn
yarn e2e:test:android-debug
```
