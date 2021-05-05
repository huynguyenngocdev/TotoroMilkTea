import React from "react";
import { NavLink } from "react-router-dom";
import './NotFound.css'
NotFound.propTypes = {};

function NotFound() {
  return (
    <div>
      <div className="error-bg">
        <table>
          <tbody>
            <tr>
              <td id="text1">404</td>
            </tr>
            <tr>
              <td>
                <hr />
              </td>
            </tr>
            <tr>
              <td id="text2">Bạn thấy gì không? Là màn hình đó!</td>
            </tr>
            <tr>
              <td>
                <hr />
              </td>
            </tr>
            <tr>
              <td>
                <button>
                  <NavLink to='/'>Về trang chủ</NavLink>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NotFound;
