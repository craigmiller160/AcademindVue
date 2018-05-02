
export const getDateString = (date = new Date()) => {
    return date.toJSON().replace(/T.*$/, '');
};

export const getLocaleString = (date = new Date()) => {
    return date.toLocaleString('en-US', {
        hour12: true,
        weekday: 'short',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const getTimeString = (time = new Date()) => {
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
