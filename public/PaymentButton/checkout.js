

let button_id = document.currentScript.dataset.payment_button_id

const button = document.createElement('button');


window.onload = async () => {

    try {

        const response = await fetch(`https://python-uat.oyefin.com/api/merchant/payment/fetch/button/?id=${button_id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        button.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center;">
                <img src="https://python-uat.oyefin.com/media/signup/user.png" alt="icon" style="height: 20px; margin-right: 8px;" />
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <span>${data.data[0].buttonLabel.toUpperCase()}</span>
                    <span style="font-size: 6px;">SECURED BY ITIO</span>
                </div>
            </div>
        `;

        button.style.backgroundColor = data.data[0].buttonBgColor;
        button.style.color           = data.data[0].buttonColor;
        button.style.padding         = '10px 8px';
        button.style.borderRadius    = '10px';
        button.style.textAlign       = 'center';
        button.style.textDecoration  = 'none';
        button.style.display         = 'inline-block';
        button.style.fontSize        = '10px'; 
        button.style.margin          = '4px 2px'; 
        button.style.cursor          = 'pointer'; 
        button.style.boxShadow       = '0 4px 6px rgba(0, 0, 0, 0.1)';
        button.style.border          = 'none';

        button.addEventListener('click',  (event)=> {
            event.preventDefault();
            window.location.href = `https://react-payment.oyefin.com/merchant/pg/payment/form/step/?payment_button=${button_id}`
        });

        document.querySelector('form').appendChild(button);

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    };

};






