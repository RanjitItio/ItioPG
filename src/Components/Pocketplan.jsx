import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'



function PocketPlan() {
    return (
        <div className="card mt-2 shadow" >
            <div className="card-body">
                <h5 className="card-title"><b>My Pocket Plans</b></h5>
                &nbsp;
                <div className="row">
                    <div className="col">
                        <div className="card rounded-4 shadow" style={{maxWidth: "18rem"}}>
                        <div className="card-body" style={{overflow: "auto", maxHeight: "100px"}}>
                            <h5 className="card-title">New Car</h5>
                            <h6 className="card-subtitle mb-2 text-muted">$1191,68</h6>
                        </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card rounded-4 shadow" style={{maxWidth: "18rem"}}>
                        <div className="card-body" style={{overflow: "auto", maxHeight: "100px"}}>
                            <h5 className="card-title">New Console</h5>
                            <h6 className="card-subtitle mb-2 text-muted">$3.094,56</h6>
                        </div>
                        </div>
                    </div>
                </div>

                &nbsp;
                <div className="row">
                    <div className="col">
                        <div className="card rounded-4 shadow" style={{maxWidth: "18rem"}}>
                        <div className="card-body" style={{overflow: "auto", maxHeight: "100px"}}>
                            <h5 className="card-title">Savings</h5>
                            <h6 className="card-subtitle mb-2 text-muted">$1.324,22</h6>
                        </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card rounded-4 shadow" style={{maxWidth: "18rem"}}>
                        <div className="card-body" style={{overflow: "auto", maxHeight: "100px"}}>
                            <h5 className="card-title">Wedding</h5>
                            <h6 className="card-subtitle mb-2 text-muted">$5.000,00</h6>
                        </div>
                        </div>
                    </div>
                </div>
                &nbsp;
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <button type="button" className="btn btn-outline-primary">Load More</button>
                    </div>
                </div>
              

            </div>
        </div>
    )
}




export default PocketPlan;