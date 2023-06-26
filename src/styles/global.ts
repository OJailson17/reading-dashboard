'use client';

import { createGlobalStyle } from 'styled-components';
import { device } from './endpoints';

export const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #292738;
  color: white;
}

button {
  cursor: pointer;
}

.ant-dropdown {
  background: #292738;
  width: 150px;
}

.ant-dropdown-menu {
  background: #292738;
  text-align: center;
}

/* .ant-picker-panel-container .ant-picker-panel-layout {
  background-color: red;
  color: white;
} */

/* .ant-picker-panels {
  @media ${device.mobileS} {
    flex-direction: column;
  }
} */

.ant-picker-dropdown {
  left: 0 !important;


  .ant-picker-range-wrapper {
    align-items: center;
    justify-content: center;
  }
}

@media (max-width: 485px) {
  .ant-picker-panels {
    flex-direction: column;
  }
  
  
    .ant-calendar-range {
        width: 320px;
    }
    .ant-calendar-range-part {
        width: 100%;
    }
}

.ant-picker-panel-layout {
  background: #292738;

  .ant-picker-header {

    button {
      color: white;

      &:hover {
        color: #1677ff;
      }
    }
  }

  table thead tr th {
    color: #1677ff !important;
  }

  table tbody tr td {
    color: white !important;
  }

  table tbody tr td:not(.ant-picker-cell-in-view) {
    color: #999999 !important;
  }
}




.action-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  }

`;
