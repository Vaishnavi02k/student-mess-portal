import React from 'react';
import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

function Footer() {
  return (
    <AntFooter
      style={{
        textAlign: 'center',
        backgroundColor: '#f0f2f5',
        color: '#595959',
        padding: '16px 0',
        fontSize: '14px',
      }}
      className="dark:bg-gray-900 dark:text-gray-300"
    >
      © {new Date().getFullYear()} IIT Goa Mess Portal. All rights reserved.
    </AntFooter>
  );
}

export default Footer;
