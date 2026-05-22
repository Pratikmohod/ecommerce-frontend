
export const saveTokens = (token) =>{
    localStorage.setItem('access_token',token.access)
    localStorage.setItem('refresh_token',token.refresh)
};


export const clearTokens = () =>{
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
};
export const getAccessToken = () =>{
    return localStorage.getItem("access_token");
};

export const authFetch = (url,options = {}) =>{
    const token = getAccessToken();
    const headers = options.headers ? {...options.headers} :{};
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    };

    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
    return fetch(url,{...options,headers}); 
};