export default function request(url, method = "GET", body) {
    const config = {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    return fetch(url, config)
        .then((res) => res.json())
        .then(response => {
            if (response.error) {
                throw new Error(response.error);
            }
            return response;
        });

}