import React, { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { withSvg } from '@/utility/components/Icon/Svg';

const Svg = () => {
  const randomId = useMemo(() => uuidv4(), []);
  return (
    <>
      <path d="M32.8008 4C32.4414 4 32.0508 4.1875 31.8282 4.41406C31.6094 4.64062 31.5078 4.875 31.4375 5.08594C31.2891 5.51562 31.2578 5.92188 31.2383 6.35156C31.1953 7.20703 31.2422 8.15625 31.2032 8.61719C31.1016 9.82422 30.8438 11.418 30.4649 11.8867C30.2813 11.7305 30.0625 11.5469 30.0078 11.4922L29.9688 11.4531L29.9219 11.4219C29.0274 10.7031 28.1836 10.0781 27.5508 9.46484C27.6016 9.30469 27.6524 9.14453 27.6524 9C27.6524 8.94922 27.6211 8.88672 27.6133 8.83203C27.6836 8.80469 27.668 8.83594 27.75 8.79688L27.8008 8.76562L27.8555 8.73438C28.4532 8.33203 28.8907 7.54688 28.4961 6.75L28.4219 6.60938L28.3086 6.49219C27.9727 6.15625 27.6328 6 27.0977 6C26.1602 5.90234 25.168 5.94922 24.6719 5.83203C24.5117 5.72266 24.3946 5.51563 24.2344 5.46484C23.8438 5.34375 23.4883 5.34375 23.1719 5.38281C22.8594 5.41797 22.5821 5.49219 22.336 5.58594C22.3242 5.58984 22.3125 5.59766 22.3008 5.60156C22.1875 5.53125 22.0664 5.45312 21.9102 5.375C21.8203 5.32812 21.7227 5.27734 21.5664 5.23438C21.4453 5.20312 21.1953 5.21875 20.9258 5.28906C20.75 5.32812 20.5664 5.34375 20.4102 5.46094C20.1758 5.64844 20.0508 5.88672 19.9883 6.07031C19.8672 6.4375 19.9024 6.65234 19.9024 6.80078V6.80469C19.2657 7.19141 18.8008 7.73828 18.5977 8.35156C18.5821 8.40625 18.5977 8.46484 18.5821 8.52344C18.1992 8.28125 17.7852 7.97266 17.0977 7.90625L17.0508 7.89844H17C16.086 7.89844 15.3086 8.30469 14.7344 8.85938C14.0977 9.40625 13.9336 9.85156 13.7344 10.1914C13.5039 10.0664 13.2617 9.92188 13.0508 9.9375C12.7578 9.95703 12.5469 10.0586 12.375 10.168C12.0313 10.3867 11.7969 10.6484 11.6524 11.082L11.5977 11.2383V11.4023C11.5977 11.2656 11.6055 11.3516 11.5039 11.5508L11.4727 11.6172L11.4532 11.6836C11.3633 11.9531 11.2227 12.3242 11.0664 12.6523C10.9141 12.9805 10.7149 13.2695 10.6914 13.293C10.3282 13.6562 9.75003 13.832 9.02347 14.0391L9.00393 14.0469L8.9844 14.0508C7.43753 14.5664 6.26565 15.1016 4.93753 15.8125C4.4844 16.043 4.06643 16.3203 3.69534 16.6914L3.66409 16.7188L3.64065 16.75C2.69925 17.8477 2.89456 19.2656 3.26565 20.25C3.3594 20.5391 3.44143 20.793 3.53128 21.1406C3.53909 21.1758 3.53909 21.1562 3.5469 21.1602C3.05862 21.6914 2.95315 22.4141 3.0469 22.8711C3.14065 23.3477 3.38675 23.6836 3.38675 23.6836L3.32034 23.5781C4.39846 25.5664 4.35159 27.1055 3.97659 29.4922C3.85159 29.5586 3.70315 29.5977 3.6094 29.6836C3.2305 30.0078 2.96487 30.5391 3.03128 31.1641C3.06253 31.7305 3.34768 32.1484 3.65628 32.418C3.98831 32.7031 4.36721 32.8945 4.80471 32.9805L4.89846 33H5.50003C6.40628 33 7.20315 32.6875 7.9219 32.3867C8.64456 32.082 9.30081 31.7812 9.74222 31.6719L9.85159 31.6406L9.94534 31.5938C10.5 31.3164 10.9102 31.1602 11.2813 31.0859C11.668 31.0234 12.1953 31.0977 12.9024 31.0977C13.7227 31.0977 14.7657 30.9023 15.3594 29.9141L15.375 29.8789L15.3946 29.8477C15.4336 29.7656 15.4805 29.6992 15.5157 29.6445C15.5782 29.6328 15.7422 29.5547 15.9063 29.4844C16.7344 29.3438 17.6211 29.6328 18.9805 29.3867L19.0274 29.375L19.0742 29.3594C19.6914 29.1836 20.2969 29.0977 20.9024 29.0977C21.8555 29.0977 22.4844 29.0703 22.7032 29.1289C22.9219 29.1875 22.9844 29.1758 23.2774 29.8789L23.2891 29.9141L23.3047 29.9492C23.3242 29.9883 23.3828 30.1328 23.4883 30.3242C23.5938 30.5117 23.7539 30.7969 24.1524 30.9961L24.25 31.043L24.3594 31.0703C24.7657 31.1719 25.2227 31.1094 25.5586 30.957C25.8907 30.8047 26.1172 30.5938 26.3086 30.4062C26.2578 30.4531 26.5586 30.3555 26.7149 30.2969C26.6602 30.4336 26.6641 30.7227 26.5938 30.793C26.4492 30.9375 26.3711 31.082 26.3321 31.1562C25.9961 31.4766 25.836 31.8477 25.7422 32.1602C25.6328 32.5273 25.5977 32.8398 25.5977 33.0977V33.3125L25.6875 33.5039C25.9141 34.0195 26.4883 34.3867 26.9492 34.4531C27.4102 34.5156 27.7813 34.4219 28.1094 34.3125C28.7657 34.1016 29.3672 33.7344 29.4492 33.6953L29.5274 33.6562L29.5977 33.5977C29.6367 33.8047 29.6485 34.0156 29.7032 34.2422C29.8164 34.6797 29.918 35.0703 30.1055 35.4492L30.125 35.4844C30.086 35.6602 30.0196 35.8398 30.1016 36.1016C30.2149 36.4688 30.4375 36.6836 30.6602 36.8711L30.6758 36.8789C31.418 37.4727 32.1797 37.5781 32.6836 37.75L32.8399 37.8008H33C32.8672 37.8008 33.1758 37.9023 33.6992 37.9023C34.1133 37.9023 35.0352 37.9258 35.9141 37.9102C36.3555 37.9062 36.7852 37.8906 37.1719 37.8555C37.5469 37.8164 37.8203 37.8281 38.2813 37.5625C38.8828 37.2461 39.1914 36.8242 39.4063 36.6094L39.2539 36.7344C39.586 36.5117 39.6719 36.3242 39.7735 36.1602C39.875 35.9961 39.9532 35.8516 40.0235 35.7344C40.0586 35.6758 40.0625 35.6719 40.0899 35.6406C40.1446 35.625 40.2461 35.6484 40.2969 35.6367C40.5235 35.5703 40.7188 35.4766 40.9063 35.3711C41.0977 35.2617 41.2774 35.1367 41.4532 34.9648C41.6289 34.793 41.875 34.5664 41.8907 34.0234C41.9336 33.5352 41.8867 33.1094 41.8555 32.8438C41.8242 32.5742 41.8242 32.4648 41.8594 32.3164C42.0977 31.7969 42.4375 31.3477 42.7813 30.6758V30.6719C43.0899 30.0586 43.3946 29.4492 43.7032 28.832L43.6563 28.9102C44.2891 27.8906 44.3946 26.9062 44.6289 26.2695C45.0742 25.1562 44.9258 23.9453 44.7032 22.875C44.5938 22.3398 44.4532 21.8438 44.3008 21.4258C44.1602 21.0273 44.0586 20.7461 43.8008 20.4141C43.543 20 43.2657 19.6953 43.0977 19.4922C42.9219 19.2734 42.8438 19.1523 42.7813 18.8984C42.7813 18.707 42.793 18.5 42.7266 18.207C42.6407 17.832 42.4063 17.2852 41.8477 17.0039L41.7813 16.9727L41.7188 16.9531C41.4375 16.8594 41.3399 16.9023 41.1875 16.9141L41.1992 17C41.1992 16.9844 41.1914 16.9844 41.1875 16.9727C41.1953 16.9727 41.1836 16.9258 41.1836 16.9141C41.1797 16.9141 41.1719 16.9141 41.1719 16.9141C41.1407 16.6055 41.0274 16.3711 40.9375 16.25C40.836 16.1133 40.7578 16.043 40.7071 15.9922C40.1758 15.4609 39.8008 14.5 38.586 13.8281L38.5039 13.7812L38.418 13.75C38.3047 13.7148 38.0899 13.5742 38.0078 13.4922L37.9844 13.4727L37.9649 13.4531C37.5391 13.0742 37.086 11.4375 36.8867 10.3203C36.8711 10.2109 36.8477 10.1406 36.8282 10.0781C36.7969 9.98828 36.7657 9.90625 36.7305 9.82031C36.6602 9.64453 36.5742 9.46094 36.4883 9.28125C36.4024 9.09766 36.3125 8.92188 36.2305 8.77344C36.1914 8.69531 36.1524 8.63281 36.1133 8.56641C36.0742 8.5 36.0938 8.48047 35.9063 8.29297L35.8399 8.22266L35.7539 8.16797C35.4649 7.97656 35.1133 7.92969 34.8867 7.94531C34.8711 7.94922 34.8711 7.95312 34.8594 7.95312C34.6836 7.26953 34.5117 6.57812 34.25 5.78125C34.1992 5.63281 34.1172 5.38672 34.0117 5.13281C33.9063 4.875 33.8438 4.62891 33.5078 4.29297L33.2149 4H32.8008ZM23.2969 7.14844C23.168 7.40234 23.1016 7.4375 23.0625 7.45312C23.1367 7.42188 23.2774 7.38281 23.4024 7.36719C23.4883 7.35938 23.5313 7.36719 23.5664 7.37109L23.711 7.65625L24.1563 7.76953C24.6446 7.89062 24.9649 7.85156 25.418 7.86719C25.3125 8.07812 25.1992 8.30469 25.1992 8.5C25.1992 8.70703 25.2891 8.78906 25.3594 8.91797C25.2539 9.03516 25.1367 9.07422 25.0977 9.30859C25.0313 9.71875 25.2422 10.0156 25.375 10.1602C26.3203 11.5234 27.8321 12.3047 28.6758 12.9805C28.9571 13.25 29.2188 13.4336 29.293 13.5078L29.3633 13.5781L29.4453 13.6328C30 14.0039 30.7266 14.0117 31.2188 13.8477L31.4375 13.7734L31.9258 13.2852L31.9492 13.2656C33.0977 11.9688 33.0977 10.1836 33.1758 9C33.3008 9.28516 33.4297 9.64453 33.4922 9.70703L33.5625 9.77734L33.6446 9.83203C33.9336 10.0234 34.2852 10.0703 34.5157 10.0508C34.5703 10.0469 34.5821 10.0352 34.625 10.0312C34.6485 10.0703 34.6641 10.1016 34.6875 10.1445C34.7617 10.3008 34.8321 10.4609 34.8789 10.5742C34.8985 10.6172 34.9063 10.6406 34.9102 10.6602L34.918 10.6797C35.1133 11.7578 35.2696 13.6992 36.6211 14.9219C36.9336 15.2305 37.3047 15.4883 37.7813 15.6484L37.6133 15.5742C38.2032 15.8984 38.4258 16.5391 39.293 17.4062C39.3203 17.5625 39.2813 17.9961 39.793 18.5078C40.168 18.8828 40.5274 18.832 40.7813 18.8203C40.7891 18.9102 40.8008 18.9766 40.8008 19.0977V19.207L40.8242 19.3164C40.9649 19.9492 41.2852 20.4336 41.5508 20.7578C41.8164 21.082 42.0078 21.2812 42.1289 21.4961L42.1719 21.5625L42.2188 21.625C42.1367 21.5234 42.3086 21.7891 42.4219 22.1055C42.5352 22.418 42.6563 22.8359 42.7461 23.2773C42.9258 24.1523 42.9258 25.1445 42.7696 25.5312L42.7657 25.5391V25.5469C42.4063 26.5039 42.3047 27.2969 41.9571 27.8594L41.9336 27.8984L41.9141 27.9375C41.6055 28.5508 41.3008 29.1641 40.9922 29.7773C40.75 30.25 40.3321 30.7812 39.9805 31.6055L39.9532 31.6641L39.9375 31.7227C39.7852 32.2617 39.8282 32.7461 39.8711 33.082C39.8985 33.3164 39.8946 33.4727 39.8946 33.6406C39.8438 33.668 39.8008 33.6875 39.7657 33.6992H39.6992C39.1836 33.6992 38.8633 33.9844 38.6836 34.1836C38.5 34.3789 38.3946 34.5586 38.3008 34.7188C38.2071 34.875 38.1328 35.0156 38.0782 35.0938C38.0547 35.1367 38.0274 35.1602 38.0274 35.1562L37.9922 35.1914C37.6133 35.5703 37.5157 35.7227 37.3555 35.8047L37.3164 35.8242L37.2852 35.8438C37.5235 35.6992 37.2696 35.8359 36.9805 35.8633C36.6875 35.8906 36.293 35.9062 35.8867 35.9102C35.0664 35.9258 34.1875 35.9023 33.6992 35.9023C33.6524 35.9023 33.4297 35.8711 33.293 35.8438C32.7149 35.6523 32.3867 35.5469 32.125 35.3945C32.125 35.375 32.1289 35.3789 32.1289 35.3555C32.1289 35.0391 32.0078 34.707 31.8321 34.4453L31.8946 34.5508C31.8828 34.5312 31.7344 34.1211 31.6446 33.7578C31.5547 33.3945 31.5 32.9492 31.5 33C31.5 32.6406 31.4492 32.6484 31.418 32.5469C31.3828 32.4453 31.3438 32.3516 31.2969 32.25C31.2539 32.1445 31.2032 32.0469 31.1172 31.918C31.0742 31.8555 31.0274 31.7812 30.9219 31.6875C30.8282 31.6016 30.6133 31.4766 30.2969 31.4375C29.5703 31.3203 28.961 31.6094 28.5157 31.9219C28.375 31.9922 28.2188 32.0586 28.0625 32.1406C28.0664 32.1328 28.0899 32.1016 28.0938 32.0977C28.1055 32.0781 28.0703 32.125 28.0625 32.1406C28.0547 32.1445 28.0469 32.1484 28.0391 32.1523C28.8907 31.2578 28.9844 30.0977 29 29.1758L28.918 28.7617C28.9141 28.7578 28.7383 28.4883 28.7383 28.4844C28.7383 28.4844 28.625 28.375 28.5782 28.3438C28.5313 28.3086 28.4883 28.2852 28.4532 28.2656C28.3164 28.1953 28.2539 28.1875 28.2032 28.1719C28.0977 28.1484 28.0508 28.1484 27.9961 28.1445C27.8907 28.1367 27.7969 28.1367 27.6836 28.1406C27.461 28.1445 27.1797 28.1641 26.875 28.2031C26.293 28.2852 25.6289 28.3633 25 28.9258C24.586 28.0508 23.9649 27.3984 23.2188 27.1992C22.4141 26.9805 21.7461 27.0977 20.9024 27.0977C20.1367 27.0977 19.375 27.2109 18.6211 27.418C17.7891 27.5664 16.8907 27.2656 15.5196 27.5156L15.4532 27.5312L15.3828 27.5508C15.1446 27.6289 14.6485 27.6406 14.0938 28.1914C13.793 28.4961 13.7227 28.7031 13.6367 28.8867C13.6211 28.9023 13.2735 29.0977 12.9024 29.0977C12.4102 29.0977 11.75 28.9766 10.9375 29.1133L10.9063 29.1211C10.293 29.2422 9.71487 29.4766 9.09378 29.7852C8.39847 29.9844 7.75784 30.2852 7.15237 30.5391C6.62112 30.7617 6.18753 30.8594 5.80862 30.9141L5.88284 30.4688C6.39456 27.5195 6.49612 25.2344 5.07815 22.625L5.0469 22.5664L5.01565 22.5195C5.01565 22.5195 5.01175 22.5078 5.00784 22.5C5.44143 22.0625 5.63675 21.3203 5.46878 20.6562C5.3594 20.2188 5.25003 19.8828 5.14846 19.582L5.14065 19.5664L5.13675 19.5469C4.91018 18.9453 4.91409 18.375 5.16018 18.0703C5.3594 17.8789 5.53128 17.75 5.84768 17.5938L5.8594 17.5898L5.87503 17.5781C7.14456 16.8984 8.168 16.4336 9.61722 15.9492C10.293 15.7578 11.2891 15.5273 12.1094 14.707C12.4844 14.332 12.6836 13.9219 12.8789 13.5C13.0352 13.168 13.1446 12.8633 13.2461 12.5781C13.5 12.6797 13.7344 12.8438 14.0157 12.75L14.0821 12.7266L14.1446 12.6953C14.3672 12.5859 14.6172 12.3438 14.7227 12.1992C14.8321 12.0547 14.9024 11.9492 15.0782 11.7227C15.6328 11.0352 15.6524 10.6953 16.043 10.3711L16.0742 10.3398L16.1094 10.3086C16.3203 10.0937 16.6914 9.9375 16.9532 9.92188C17.1289 9.95312 17.4336 10.1055 17.875 10.3711C18.3399 10.6484 19.0274 11.0742 19.918 10.875L21.5196 10.5195L20.4688 9.25781C20.5078 9.30859 20.4336 9.17969 20.5 8.96875C20.5703 8.76172 20.7305 8.53906 21.0157 8.41016C21.2266 8.32813 21.418 8.20312 21.5352 8.0625C21.6875 7.88672 21.7266 7.73438 21.7696 7.59375C21.7774 7.59766 21.7813 7.60156 21.793 7.60547C21.8946 7.65234 22.0039 7.71094 22.2539 7.72656C22.3789 7.73828 22.5547 7.73438 22.7657 7.64844C22.8594 7.60547 22.9571 7.53906 23.043 7.46094C23.0508 7.45312 23.043 7.45703 23.0625 7.45312C23.0547 7.45312 23.0508 7.45312 23.0469 7.45312C23.1485 7.36328 23.2383 7.25781 23.2969 7.14844ZM26.0313 9.5625C26.0664 9.57812 26.0977 9.59375 26.1289 9.60938L26.0508 9.59375C26.0313 9.58203 26.0508 9.57422 26.0313 9.5625ZM27.2071 10.0078L26.9492 10.1953C26.9922 10.1719 27 10.1328 27.0391 10.1055C27.1016 10.0625 27.125 10.0898 27.2071 10.0078ZM13.5977 11.4023L13.5469 11.7188C13.5196 11.8086 13.5 11.8008 13.4805 11.8125C13.5235 11.6641 13.5977 11.6094 13.5977 11.4023ZM26.5 31C26.4492 31.0352 26.418 31.0781 26.375 31.1172C26.3867 31.1016 26.3789 31.1094 26.3907 31.0938L26.5 31ZM29.5 33C29.5 33.0391 29.5157 33.0664 29.5157 33.1055C29.5157 33.1016 29.5117 33.0977 29.5117 33.0938C29.5039 33.0898 29.5 33.1641 29.5 33ZM39.8594 35.6406C39.793 35.668 39.8125 35.6992 39.6992 35.6992L39.3828 35.6484C39.6211 35.7266 39.7149 35.6562 39.8594 35.6406ZM34.0977 40C34 40.1016 34 40.1992 34 40.3008C34.1992 40.8008 34.3985 41.3008 34.6992 41.8008C35.0977 42.6016 35.5 43.3008 36.3008 43.9023C36.4024 44 36.5 44 36.5977 44C36.8008 44 37.0977 43.9023 37.1992 43.8008C37.5 43.4023 37.5 42.9023 37.6992 42.4023C37.8008 42.3008 37.8008 42.1992 37.9024 42C38 41.6992 38 41.5 38 41.1992V40.5C38 40.3008 37.8985 40 37.6992 40C37.5 40 37.5 40.1992 37.3008 40.3008H36.8008C36.4024 40.5 35.8985 40.4023 35.5 40.3008C35.1016 40.1992 34.6992 40 34.3008 40H34.0977Z"></path>
    </>
  );
};

export default withSvg(45, 45)(Svg);
