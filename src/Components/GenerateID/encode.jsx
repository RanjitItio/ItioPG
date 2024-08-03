import CryptoJS from 'crypto-js';


const calculateSha256 = (data) => {
    const sha256Hash = CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
    return sha256Hash
  };


export default calculateSha256;