# Copilot Instructions for Pranayamam

This document guides AI coding agents to be productive in the Pranayamam Expo codebase. It summarizes architecture, workflows, conventions, and integration points specific to this project.

## Architecture Overview
- **Expo/React Native app** for guided 4-7-8 breathing exercises.
- **File-based routing**: Screens are in `app/` (`index.tsx`, `details.tsx`, `exercise.tsx`).
- **Major screens**:
  - `index.tsx`: Home/configuration (duration, sound, music)
  - `details.tsx`: Instructions, with skip logic using AsyncStorage
  - `exercise.tsx`: Breathing exercise UI
- **Assets**: Fonts in `assets/fonts/`, images in `assets/images/`
- **State persistence**: Uses `@react-native-async-storage/async-storage` for user preferences (e.g., skip instructions)

## Developer Workflows
- **Install dependencies**: `npm install`
- **Run app**: `npx expo start`
- **No custom build/test scripts**; use Expo CLI for all dev tasks
- **Hot reload** is enabled by default

## Project-Specific Patterns & Conventions
- **Skip instructions logic**: In `details.tsx`, if user selects "Don't show these instructions again", sets AsyncStorage and navigates to `/exercise`. In `index.tsx`, checks this value and skips details screen if set.
- **Navigation**: Uses `expo-router` for screen transitions (`router.push`, `router.replace`)
- **Styling**: All screens use inline `StyleSheet.create` objects; dark theme with green accents
- **Component structure**: Each screen is a single default export function
- **No global state management** (Redux, Context, etc.)
- **No backend/API integration**; all logic is local

## Integration Points & External Dependencies
- **@react-native-async-storage/async-storage**: For persistent user preferences
- **expo-router**: For navigation
- **Expo**: For build/run, asset management

## Examples
- To add a new screen, create a new file in `app/` and use `export default function ScreenName() { ... }`
- To persist a setting:
  ```ts
  await AsyncStorage.setItem('key', value);
  const value = await AsyncStorage.getItem('key');
  ```
- To navigate:
  ```ts
  router.push('/details');
  router.replace('/exercise');
  ```

## Key Files & Directories
- `app/index.tsx`, `app/details.tsx`, `app/exercise.tsx`: Main screens
- `assets/`: Fonts and images
- `package.json`: Dependency list
- `README.md`: Project overview

---
If any conventions or workflows are unclear, please ask for clarification or examples from the codebase.
