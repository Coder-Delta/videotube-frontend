import { reactive } from 'vue';

export const toastState = reactive({
    show: false,
    message: '',
    type: 'success', // success, error, info
    timeout: null
});

export const showToast = (message, type = 'success', duration = 3000) => {
    toastState.message = message;
    toastState.type = type;
    toastState.show = true;

    if (toastState.timeout) {
        clearTimeout(toastState.timeout);
    }

    toastState.timeout = setTimeout(() => {
        toastState.show = false;
    }, duration);
};
