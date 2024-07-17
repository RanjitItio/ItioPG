import React, { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';





const MasterCardOTPComponent = ({sessionID, transactionID}) => {

  const merchantID = import.meta.env.VITE_MASTERCARD_MERCHANT_ID
  // const merchantID = 'GLADCORIGKEN'

  // let sessionID = sessionID
  // let transactionID = transactionID

  // if (states) {
  //     sessionID = states.session,
  //     transactionID = states.transactionID
  // };


 
  useEffect(() => {
    
    const script = document.createElement('script');
    script.src = 'https://ap-gateway.mastercard.com/static/threeDS/1.3.0/three-ds.min.js';

    script.onload = () => {
      if (ThreeDS) {
          ThreeDS.configure({

          merchantId: merchantID,
          sessionId: sessionID,
          containerId: '3DSUI',

          callback: function () {
            if (window.ThreeDS.isConfigured()) {
              console.log('Done with configure');
            } else {
              console.error('3DS not configured');
            }
          },
          configuration: {
            userLanguage: 'en-US',
            wsVersion: 78
          }
        });

        const optionalParams = {
          fullScreenRedirect: true,
          billing: {
            address: {
              city: 'London',
              country: 'GBR'
            }
          }
        };
        
        window.ThreeDS.authenticatePayer(transactionID, transactionID, function (data) {
          //  console.log(data)
          if (!data.error) {
            console.log('REST API response ', data.restApiResponse);
            console.log('HTML redirect code', data.htmlRedirectCode);
          }
        }, optionalParams);
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [merchantID, sessionID, transactionID]);

  return (
    <div id="threedsChallengeRedirect" xmlns="http://www.w3.org/1999/html" style={{ height: '100vh' }}>
     
    </div>
  );
};

export default MasterCardOTPComponent;
