
const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if (localStorage.getItem('accessToken')) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'))
    }

    const defaults = { headers: headers };

    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response => response.json().then(data => {

            if (!response.ok) {
                return Promise.reject(data);
            }
            return data;
        })
        );
};

export function getCurrentUser(){
    if(!localStorage.getItem("accessToken")){
        return Promise.reject("No access token provided.");
    }
    return request({
        url: 'http://localhost:8083/api/user/me',
        method: 'GET'
    });
}

export function login(loginRequest){
    return request({
        url:'http://localhost:8083/api/auth/signin',
        method:'POST',
        body:JSON.stringify(loginRequest)
    })

}

export function signup(signupRequest) {
    return request({
        url: 'http://localhost:8083/api/auth/signup',
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}
