class Api {
    _url;
    _headers;

    constructor(url, headers) {
        this._url = url
        this._headers = headers
    }

    checkResponse(res) {
        return new Promise((resolve, reject) => {
            if (res.status === 204) {
                return resolve(res)
            }
            const func = res.status < 400 ? resolve : reject
            res.json().then(data => func(data))
        })
    }


    // getTasks
    getTasks({
                 offset = 0,
                 limit = 10,
                 task,
                 status
             } = {}) {
        const statusString = status !== '' ? '&status=' + status.join(',') : ''
        return fetch(
            `${this._url}/api/v1/tasks?offset=${offset}${task ? `&task=${task}` : ''}${statusString}`,
            {
                mode: "no-cors",
                method: 'GET',
                headers: {
                    ...this._headers,
                }
            }
        ).then(this.checkResponse)
    }

    getTask({
                task_id
            }) {
        return fetch(
            `${this._url}/api/v1/tasks/${task_id}`,
            {
                method: 'GET',
                mode: "no-cors",
                headers: {
                    ...this._headers,
                }
            }
        ).then(this.checkResponse)
    }

    createTask({
                   task = '',
                   status = 'created',
               }) {
        return fetch(
            `${this._url}/api/v1/tasks`,
            {
                method: 'POST',
                headers: {
                    ...this._headers,
                },
                body: JSON.stringify({
                    task,
                    status
                })
            }
        ).then(this.checkResponse)
    }

    updateTask({
                   task_id,
                   value,
                   status,
               }) { // image was changed
        return fetch(
            `/api/v1/tasks/${task_id}/`,
            {
                method: 'PATCH',
                headers: {
                    ...this._headers,
                },
                body: JSON.stringify({
                    value,
                    status
                })
            }
        ).then(this.checkResponse)
    }

    deleteTask({id}) {
        return fetch(
            `/api/v1/tasks/${id}`,
            {
                method: 'DELETE',
                headers: {
                    ...this._headers,
                }
            }
        ).then(this.checkResponse)
    }
}

export default new Api('http://localhost:8080', {'content-type': 'application/json'})