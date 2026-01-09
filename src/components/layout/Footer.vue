<script setup>
const year = new Date().getFullYear();
</script>

<template>
  <footer class="container-fluid">
    <div class="footer-minimal">
      <small>© {{ year }} VideoTube Inc.</small>

      <nav class="footer-links">
        <a href="#" class="secondary">Terms</a>
        <a href="#" class="secondary">Privacy</a>
        <a href="#" class="secondary">Help</a>
      </nav>

      <div class="socials">
        <a href="#" aria-label="Twitter">
          <Twitter size="16" />
        </a>
        <a href="#" aria-label="YouTube">
          <Youtube size="16" />
        </a>
        <a href="#" aria-label="Instagram">
          <Instagram size="16" />
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-top: 1px solid var(--pico-muted-border-color);
  margin-top: auto;
  /* Push to bottom if flex column parent */
}

.footer-minimal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-links a {
  text-decoration: none;
  font-size: 0.875rem;
  color: var(--pico-muted-color);
}

.footer-links a:hover {
  color: var(--pico-primary);
}

.socials {
  display: flex;
  gap: 1rem;
}

.socials a {
  color: var(--pico-muted-color);
  display: flex;
  align-items: center;
}

.socials a:hover {
  color: var(--pico-color);
}

@media (max-width: 768px) {
  .footer-minimal {
    flex-direction: column;
    text-align: center;
  }
}
</style>
