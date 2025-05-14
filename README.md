# Location Tracking App

## **⚠️ BEFORE WE START**

### **Critical Information You Must Know**

- **📱 iOS Simulator Limitation**: Notifications and background tasks are **NOT** working on iOS simulators. This app is developed and tested using **Android emulator** - it's highly recommended to test on Android devices.

- **🛠️ Prerequisites**: The app is built using **React Native Expo**. Please ensure you have Expo CLI properly configured before attempting to run the application.

- **🔐 License Requirement**: Location tracking in background uses `react-native-background-geolocation` which requires a **commercial license** for release mode. This app currently **only works in debug mode**.

- **✅ Permissions Required**: For all features to function properly, please **accept ALL permissions** when requested by the app.

- **✏️ Edit Feature Status**: Due to time constraints and design considerations, the edit feature for location items is currently **disabled**. From a UX perspective, there's minimal need to edit existing location data.

- **⚙️ Configuration Limitation**: The app currently **does not support** updating tracking intervals while tracking is active. Please **stop tracking** before modifying any configuration settings.

- **📝 Debug Logs**: Logs are preserved for testing and debugging purposes.

---
## 🚀 Installation

1. Clone the repository:
```bash
git clone [[repository-url]](https://github.com/phaoga54/DGT-POC/)
cd location-tracking-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install Expo CLI (if not already installed):
```bash
npm install -g @expo/cli
```

## ⚙️ Setup

1. Ensure you have the Android SDK installed and an Android emulator running
2. Configure your development environment for React Native
3. Make sure all required permissions are enabled on your device/emulator

## ▶️ Running the App

### For Android (Recommended):
```bash
expo run:android
```

### For Development:
```bash
expo start
```

## ⚠️ Known Issues

1. **iOS Simulator**: Background tasks and notifications don't work
2. **Release Mode**: Requires commercial license for background geolocation
3. **Edit Feature**: Currently disabled for location items
4. **Runtime Config**: Cannot update intervals while tracking is active

### 🔧 Development Environment

- React Native with Expo
- Android SDK
- Node.js
- Expo CLI

---

**Remember**: This is a debug-only application. Ensure all permissions are granted and use Android for the best experience.
