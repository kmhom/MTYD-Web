import React, { Component } from "react";

export class Right extends Component {
  render() {
    return (
      <div className='rightpanel'>
        <div className='form1'>
          Returning Users
          <br />
          <br />
          <input type='text' placeholder='Email' />
          <br />
          <input type='text' placeholder='Password' />
          <br />
          <button type='submit'>Login</button>
        </div>
        <div className='form2'>
          New Users
          <br />
          <br />
          <input type='text' placeholder='Email' />
          <br />
          <input type='text' placeholder='Password' />
          <br />
          <input type='text' placeholder='Re-enter Password' />
          <br />
          <button type='submit'>Create Account</button>
        </div>
      </div>
    );
  }
}

export default Right;
