// import { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/dashboard.css';
import TotalBalance from '../Totalbalance'
import ExpenseCategory from '../Expense'
import PocketPlan from '../Pocketplan'
import IncomeAnalysis from '../IncomeAnalysis'
import ExpenseAnalysis from '../ExpenseAnalysis'
import RecentActivity from '../Recentactivity'
import Currency from '../currency'
import WelcomeSection from '../welcome'
// import KYCForm from './Authentication/KYCForm'








export default function GatewayDashboard() {
    

    return (
        <>
         <WelcomeSection />
         {/* style={{ position: 'absolute', top: '18rem', left: '4.2rem' }} */}
         {/* <div className="container-fluid"> */}
            {/* {showkycForm && !formData && <Register setFormData={setFormData} />} */}
          
                {/* <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">KYC Form</h5>
                        </div>
                        <div className="modal-body"> */}
                                {/* <KYCForm closeKYCForm={handleKYCForm} registrationFormData={registrationFormData} /> */}
                        {/* </div>
                    </div>
                </div>
                </div> */}
         

           
                {/* <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Form Submission Report</h5>
                        </div>
                        <div className="modal-body">
                        <p className="text-success">Your form has been submitted successfully please wait for Admin Approval</p>
                        </div>
                    </div>
                </div>
            </div> */}
            
         
        <div>
            <div className="row">
                <div className="col-md-4 col-sm-12 col-lg-4 col-xs-12">
                    <TotalBalance />
                    <div className="row">
                        <div className="col my-2">
                            <PocketPlan />
                        </div>
                    </div>
                </div>
                <div className="col-md-8 col-sm-12 col-lg-8 col-xs-12">
                    <ExpenseCategory />
                    <div className="row">
                        <div className="col-md-6 col-sm-12 col-lg-6 col-xs-12 my-2">
                            <IncomeAnalysis />
                        </div>
                        <div className="col-md-6 col-sm-12 col-lg-6 col-xs-12 my-2">
                            <ExpenseAnalysis />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 col-sm-12 col-lg-6 col-xs-12 my-2">
                    <RecentActivity />
                </div>
                <div className="col-md-6 col-sm-12 col-lg-6 col-xs-12 my-2">
                    <Currency /> 
                </div>
            </div>

        </div>

        </>

    );
};


