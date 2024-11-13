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
                <li><link href='https://connect.secure.wellsfargo.com/auth/login/present?origin=cob&LOB=CONS&_gl=1*uxyquy*_ga*Njc4OTA4NzEyLjE3MzE1MTg1NzE.*_ga_7JXJJ2JF12*MTczMTUxODU3MS4xLjAuMTczMTUxODU3MS42MC4wLjA.'>
                Wells Fargo</link></li>
                <li><link href='https://secure.bankofamerica.com/login/sign-in/signOnV2Screen.go'>Bank Of America</link></li>
                <li><link href='https://connect.glacierbank.com/login'>Glacier Bank</link></li>
            </ul></p>
            <div className='cells'>
                <div className='cell'>
                    <h3>Recent Transactions</h3>
                    <p>Link your account to activate this feature</p>
                </div>
                <div className='cell'>
                    <h3>Recent Transactions</h3>
                    <p>Link your account to activate this feature</p>
                </div>
                <div className='cell'>
                    <h3>Recent Transactions</h3>
                    <p>Link your account to activate this feature</p>
                </div>
            </div>
        </div>
    );
};

export default Misc;
