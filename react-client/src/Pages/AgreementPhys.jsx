import React from 'react';

function AgreementPhys() {
  return (
    <div className="AgreementPhys">
      <h2>Physical User Agreement</h2>
        Please confirm that the User agreement has been signed physically:
      <form>
      <br/>
        <label>
          <input
            type="checkbox"
            required
          />
          I confirm that the User agreement has been signed physically.<br/>
        </label>
        <br />
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </form>
    </div>
  );
}

export default AgreementPhys;
