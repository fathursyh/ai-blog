export const useAlert = () => {
    const isShow = useState('customAlert', () => false);
    const alertBody = useState<{status: number, text: string}>('alert-body', () => ({
        status: 200,
        text: '',
    }));
    return {
        isShow,
        alertBody,
    }
}

export const showAlert = (status: number, text: string) => {
    useAlert().isShow.value = true;
    useAlert().alertBody.value.status = status;
    useAlert().alertBody.value.text = text;
    setTimeout(() => {
        useAlert().isShow.value = false;
        useAlert().alertBody.value.status = 200;
        useAlert().alertBody.value.text = '';

    }, 3000);
}