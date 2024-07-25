import axios from 'axios';

const IS_DEVELOPMENT = import.meta.env.VITE_IS_DEVELOPMENT;
let baseURL = '';




if (IS_DEVELOPMENT === 'True') {
   baseURL = 'http://127.0.0.1:8000/'
} else {
    baseURL = 'https://python-uat.oyefin.com/'
}






const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 20000,
    headers: {
        Authorization: localStorage.getItem('access_token')
            ? 'Bearer ' + localStorage.getItem('access_token')
            : null,
        "Content-Type": "application/json",
        Accept: 'application/json',
    }
});



// If the user is Unauthorize then redirect to Signin page
// axiosInstance.interceptors.response.use(
//     // (response) => {
//     //     return response
//     // },

//     async function (error) {
//         // const originalRequest = error.config;

//         if (error.response.data === 'Unauthorized') {
//             window.location.href = '/signin/';
//             return Promise.reject(error);
//         }

        // if (error.response.statusText === 'Unauthorized') {
        //     window.location.href = '/signin/';
		// 	return Promise.reject(error);
        // }
//     }
// );



// axiosInstance.interceptors.response.use(
// 	(response) => {
// 		return response;
// 	},
// 	async function (error) {
// 		const originalRequest = error.config;

// 		if (typeof error.response.data === 'Unauthorized') {
// 			alert(
// 				'A server/network error occurred. ' +
// 					'Looks like CORS might be the problem. ' +
// 					'Sorry about this - we will get it fixed shortly.'
// 			);
// 			return Promise.reject(error);
// 		}

// 		if (
// 			error.response.status === 401 &&
// 			originalRequest.url === baseURL + 'api/v1/token/'
// 		) {
// 			window.location.href = '/signin/';
// 			return Promise.reject(error);
// 		}

// 		if (
// 			error.response.data === 'Unauthorized' &&
// 			error.response.status === 401 &&
// 			error.response.statusText === 'Unauthorized' && 
// 			error.message === 'Request failed with status code 401' 
// 		) {
// 			const refreshToken = localStorage.getItem('refresh_token');

// 			if (refreshToken) {
// 				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

// 				// exp date in token is expressed in seconds, while now() returns milliseconds:
// 				const now = Math.ceil(Date.now() / 1000);
// 				console.log(tokenParts.exp);

// 				if (tokenParts.exp > now) {
// 					return axiosInstance
// 						.post('/api/v1/token/', { refresh_token: refreshToken })
// 						.then((response) => {
// 							localStorage.setItem('access_token', response.data.access);
// 							localStorage.setItem('refresh_token', response.data.refresh);

// 							axiosInstance.defaults.headers['Authorization'] =
// 								'Bearer ' + response.data.access_token;
// 							originalRequest.headers['Authorization'] =
// 								'Bearer ' + response.data.access_token;

// 							return axiosInstance(originalRequest);
// 						})
// 						.catch((err) => {
// 							console.log(err);
// 						});
// 				} else {
// 					console.log('Refresh token is expired', tokenParts.exp, now);
// 					window.location.href = '/signin/';
// 				}
// 			} else {
// 				console.log('Refresh token not available.');
// 				window.location.href = '/signin/';
// 			}
// 		}

// 		// specific error handling done elsewhere
// 		return Promise.reject(error);
// 	}
// );





// export const refreshAccessToken = async () => {
//     const refreshToken = localStorage.getItem('refresh_token');
// 	// console.log(typeof(refreshToken))

//     if (refreshToken) {
//         const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

//         const now = Math.ceil(Date.now() / 1000);

//         // if (tokenParts.exp > now) {
//             try {
//                 const response = await axiosInstance.post('api/v1/token/', 
// 				          { refresh_token: refreshToken }).then((res)=> {

// 					localStorage.setItem('access_token', res.data.access_token)
// 					localStorage.setItem('refresh_token', res.data.refresh_token)

// 					axiosInstance.defaults.headers['Authorization'] =
// 						'Bearer ' + response.data.access_token;
// 					// originalRequest.headers['Authorization'] =
// 					// 	'Bearer ' + response.data.access_token;

// 					// console.log('Access token refreshed');
// 					// return axiosInstance(originalRequest);
// 				})                

//             } catch (error) {
//                 console.log('Failed to refresh access token', error.response);
//                 window.location.href = '/signin/';
//             }
//         } 
		// else {
        //     console.log('Refresh token is expired', tokenParts.exp, now);
        //     window.location.href = '/signin/';
        // }
    // } else {
    //     console.log('Refresh token not available.');
    //     window.location.href = '/signin/';
    // }
// };

export default axiosInstance;

