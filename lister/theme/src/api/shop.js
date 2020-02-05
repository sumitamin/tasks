import _cities from './cities.json'

const TIMEOUT = 100;

export default {
    getCities: (cb, timeout) => setTimeout(() => cb(_cities), timeout || TIMEOUT)
}