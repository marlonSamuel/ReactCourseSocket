import moment from "moment";


export const horaMes = (fecha) => {
    const hoymes = moment( fecha );

    return hoymes.format('HH:mm a | MMMM Do');
}