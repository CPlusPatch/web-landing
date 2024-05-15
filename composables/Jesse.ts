export const useJesse = () => {
    const isJesse = ref(false);

    const { j_e_s_s_e } = useMagicKeys();

    watchEffect(() => {
        if (j_e_s_s_e.value) {
            isJesse.value = !isJesse.value;
        }
    });

    return isJesse;
};
