<script setup>
import { 
  Github, 
  Twitter, 
  Youtube, 
  Instagram,
  ArrowRight
} from 'lucide-vue-next';

const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="footer-border-gradient"></div>

    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="brand-identity">
            <div class="logo-mark"></div>
            <span class="logo-text">VideoTube</span>
          </div>
          <p class="brand-description">
            Experience the next generation of video streaming. Fast, immersive, and built for creators.
          </p>
          <div class="social-row">
            <a href="#" class="social-link"><Twitter :size="18" /></a>
            <a href="#" class="social-link"><Youtube :size="18" /></a>
            <a href="#" class="social-link"><Instagram :size="18" /></a>
            <a href="#" class="social-link"><Github :size="18" /></a>
          </div>
        </div>

        <div class="footer-column">
          <h4 class="column-title">Platform</h4>
          <nav class="column-links">
            <a href="#">Home</a>
            <a href="#">Trending</a>
            <a href="#">Creator Studio</a>
            <a href="#">Premium Plans</a>
          </nav>
        </div>

        <div class="footer-column">
          <h4 class="column-title">Support</h4>
          <nav class="column-links">
            <a href="#">Help Center</a>
            <a href="#">Community Guidelines</a>
            <a href="#">Safety Center</a>
            <a href="#">Terms of Service</a>
          </nav>
        </div>

        <div class="footer-newsletter">
          <h4 class="column-title">Stay Updated</h4>
          <p class="newsletter-text">Get the latest feature updates and creator tips.</p>
          <div class="newsletter-form">
            <input type="email" placeholder="Email address" class="newsletter-input" />
            <button class="newsletter-btn">
              <ArrowRight :size="18" />
            </button>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright">
          &copy; {{ year }} <span class="highlight">VideoTube Inc.</span> Crafted with passion for the web.
        </p>
        <div class="bottom-legal">
          <a href="#">Privacy Policy</a>
          <span class="dot"></span>
          <a href="#">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.footer {
  background-color: #0b0f1a;
  color: #f8fafc;
  font-family: 'Plus Jakarta Sans', sans-serif;
  position: relative;
  overflow: hidden;
  margin-top: 80px;
}

.footer-border-gradient {
  height: 1px;
  width: 100%;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 24px 40px 24px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
  gap: 48px;
  margin-bottom: 64px;
}

/* Brand Styles */
.brand-identity {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.logo-mark {
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #ef4444, #b91c1c);
  border-radius: 6px;
}

.logo-text {
  font-weight: 800;
  font-size: 1.4rem;
  letter-spacing: -0.5px;
}

.brand-description {
  color: #94a3b8;
  font-size: 15px;
  line-height: 1.6;
  max-width: 300px;
  margin-bottom: 24px;
}

.social-row {
  display: flex;
  gap: 12px;
}

.social-link {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.social-link:hover {
  background: rgba(59, 130, 246, 0.1);
  color: #38bdf8;
  transform: translateY(-3px);
  border-color: rgba(56, 189, 248, 0.2);
}

/* Column Styles */
.column-title {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #fff;
  margin-bottom: 24px;
}

.column-links {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.column-links a {
  color: #94a3b8;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.2s ease;
  width: fit-content;
}

.column-links a:hover {
  color: #fff;
  transform: translateX(5px);
}

/* Newsletter Styles */
.newsletter-text {
  color: #94a3b8;
  font-size: 14px;
  margin-bottom: 20px;
}

.newsletter-form {
  display: flex;
  gap: 8px;
  background: rgba(255, 255, 255, 0.03);
  padding: 6px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.newsletter-input {
  background: transparent;
  border: none;
  padding: 10px 12px;
  color: #fff;
  flex: 1;
  outline: none;
  font-size: 14px;
}

.newsletter-btn {
  background: #3b82f6;
  color: #fff;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.newsletter-btn:hover {
  background: #2563eb;
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.4);
}

/* Bottom Bar */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.copyright {
  color: #64748b;
  font-size: 14px;
}

.highlight {
  color: #f8fafc;
  font-weight: 600;
}

.bottom-legal {
  display: flex;
  align-items: center;
  gap: 16px;
}

.bottom-legal a {
  color: #64748b;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.bottom-legal a:hover { color: #fff; }

.dot {
  width: 3px;
  height: 3px;
  background: #334155;
  border-radius: 50%;
}

/* Responsive Grid */
@media (max-width: 1024px) {
  .footer-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 640px) {
  .footer-grid { grid-template-columns: 1fr; }
  .footer-bottom { flex-direction: column; text-align: center; }
}
</style>