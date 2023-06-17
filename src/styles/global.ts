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


.action-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  }
`;
