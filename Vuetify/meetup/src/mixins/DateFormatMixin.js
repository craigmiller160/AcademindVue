import * as dateUtil from '@/util/Date';

export default {
    filters: {
        dateFormat(date) {
            return dateUtil.getLocaleString(date);
        }
    }
}
