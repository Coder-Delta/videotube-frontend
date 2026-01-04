<script setup>
const year = new Date().getFullYear();
</script>

<template>
    <footer class="footer">
        <!-- Top section -->
        <div class="footer-top">
            <div class="footer-brand">
                <h3>Videotube</h3>
                <p>Stream, upload, and share videos seamlessly.</p>
            </div>

            <nav class="footer-links">
                <a href="#">Home</a>
                <a href="#">Trending</a>
                <a href="#">Subscriptions</a>
                <a href="#">Library</a>
            </nav>
        </div>

        <!-- Bottom section -->
        <div class="footer-bottom">
            © {{ year }} Videotube. All rights reserved.
        </div>
    </footer>
</template>

<style scoped>
/* Footer container */
.footer {
    margin-top: 40px;
    background-color: #0f172a;
    color: #e5e7eb;
}

/* Top section */
.footer-top {
    padding: 32px 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 24px;
    border-bottom: 1px solid #1e293b;
}

/* Brand */
.footer-brand h3 {
    margin: 0;
    font-size: 20px;
}

.footer-brand p {
    margin-top: 8px;
    font-size: 14px;
    color: #9ca3af;
}

/* Links */
.footer-links {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.footer-links a {
    color: #cbd5f5;
    text-decoration: none;
    font-size: 14px;
}

.footer-links a:hover {
    color: #ffffff;
}

/* Bottom */
.footer-bottom {
    padding: 16px;
    text-align: center;
    font-size: 13px;
    color: #9ca3af;
}
</style>
