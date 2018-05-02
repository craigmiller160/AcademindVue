
export const getDateString = (date) => {
    if (!date) {
        date = new Date();
    }

    return date.toJSON().replace(/T.*$/, '');
};

export const getTimeString = (time) => {
    if (!time) {
        time = new Date();
    }

    return time.toJSON().replace(/^.*T/, '').replace(/\.\d\d\dZ$/, '');
};

export const createDate = (dateString, timeString) => {
    if (dateString && timeString) {
        return new Date(`${dateString}T${timeString}`);
    }
    else if (dateString) {
        return new Date(dateString);
    }
    else if (timeString) {
        return new Date(`${getDateString()}T${timeString}`);
    }
    else {
        return new Date();
    }
};
