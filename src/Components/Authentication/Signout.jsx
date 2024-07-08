import axiosInstance from "./axios";



function Signout(){
		const defaultWallet = 'UserSelectedWalletID'

		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i)
			if (key != defaultWallet) {
				localStorage.removeItem(key)

				i--;
			}
		};

		axiosInstance.defaults.headers['Authorization'] = null;
	
        window.location.href = '/signin/'
    
};


export default Signout;