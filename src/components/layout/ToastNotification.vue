<script setup>
import { computed } from 'vue';

const props = defineProps({
    show: Boolean,
    message: String,
    type: {
        type: String,
        default: 'success', // success, error, info
        validator: (value) => ['success', 'error', 'info'].includes(value)
    }
});

const typeClass = computed(() => {
    switch (props.type) {
        case 'success': return 'toast-success';
        case 'error': return 'toast-error';
        default: return 'toast-info';
    }
});
</script>

<template>
    <Transition name="toast-fade">
        <div v-if="show" class="toast-notification" :class="typeClass">
            <div class="toast-content">
                {{ message }}
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.toast-notification {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    color: #fff;
    font-weight: 600;
    font-size: 0.9rem;
    z-index: 10000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 200px;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.toast-success {
    background: #238636;
    /* GitHub Green */
    background: linear-gradient(135deg, #238636 0%, #2ea043 100%);
}

.toast-error {
    background: #da3633;
    background: linear-gradient(135deg, #da3633 0%, #f85149 100%);
}

.toast-info {
    background: #1f6feb;
    background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%);
}

/* Transition */
.toast-fade-enter-active,
.toast-fade-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-fade-enter-from,
.toast-fade-leave-to {
    opacity: 0;
    transform: translate(-50%, 20px);
}
</style>
