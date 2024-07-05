import '../styles/expense.css'
import React from 'react';
// import OnSeriesItemClick from './Charts/PieChart';



function ExpenseCategory(){
    
    return (
        <div className="card shadow card__body">
            <div className="card-body" style={{overflow: "auto", maxHeight: "18rem"}}>
                <div className="d-flex justify-content-between">
                    <h5 className="card-title"><b>Expense Category</b></h5>
                    <div className="btn-group">
                    <button type="button" className="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Duration
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Monthly</a></li>
                        <li><a className="dropdown-item" href="#">Anually</a></li>
                    </ul>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        {/* <OnSeriesItemClick /> */}
                    </div>
                </div>
            </div>
        </div>

    )
}



export default ExpenseCategory;

{/* <div className="card card__body shadow">
<div className="card-body">
    <h5 className="card-title"><b>Expense Category</b></h5>
    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    
</div>
</div> */}