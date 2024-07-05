import { Link } from 'react-router-dom';


function WelcomeSection(){
    
    return (
        
        <div style={{backgroundColor: "#0E2F44", position: "relative"}} className='pb-5'>

             <h4 className='pt-5 pb-2' style={{marginLeft: "4rem", color:"white"}}>
                <b>
                    Welcome back, Ranjit
                </b>
                <span>
                    <i className="bi bi-emoji-grin"></i>
                </span>
             </h4>
             <p style={{marginLeft: "4rem", color:"white"}}>Dashboard &gt; <b>Overview</b></p>
                <Link to='/' type="button" className="btn mt-3 " style={{marginLeft: "3.5rem", color:"whitesmoke"}}>Overview</Link>
                <Link type="button" className="btn mt-3 text-secondary-btn" to='/transaction' style={{color: 'white'}}>Transaction</Link>
                <Link to='/statistics/' type="button" className="btn mt-3 text-secondary-btn" style={{color: 'white'}}>Statitics</Link> 
               <hr style={{ width: "18rem", backgroundColor: "grey", height: "1px", marginTop: "9px", marginLeft: "3.5rem"}} className="green-line"></hr>

        </div>
    );
}



export default WelcomeSection;