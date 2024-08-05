import CryptoJS from 'crypto-js';


// Encode the input sha256 format
const calculateSha256 = (data) => {
    const sha256Hash = CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
    return sha256Hash
  };


export default calculateSha256;