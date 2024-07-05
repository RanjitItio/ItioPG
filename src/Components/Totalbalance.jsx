import '../styles/totalbalance.css'


function TotalBalance() {
   return (
      <div className="card shadow">
         <div className="card-body">
            <div className="d-flex justify-content-between">
               <h5 className="card-title"><b>Total Balance</b></h5>
                  <div className="btn-group">
                     <button type="button" className="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                     <i className="bi bi-credit-card-2-back" style={{color: "red"}}></i>
                     ****7189
                     </button>
                     <ul className="dropdown-menu">
                        <li>
                           <a className="dropdown-item" href="#">
                              <i className="bi bi-credit-card-2-back" style={{color: "red"}}></i>
                              ****9876
                           </a>
                        </li>
                        <li>
                           <a className="dropdown-item" href="#">
                              <i className="bi bi-credit-card-2-back" style={{color: "red"}}></i>
                              ****9876
                           </a>
                        </li>
                        <li>
                           <a className="dropdown-item" href="#">
                              <i className="bi bi-credit-card-2-back" style={{color: "red"}}></i>
                              ****9876
                           </a>
                        </li>
                     </ul>
                  </div>
            </div>
            &nbsp;

            <h2 className="card-subtitle mb-2"><b>$12,456,315</b></h2>
               <br></br>
            <div className="d-flex justify-content-between">
               <a className="btn p-2 transfer_receiver_btn" href="#" role="button" >
                  <b>Transfer</b>
                  &nbsp;
                  <i className="bi bi-box-arrow-in-up"></i>
               </a>
               &nbsp;
               <a className="btn p-2 transfer_receiver_btn" href="#" role="button" >
                  <b>Receive</b>
                     &nbsp;
                  <i className="bi bi-box-arrow-down"></i>
               </a>
            </div>
         </div>
      </div>

      );
}


export default TotalBalance;

