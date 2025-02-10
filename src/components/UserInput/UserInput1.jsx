import React, { useState } from 'react';

const UserInput1 = () => {
    return ( 
        <form className="form">
        {/* Show fallback text if no data is available */}    
        <div className="input-group">
          <p>
            <label htmlFor="retirement-monthly-income-goal">retirement-monthly-income-goal ($)</label>
            
          </p>
          <p>
           <input type="number" id="current-savings" />
            
          </p>
          <p>
          
          <input type="number" id="retirement-monthly-income-goal" />
          </p>
        
        </div>
        {/* Show fallback text if no data is available */}
        <div className="input-group">
          <p>
            <label htmlFor="inflation-adjustment">Inflation-adjustment (%)</label>
          </p>
          <p>
           <input type="number" id="current-savings" />
          </p>
          <p>
          <input type="number" id="inflation-adjustment" />
          </p>
        </div>
        {/* ***********************************************************Show fallback text if no data is available */}
        <div className="input-group">
          <p>
            <label htmlFor="current-age">Current Age</label>
          </p>
          <p>
           <input type="number" id="current-savings" />
          </p>
          <p>
          <input type="number" id="current-age" />
          </p>
        </div>
        {/* ***********************************************************Show fallback text if no data is available */}
        <div className="input-group">
          <p>
            <label htmlFor="income-collection-from-age">Income Collection from age</label>
          </p>
          <p>
           <input type="number" id="age-col-beg" />
          </p>
          <p>
          <input type="number" id="age-col-end" />
          </p>
        </div>
        {/* ***********************************************************Show fallback text if no data is available */}
        <div className="input-group">
          <p>
            <label htmlFor="post-retirement-return-rate-on-savings">Post-retirement return rate on savings (%)</label>
          </p>
          <p>
           <input type="number" id="current-savings" />
          </p>
          <p>
          <input type="number" id="post-retirement-return-rate-on-savings" />
          </p>
        </div>
        {/* ***********************************************************Show fallback text if no data is available */}
        <p className="actions">
          <button type="reset" className="buttonAlt">
            Reset
          </button>
          <button type="submit" className="button">
            Calculate
          </button>
        </p>
      </form>
     );
}
 
export default UserInput1
