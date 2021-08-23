import React from "react";
import "./LeftSideBar.css";
const LeftSideBar = () => {
  return (
    <div className={"leftsidebar"}>
      <h2>Menu</h2>
      <ul>
        <li>
          <img
            src="https://img.icons8.com/material-outlined/24/000000/overview-pages-2.png"
            alt="Overview"
          />
          Overview
        </li>
        <li>
          <img
            src="https://img.icons8.com/material-outlined/24/000000/wallet-app.png"
            alt="Wallet"
          />
          Accounts
        </li>
        <li>
          <img
            src="https://img.icons8.com/material-outlined/24/000000/transaction.png"
            alt="Transactions"
          />
          Transactions
        </li>
        <li>
          <img
            src="https://img.icons8.com/material-outlined/24/000000/profit-report.png"
            alt="Report"
          />
          Reports
        </li>
        <li>
          <img
            src="https://img.icons8.com/material-outlined/24/000000/settings--v1.png"
            alt="Settings"
          />
          Settings
        </li>
      </ul>
    </div>
  );
};

export default LeftSideBar;
