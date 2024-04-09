
// Function to get token from local storage
function getTokenFromLocalStorage() {
   let ACCESSTOKEN = JSON.parse(localStorage.getItem('userDetails') || '{}')?.accessToken || '';

    return ACCESSTOKEN;
   }
   
   
   export function Token(fetch:any) {
    return async (url:any, options:any) => {
       // Retrieve the token
       const token = getTokenFromLocalStorage(); // or getTokenFromCookies()
   
       // Attach the token to the Authorization header
       options.headers = {
         ...options.headers,
         Authorization: `Bearer ${token}`,
       };
   
       // Call the original fetch function with the modified options
       return fetch(url, options);
    };
   }
   