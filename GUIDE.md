# Project Implementation Guide

This guide details the structure and location of key features implemented in the application, specifically focusing on Profile management and Account settings.

## 📍 Where to Find Code ("Where is it?")

### 1. **User Profile & Editing**
*   **File**: `src/pages/Profile.vue`
*   **Key Features**:
    *   **Avatar/Cover Upload**: Handles file selection (`onAvatarChange`) and preview.
    *   **Edit Mode**: Toggles input fields for Name and Email.
    *   **Saving**: `saveProfile()` function orchestrates calls to update text details and upload images sequentially.
*   **Backend Connection**: sends data to `/users/update-account`, `/users/avatar`, and `/users/cover-image`.

### 2. **Account Settings**
*   **File**: `src/pages/Settings.vue`
*   **Key Features**:
    *   **Change Password**: Form to update password (`changePassword()`).
    *   **Delete Account**: Danger zone with confirmation to permanently delete account (`deleteAccount()`).
*   **Backend Connection**: sends data to `/users/change-password` and `/users/del-acc`.

### 3. **API Service Layer**
*   **File**: `src/services/auth.service.js`
*   **Key Features**:
    *   Central hub for all user-related API calls.
    *   **Methods**:
        *   `updateUserProfile(data)`: PATCH request to update text info.
        *   `updateAvatar(file)`: PATCH request with FormData for avatar.
        *   `updateCoverPhoto(file)`: PATCH request with FormData for cover.
        *   `deleteAccount()`: DELETE request to remove user.
        *   `resetPassword(data)`: POST request to change password.

### 4. **Utilities**
*   **File**: `src/utils/fromData.js`
*   **Key Features**:
    *   Helper function to convert JavaScript objects into `FormData` for file uploads.
    *   **⚠️ Important Note**: This is defined as an arrow function. It should be called **without** the `new` keyword (e.g., `const formData = createFormData({...})`). Using `new` will cause an error.

## 🔄 How Request Flow Works

1.  **Trigger**: User clicks "Save" in `Profile.vue` or "Update" in `Settings.vue`.
2.  **Preparation**: Component gathers inputs (files or text).
3.  **Service Call**: Component calls the appropriate method in `auth.service.js`.
4.  **Data Formating**: Service uses `createFormData` (for files) or raw JSON (for text).
5.  **Network**: `api.js` interceptor adds the Authorization token to headers.
6.  **Backend**: Request reaches the NodeJS/Express backend endpoints.
