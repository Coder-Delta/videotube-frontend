# Project Implementation Guide

This guide details the structure and location of key features implemented in the application, specifically focusing on Profile management and Account settings.

## 📍 Where to Find Code ("Where is it?")

### 1. **User Profile & Editing**

* **File**: `src/pages/Profile.vue`
* **Key Features**:
  * **Avatar/Cover Upload**: Handles file selection (`onAvatarChange`) and preview.
  * **Edit Mode**: Toggles input fields for Name and Email.
  * **Saving**: `saveProfile()` function orchestrates calls to update text details and upload images sequentially.
* **Backend Connection**: sends data to `/users/update-account`, `/users/avatar`, and `/users/cover-image`.

### 2. **Account Settings**

* **File**: `src/pages/Settings.vue`
* **Key Features**:
  * **Change Password**: Form to update password (`changePassword()`).
  * **Delete Account**: Danger zone with confirmation to permanently delete account (`deleteAccount()`).
* **Backend Connection**: sends data to `/users/change-password` and `/users/del-acc`.

### 3. **API Service Layer**

* **File**: `src/services/auth.service.js`
* **Key Features**:
  * Central hub for all user-related API calls.
  * **Methods**:
    * `updateUserProfile(data)`: PATCH request to update text info.
    * `updateAvatar(file)`: PATCH request with FormData for avatar.
    * `updateCoverPhoto(file)`: PATCH request with FormData for cover.
    * `deleteAccount()`: DELETE request to remove user.
    * `resetPassword(data)`: POST request to change password.

### 4. **Utilities**

* **File**: `src/utils/fromData.js`
* **Key Features**:
  * Helper function to convert JavaScript objects into `FormData` for file uploads.
  * **⚠️ Important Note**: This is defined as an arrow function. It should be called **without** the `new` keyword (e.g., `const formData = createFormData({...})`). Using `new` will cause an error.

### 5. **Video Management**

* **Files**:
  * `src/pages/Watch.vue` - Main video watch page.
  * `src/pages/Upload.vue` - Video upload functionality.
  * `src/components/video/VideoPlayer.vue` - Video playback component.
  * `src/components/video/VideoControls.vue` - Play, pause, volume controls.
  * `src/components/video/VideoDescription.vue` - Video details and metadata.
* **Key Features**:
  * **Video Upload**: File selection, thumbnail preview, metadata input (`title`, `description`, `isPublished`).
  * **Video Playback**: HTML5 video player with custom controls.
  * **Video Details**: Display title, description, view count, and upload date.
* **Backend Connection**: `/videos/upload`, `/videos/:videoId`, `/videos/:videoId/views`.
* **Service**: `src/services/video.service.js`

### 6. **Comments System**

* **Files**:
  * `src/pages/Watch.vue` - Contains comments section.
  * `src/components/comments/CommentBox.vue` - Add new comment form.
  * `src/components/comments/CommentItem.vue` - Individual comment display.
  * `src/components/video/Comments.vue` - Comments container.
* **Key Features**:
  * **Add Comment**: Text input with submit button (`addComment()`).
  * **Display Comments**: Nested structure showing comment text, author, timestamp.
  * **Delete Comment**: Option to delete own comments (admin/owner only).
* **Backend Connection**: `/comments/:videoId`, `/comments/:commentId`.
* **Service**: `src/services/comment.service.js`

### 7. **Search Functionality**

* **File**: `src/pages/Search.vue`
* **Key Features**:
  * **Search Query**: Input field that captures search terms.
  * **Results Display**: Grid of video cards matching search criteria.
  * **Pagination**: Load more results as user scrolls.
* **Backend Connection**: `/videos/search?q=query&limit=&offset=`.
* **Service**: `src/services/video.service.js`

### 8. **Playlists**

* **Files**:
  * `src/pages/Playlist.vue` - List all user playlists.
  * `src/pages/PlaylistView.vue` - View single playlist with videos.
* **Key Features**:
  * **Create Playlist**: Form to create new playlist.
  * **Add Videos**: Add videos to playlist from watch page.
  * **View Playlist**: Display all videos in playlist with playback.
  * **Delete Playlist**: Remove playlist (owner only).
* **Backend Connection**: `/playlists`, `/playlists/:playlistId`, `/playlists/:playlistId/videos`.
* **Service**: `src/services/playlist.service.js`

### 9. **Subscriptions**

* **File**: `src/pages/Subscriptions.vue`
* **Key Features**:
  * **View Subscriptions**: List of all subscribed channels.
  * **Subscribe/Unsubscribe**: Toggle subscription status.
  * **Latest Videos**: Display recent videos from subscribed channels.
* **Backend Connection**: `/subscriptions`, `/subscriptions/:channelId`.
* **Service**: `src/services/subscription.service.js`

### 10. **Channel Management**

* **Files**:
  * `src/pages/Channel.vue` - Public channel view.
  * `src/pages/MyChannel.vue` - Personal channel dashboard.
* **Key Features**:
  * **Channel Info**: Display channel banner, avatar, description.
  * **Video List**: Show all videos uploaded by channel.
  * **Subscribe Button**: Allow other users to subscribe.
  * **Dashboard Analytics** (MyChannel): View stats, manage videos.
* **Backend Connection**: `/channels/:channelId`, `/channels/me`.
* **Service**: `src/services/dashboard.service.js`

### 11. **Likes & Interactions**

* **File**: Integrated in video components.
* **Key Features**:
  * **Like Video**: Toggle like status on videos.
  * **Like Count**: Display total likes.
  * **Like Status**: Show if current user has liked.
* **Backend Connection**: `/likes/toggle/:videoId`.
* **Service**: `src/services/like.service.js`

### 12. **Tweets**

* **File**: Integrated in dashboard/channel pages.
* **Key Features**:
  * **Create Tweet**: Short text post functionality.
  * **Display Tweets**: List all tweets from user/channel.
  * **Delete Tweet**: Remove tweets (owner only).
* **Backend Connection**: `/tweets`, `/tweets/:tweetId`.
* **Service**: `src/services/tweet.service.js`

### 13. **State Management (Vuex Store)**

* **Files**:
  * `src/store/index.js` - Root store configuration.
  * `src/store/auth.store.js` - Authentication state (user info, token).
  * `src/store/video.store.js` - Video state (current video, playlist).
* **Key Features**:
  * **Auth State**: Stores user data, login status, token.
  * **Video State**: Tracks current video, related videos, watch history.
  * **Mutations**: Update state directly.
  * **Actions**: Async operations calling services.
  * **Getters**: Computed state values.

### 14. **Router**

* **File**: `src/router/index.js`
* **Key Routes**:
  * `/` - Home page.
  * `/watch/:videoId` - Watch video.
  * `/upload` - Upload new video.
  * `/search?q=query` - Search results.
  * `/playlist` - All playlists.
  * `/playlist/:playlistId` - View single playlist.
  * `/subscriptions` - Subscribed channels.
  * `/channel/:channelId` - Public channel.
  * `/my-channel` - Personal channel dashboard.
  * `/profile` - User profile.
  * `/settings` - Account settings.
  * `/login` - Login page.
  * `/register` - Registration page.

### 15. **Layout Components**

* **Files**:
  * `src/components/layout/BaseLayout.vue` - Main layout wrapper.
  * `src/components/layout/Navbar.vue` - Top navigation bar.
  * `src/components/layout/Footer.vue` - Footer.
  * `src/components/layout/Loader.vue` - Loading spinner.
  * `src/components/layout/ToastNotification.vue` - Notifications/alerts.
* **Key Features**:
  * **Navigation**: Links to all main sections.
  * **User Menu**: Profile, settings, logout options.
  * **Search Bar**: Global search functionality.
  * **Notifications**: Toast messages for user feedback.

## 🔄 How Request Flow Works

1. **Trigger**: User clicks "Save" in `Profile.vue` or "Update" in `Settings.vue`.
2. **Preparation**: Component gathers inputs (files or text).
3. **Service Call**: Component calls the appropriate method in `auth.service.js`.
4. **Data Formating**: Service uses `createFormData` (for files) or raw JSON (for text).
5. **Network**: `api.js` interceptor adds the Authorization token to headers.
6. **Backend**: Request reaches the NodeJS/Express backend endpoints.

## 📚 API Service Layer Overview

All API communication is handled through service files in `src/services/`:

* **auth.service.js** - User authentication and profile management.
* **video.service.js** - Video CRUD operations and search.
* **comment.service.js** - Comment management.
* **playlist.service.js** - Playlist operations.
* **subscription.service.js** - Subscription management.
* **like.service.js** - Like/unlike videos.
* **tweet.service.js** - Tweet management.
* **dashboard.service.js** - Channel analytics and statistics.
* **healthCheak.service.js** - Backend health check.

Each service uses the base `api.js` instance which automatically injects the JWT token in request headers.

## 🔐 Authentication Flow

1. **Login/Register**: User credentials sent to backend.
2. **Token Storage**: JWT token stored in cookies (via `src/utils/cookie.js`).
3. **Token Injection**: Every API request automatically includes token in `Authorization` header.
4. **Protected Routes**: Router guards check authentication before accessing protected pages.
5. **Logout**: Token cleared from cookies and store reset.

## 🛠️ Key Utilities

* **`src/utils/api.js`** - Axios instance with JWT interceptor.
* **`src/utils/cookie.js`** - Cookie management for token storage.
* **`src/utils/formatDates.js`** - Format dates for display (e.g., "2 days ago").
* **`src/utils/formatTime.js`** - Format video duration (e.g., "2:34:10").
* **`src/utils/fromData.js`** - Convert objects to FormData for file uploads.
