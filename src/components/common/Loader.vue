<script setup>
/**
 * No logic needed for a pure CSS beautiful loader, 
 * but you could add a 'progress' prop here later!
 */
</script>

<template>
  <div class="loader-container">
    <div class="glow-sphere"></div>

    <div class="loader-content">
      <div class="visual-wrapper">
        <div class="ring outer"></div>
        <div class="ring middle"></div>
        <div class="logo-morph">
          <div class="play-shape"></div>
        </div>
      </div>

      <div class="text-wrapper">
        <h2 class="brand-name">VIDEOTUBE</h2>
        <div class="status-group">
          <span class="loading-word">LOADING</span>
          <div class="dots">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@800&family=Inter:wght@500&display=swap');

.loader-container {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0b0f1a;
  overflow: hidden;
  position: relative;
}

/* 1. Ambient Background Glow */
.glow-sphere {
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
  filter: blur(60px);
  animation: pulseGlow 4s ease-in-out infinite;
}

/* 2. Visual Rings */
.visual-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

.ring {
  position: absolute;
  border-radius: 50%;
  border: 2px solid transparent;
}

.ring.outer {
  width: 100%;
  height: 100%;
  border-top-color: #3b82f6;
  border-bottom-color: rgba(59, 130, 246, 0.1);
  animation: spin 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}

.ring.middle {
  width: 70%;
  height: 70%;
  border-left-color: #ef4444;
  border-right-color: rgba(239, 68, 68, 0.1);
  animation: spin 2s linear infinite reverse;
}

/* 3. Central Morphing Logo */
.logo-morph {
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
  animation: breath 2s ease-in-out infinite;
}

.play-shape {
  width: 0; height: 0;
  border-top: 6px solid transparent;
  border-left: 10px solid #0b0f1a;
  border-bottom: 6px solid transparent;
  margin-left: 2px;
}

/* 4. Pretty Typography */
.text-wrapper {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.brand-name {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: 4px;
  color: #fff;
  margin: 0;
  background: linear-gradient(to bottom, #fff, #64748b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.status-group {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.loading-word {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 3px;
  color: #3b82f6;
  text-transform: uppercase;
  opacity: 0.8;
}

/* 5. Animated Dots */
.dots span {
  display: inline-block;
  width: 4px;
  height: 4px;
  background-color: #3b82f6;
  border-radius: 50%;
  margin: 0 2px;
  animation: dotFlashing 1.4s infinite linear;
}

.dots span:nth-child(2) { animation-delay: 0.2s; }
.dots span:nth-child(3) { animation-delay: 0.4s; }

/* 6. Keyframes */
@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes breath {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(0.9); opacity: 0.8; }
}

@keyframes pulseGlow {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.2); opacity: 0.8; }
}

@keyframes dotFlashing {
  0% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
  100% { opacity: 0.2; transform: scale(0.8); }
}

.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>