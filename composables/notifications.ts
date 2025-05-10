export const useAlert = () => {
    return useState('customAlert', () => false);
}

export const showAlert = () => {
    useAlert().value = true;
    setTimeout(() => {
        useAlert().value = false;
    }, 3000);
}