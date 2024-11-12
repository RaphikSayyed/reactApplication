export const APICall = (apiUrl, method, body = null) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (method === "POST" || method === "PUT") {
        return fetch(apiUrl, {
            method: method,
            headers: headers,
            body: JSON.stringify(body)
        })
        .then((response) => response.json())
        .catch((error) => {
            console.error('Error:', error);
        });
    } else {
        return fetch(apiUrl, {
            method: method,
            headers: headers,
        })
        .then((response) => response.json())
        .catch((error) => {
            console.error('Error:', error);
        });
    }
};
