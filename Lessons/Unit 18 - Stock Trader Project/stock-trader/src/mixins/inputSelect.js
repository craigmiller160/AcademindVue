export default {
    methods: {
        selectInputContents(event) {
            event.target.select();
        },
        restoreInputDefault(event, defaultValue) {
            if (!event.target.value) {
                event.target.value = defaultValue;
            }
        }
    }
};
