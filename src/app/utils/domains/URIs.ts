export const API_URL = "http://localhost:3123/";

export const API_URL_RESERVATION = API_URL + 'reservation/';

export const API_GET_ALL_RESERVATIONS = 'getAll';
export const API_GET_RESERVATION_BY_ID = (idReservacion: number) => `${API_URL_RESERVATION}get/${idReservacion}`;
export const API_CREATE_RESERVATION = API_URL_RESERVATION + 'create';
export const API_UPDATE_RESERVATION = API_URL_RESERVATION + 'update';
export const API_DELETE_RESERVATION = API_URL_RESERVATION + 'delete';

export const API_PAGINATE_RESERVATIONS = API_URL_RESERVATION + 'paginate';
export const API_UPDATE_PRICE_BY_FUNCTION = API_URL_RESERVATION + 'price/function';
export const API_UPDATE_PRICE_BY_PERSON = API_URL_RESERVATION + 'price/person';
export const API_COUNT_RESERVATIONS_BY_FUNCTION = (idFuncion: number) => `${API_URL_RESERVATION}count/${idFuncion}`;
export const API_GET_SEATS_BY_RESERVATION = (idReservacion: number) => `${API_URL_RESERVATION}seats/${idReservacion}`;
export const API_ADD_SEATS_TO_RESERVATION = API_URL_RESERVATION + 'seats/add';
export const API_DELETE_SEAT_FROM_RESERVATION = (idReservacion: number, idSilla: number) => `${API_URL_RESERVATION}seats/${idReservacion}/${idSilla}`;
export const API_ADD_PRODUCT_TO_RESERVATION = API_URL_RESERVATION + 'products/add';
export const API_GET_PRODUCTS_BY_RESERVATION = (idReservacion: number) => `${API_URL_RESERVATION}products/${idReservacion}`;
export const API_DELETE_PRODUCT_FROM_RESERVATION = (idReservacion: number, idProducto: number) => `${API_URL_RESERVATION}products/${idReservacion}/${idProducto}`;
export const API_UPDATE_ALL_PRICES = (precio: number) => `${API_URL_RESERVATION}price/${precio}`;
export const API_DELETE_RESERVATIONS_BY_FUNCTION = (idFuncion: number) => `${API_URL_RESERVATION}function/${idFuncion}`;



export const API_GET_SALAS = API_URL + 'api/salas/getall';

export const API_GET_SALAS_BY_CINES = API_URL + 'api/salas/getall/cine'

export const API_CREATE_SALA = API_URL + 'api/salas/create';

export const API_DELETE_SALA = API_URL + 'api/salas/delete';