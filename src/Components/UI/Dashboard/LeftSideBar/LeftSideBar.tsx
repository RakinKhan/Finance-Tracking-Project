import React from "react";
import { Link } from "react-router-dom";
import "./LeftSideBar.css";
const LeftSideBar = () => {
  return (
    <div className={"leftsidebar"}>
      <h2>Menu</h2>
      <ul>
        <li>
          <Link to="/dashboard/overview"><img
            src="https://img.icons8.com/material-outlined/24/000000/overview-pages-2.png"
            alt="Overview"
          />
          Overview
          </Link>
        </li>
        <li>
          <Link to='/dashboard/accounts'>
          <img
            src="https://img.icons8.com/material-outlined/24/000000/wallet-app.png"
            alt="Wallet"
          />
          Accounts
          </Link>

        </li>
        <li>
          <Link to='/dashboard/transactions'>
          <img
            src="https://img.icons8.com/material-outlined/24/000000/transaction.png"
            alt="Transactions"
          />
          Transactions
          </Link>
        </li>
        <li>
          <Link to='/dashboard/reports'>
          <img
            src="https://img.icons8.com/material-outlined/24/000000/profit-report.png"
            alt="Report"
          />
          Reports
          </Link>
        </li>
        <li>
          <Link to='/dashboard/settings'>
          <img
            src="https://img.icons8.com/material-outlined/24/000000/settings--v1.png"
            alt="Settings"
          />
          Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default LeftSideBar;
