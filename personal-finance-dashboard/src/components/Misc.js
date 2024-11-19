import React from 'react';
import '../styles/misc.css';

const Misc = () => {
    return (
        <div>
            <h3>Link your bank account!</h3>
            <p>More features will be made available when you link your bank account. Dont worry!
               Your financess will still be secure and cannot be altered from dashboard.
            </p>
            <p><ul>
                <li><a href="https://www.wellsfargo.com/signon/" target="_blank" rel="noopener noreferrer">Wells Fargo</a></li>
                <li><a href="https://mortgageapply.usbank.com/#/" target="_blank" rel="noopener noreferrer">US Bank</a></li>
                <li><a href="https://connect.glacierbank.com/login" target="_blank" rel="noopener noreferrer">Glacier Bank</a></li>
            </ul></p>
            <div className='cells'>
                <div className='Mcell'>
                    <h3>Recent Transactions</h3>
                    <p>Link your account to activate this feature.</p>
                </div>
                <div className='Mcell'>
                    <h3>Statements</h3>
                    <p>Link your account to activate this feature.</p>
                </div>
                <div className='Mcell'>
                    <h3>Yearly Summary</h3>
                    <p>Link your account to activate this feature.</p>
                </div>
                <div className='Mcell'>
                    <h3>Savings Account</h3>
                    <p>Link your account to activate this feature.</p>
                </div>
            </div>
        </div>
    );
};

export default Misc;
