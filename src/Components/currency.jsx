


function Currency(){ 
    return (
        <div className="card shadow w-100 h-100">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h5 className="card-title"><b>Currency</b></h5>
                   
                    <div className="btn-group">
                        <button type="button" className="btn btn-light">1</button>
                        <button type="button" className="btn btn-light dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className="visually-hidden">Toggle Dropdown</span>
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">CNY</a></li>
                            <li><a className="dropdown-item" href="#">USD</a></li>
                            <li><a className="dropdown-item" href="#">Rupaiah</a></li>
                        </ul>
                    </div>
                   
                </div>
              
            </div>
        </div>
    )
}


export default Currency;

