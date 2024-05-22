import moment from 'moment';

export const convertTimeFormat = (inputTime) => {
    return moment(inputTime).format('YYYY/MM/DD');
};
