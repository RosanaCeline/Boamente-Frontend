import React from 'react';
import style from './HeaderInternal.module.css';
import notificationIcon from '../../../../assets/icons/layout/Icon-Notific.png';

export default function HeaderInternal() {
  return (
    <header>
      <h1 className={style.title}>Header Interno</h1>
      <section className={style.button}>
          <a href="#"><img src={notificationIcon} alt="Notificações" /></a>
          <div class="dark-mode-btn"></div>
      </section>
    </header>
  );
}
