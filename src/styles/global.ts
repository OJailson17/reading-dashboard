'use client';

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #292738;
  color: white;
  overflow-x: hidden;
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

  li a {
    text-decoration: none;
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

  /* .ant-picker-body {
    padding: 8px -1px;
    
    display: flex;
    align-items: center;
    justify-content: center;
  } */

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



  @media (max-width: 485px) {
    html {
      overflow-y:auto;
    }

    .ant-dropdown {
      width: 14.5rem;
    }

    .ant-dropdown-menu {
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

        li {
          font-size: 1.1rem !important;
          width: 100%;

          a {
            text-decoration: none;
          }
        }
    }

    .ant-modal-wrap {
      position: absolute !important;
    }
    
    
  .ant-picker-dropdown {
  top: 50% !important;


  .ant-picker-range-wrapper {
    align-items: center;
    justify-content: center;
  }
}
  
  
  .ant-picker-panels {
    flex-direction: column;
  }
  
  
    .ant-calendar-range {
        min-width: 320px;
    }
    .ant-calendar-range-part {
        width: 100%;
    }
}

`;
