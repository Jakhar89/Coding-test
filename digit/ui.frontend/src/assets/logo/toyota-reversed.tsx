import React from 'react';
import { withSvg } from '@/utility/components/Icon/Svg';

const Svg = () => (
  <>
    <path
      fill="#fff"
      d="M79.271 11.961h14.227v4.012h-9.676v6.103h9.205v4.011h-9.205v9.811h-4.55V11.961zM96.735 13.377c0-1.45 1.112-2.562 2.596-2.562a2.514 2.514 0 012.378 1.575c.127.314.189.65.183.987 0 1.45-1.112 2.596-2.561 2.596a2.554 2.554 0 01-2.596-2.596zm.438 5.462h4.21v17.06h-4.21v-17.06zM122.492 25.076v10.822h-4.211v-9.204c0-3-1.078-4.416-3.506-4.416-2.629 0-4.248 1.753-4.248 4.517v9.103h-4.21v-17.06h4.21v2.8c1.214-2.058 3.405-3.17 5.933-3.17 3.942 0 6.032 2.326 6.032 6.608zM141.881 25.144v10.754h-4.18v-2.36c-1.083 1.552-3.14 2.73-5.771 2.73-3.338 0-5.529-1.92-5.529-5.09 0-3.978 3.506-5.461 11.26-5.563v-.336c0-2.023-1.18-3.305-3.776-3.305-2.296 0-4.079.944-5.327 1.787l-.978-3.338c1.619-1.011 4.115-1.921 7.047-1.921 4.384 0 7.254 2.023 7.254 6.642zm-4.21 4.21v-1.148c-5.159.101-6.878.876-6.878 2.73 0 1.349.944 2.192 2.664 2.192 2.049.006 4.206-1.14 4.206-3.77l.008-.004zM162.847 25.076v10.822h-4.21v-9.204c0-3-1.079-4.416-3.506-4.416-2.63 0-4.248 1.753-4.248 4.517v9.103h-4.21v-17.06h4.21v2.8c1.213-2.058 3.405-3.17 5.933-3.17 3.941 0 6.031 2.326 6.031 6.608zM166.522 27.434c0-5.327 3.844-8.934 8.968-8.934 2.495 0 4.45.775 5.765 1.651l-1.244 3.575c-1.078-.776-2.561-1.417-4.21-1.417-2.865 0-4.855 2.057-4.855 5.058 0 3 1.888 5.057 4.821 5.057 1.552 0 3.271-.607 4.653-1.483l1.045 3.506c-1.483 1.011-3.573 1.786-6.069 1.786-5.199.005-8.874-3.57-8.874-8.798zM200 28.279h-12.508c.27 2.865 2.225 4.417 5.192 4.417 2.225 0 4.18-.776 5.495-1.788l1.046 3.304c-1.551 1.148-3.944 2.023-6.979 2.023-5.428 0-9.036-3.742-9.036-8.833 0-5.263 3.709-8.9 8.598-8.9 4.922 0 8.192 3.642 8.192 9.137v.64zm-4.281-2.866c-.304-2.157-1.855-3.642-3.911-3.642-2.091 0-3.676 1.45-4.181 3.642h8.092zM34.948 37.263a5.273 5.273 0 00-5.293 5.29c-.008 2.894 2.35 5.253 5.293 5.294 2.87-.04 5.235-2.4 5.293-5.293-.058-2.928-2.418-5.285-5.293-5.291zm0 8.632c-1.654-.028-2.975-1.518-2.922-3.343-.053-1.86 1.268-3.35 2.922-3.344 1.59-.008 2.907 1.483 2.923 3.344-.016 1.825-1.333 3.315-2.923 3.343zM49.288 37.68h-8.491v1.809H44v8.075h2.225v-8.075h3.062v-1.81zM52.634 37.68l-4.177 9.883h2.645l.83-2.228h4.041l.84 2.228h2.64l-4.038-9.884h-2.781zm0 5.986l1.39-3.622 1.391 3.622h-2.781zM0 39.489h3.065v8.075h2.227v-8.075h3.062v-1.81H0v1.81zM14.201 37.263a5.288 5.288 0 00-5.29 5.29c0 2.894 2.363 5.253 5.29 5.294a5.388 5.388 0 005.292-5.293c-.041-2.928-2.402-5.285-5.292-5.291zm0 8.632c-1.643-.028-2.958-1.518-2.92-3.343-.038-1.86 1.277-3.35 2.92-3.344 1.609-.008 2.927 1.483 2.927 3.344 0 1.825-1.318 3.315-2.927 3.343zM24.506 41.858l-2.367-4.179h-2.647l3.9 6.126v3.758h2.227v-3.758l3.9-6.126h-2.506l-2.507 4.179zM29.721 33.431h.011c14.103 0 25.74-7.043 25.826-16.565C55.654 7.331 43.979.073 29.726 0 15.474.073 3.8 7.33 3.896 16.866c.09 9.522 11.722 16.565 25.825 16.565zm.012-7.06h-.012c-1.978 0-3.827-4.361-3.966-9.577 0 0 .566.058 1.313.095.799.041 1.806.066 2.555.067h.205c.749 0 1.756-.026 2.556-.067a29.166 29.166 0 001.312-.095c-.136 5.216-1.984 9.577-3.964 9.577h.001zm-3.607-13.693c.62-3.674 2.022-6.243 3.595-6.243h.011c1.572 0 2.976 2.57 3.594 6.243a43.515 43.515 0 01-3.598.153c-1.232 0-2.458-.053-3.602-.153zm22.929-3.89c1.956 2.143 3.035 4.793 2.814 8.042-.522 7.686-8.851 13.921-19.904 14.626 2.326-2.168 4.238-7.398 4.238-13.906 0-.352.004-.692 0-1.036 8.684-1.28 12.255-5.048 12.852-7.727zm-19.33-6.603h.007c8.28 0 14.806 2.499 14.806 5.34 0 2.164-3.57 4.02-8.748 4.847-.918-5.579-3.283-9.551-6.058-9.567-2.775.016-5.146 3.988-6.065 9.564-5.175-.827-8.748-2.68-8.748-4.847-.005-2.84 6.522-5.34 14.802-5.34l.004.003zM10.402 8.787c.597 2.68 4.167 6.448 12.855 7.727-.01.344 0 .684 0 1.036 0 6.507 1.913 11.738 4.235 13.906-11.05-.705-19.378-6.94-19.904-14.626-.224-3.249.856-5.9 2.814-8.043z"
    ></path>
  </>
);

export default withSvg(200, 48)(Svg);