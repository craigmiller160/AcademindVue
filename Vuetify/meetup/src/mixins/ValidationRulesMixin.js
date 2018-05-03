
export default {
    data() {
        return {
            requiredRule: v => !!v || 'Field is required',
            emailRule: v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        }
    }
}
