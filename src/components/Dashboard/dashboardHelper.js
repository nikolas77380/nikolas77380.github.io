import moment from 'moment';

export const createData = ({ id,first_name, last_name, country, preferred_teaching_destination_one, preferred_teaching_destination_two, order_date }) => {
    const currentDate = moment.unix(order_date).format("MM DD YYYY");
    return { id, first_name, last_name, country, preferred_teaching_destination_one, preferred_teaching_destination_two, date: currentDate };
}