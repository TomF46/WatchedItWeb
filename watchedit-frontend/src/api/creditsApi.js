import client from './client';

export function getCreditById(id) {
    return client
        .get(`/api/credits/${id}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error.response;
        });
}

export function getCreditsForFilmById(id) {
    return client
        .get(`/api/films/${id}/credits`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error.response;
        });
}

export function getCreditsForPersonById(id) {
    return client
        .get(`/api/people/${id}/credits`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error.response;
        });
}

export function addCreditForFilm(id, credit) {
    return client
        .post(`/api/films/${id}/credits`, credit)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error.response;
        });
}

export function addCreditForPerson(id, credit) {
    return client
        .post(`/api/people/${id}/credits`, credit)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error.response;
        });
}

export function removeCredit(id) {
    return client
        .delete(`/api/credits/${id}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error.response;
        });
}

export function updateCredit(id, credit) {
    return client
        .put(`/api/credits/${id}`, credit)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error.response;
        });
}