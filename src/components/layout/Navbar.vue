<script setup>
import { 
  Search, 
  Bell, 
  Video, 
  Mic,
  LayoutGrid
} from 'lucide-vue-next';
</script>

<template>
  <header class="navbar">
    <div class="navbar-glass"></div>
    <div class="navbar-left">    
      <div class="logo-group">
        <div class="logo-mark"></div>
        <span class="logo-text">VideoTube</span>
      </div>
    </div>

    <div class="navbar-center">
      <div class="search-container">
        <div class="search-wrapper">
          <Search class="search-icon" :size="18" />
          <input type="text" placeholder="Explore your next favorite video..." class="search-input" />
          <div class="search-shortcut">/</div>
        </div>
        <button class="voice-btn" title="Search with voice">
          <Mic :size="20" />
        </button>
      </div>
    </div>

    <div class="navbar-right">
      <div class="action-icons">
        <button class="icon-btn" title="Create">
          <Video :size="22" />
        </button>
        <button class="icon-btn" title="Notifications">
          <Bell :size="22" />
          <span class="notification-dot"></span>
        </button>
      </div>
      
      <div class="auth-buttons">
        <button class="btn-secondary">Sign In</button>
        <button class="btn-primary">Sign Up</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;800&display=swap');

.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  background: #0b0f1a;
  color: #fff;
  font-family: 'Plus Jakarta Sans', sans-serif;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.navbar-glass {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.05), transparent);
  pointer-events: none;
}

/* Left Section */
.navbar-left {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.logo-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-mark {
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #ef4444, #b91c1c);
  border-radius: 8px;
  position: relative;
}

.logo-mark::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -50%);
  border-top: 5px solid transparent;
  border-left: 8px solid white;
  border-bottom: 5px solid transparent;
}

.logo-text {
  font-weight: 800;
  font-size: 1.25rem;
  letter-spacing: -0.5px;
  background: linear-gradient(to right, #fff, #94a3b8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Search Bar (The "Pretty" Focus) */
.navbar-center {
  flex: 0 1 600px;
  padding: 0 2rem;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.search-wrapper {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0 16px;
  height: 48px;
  border-radius: 14px;
  transition: all 0.3s ease;
}

.search-wrapper:focus-within {
  background: rgba(2, 6, 23, 0.8);
  border-color: #3b82f6;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.15);
  transform: translateY(-1px);
}

.search-icon {
  color: #64748b;
  margin-right: 12px;
}

.search-input {
  background: transparent;
  border: none;
  color: #fff;
  width: 100%;
  font-size: 14px;
  outline: none;
}

.search-shortcut {
  background: rgba(255, 255, 255, 0.05);
  color: #64748b;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
}

.voice-btn {
  background: rgba(255, 255, 255, 0.03);
  border: none;
  color: #94a3b8;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.voice-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #ef4444;
}

/* Right Section */
.navbar-right {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.action-icons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.2s;
}

.icon-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.notification-dot {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 8px;
  height: 8px;
  background: #ef4444;
  border: 2px solid #0b0f1a;
  border-radius: 50%;
}

.auth-buttons {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-secondary {
  background: transparent;
  color: #fff;
  border: none;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  padding: 10px 16px;
}

.btn-primary {
  background: #fff;
  color: #000;
  border: none;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 255, 255, 0.1);
  background: #f1f5f9;
}

/* Responsive */
@media (max-width: 1024px) {
  .navbar-center { flex: 1; }
  .btn-secondary { display: none; }
}

@media (max-width: 768px) {
  .search-wrapper, .voice-btn { display: none; }
  .navbar { padding: 0 1rem; }
}
</style>