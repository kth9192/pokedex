import React from 'react';

function Footer() {
  return (
    <footer className="flex bg-black text-white text-sm px-8 py-8">
      <span className="pr-2">다음에 의해 제공된 아이콘입니다</span>
      <div className="flex flex-col">
        <div className="whitespace-pre-wrap text-right">
          <a
            target="_blank"
            href="https://icons8.com/icon/46001/%ED%94%BC%EC%B9%B4%EC%B8%84-%ED%8F%AC%EC%BC%93%EB%AA%AC"
          >
            피카츄 포켓몬
          </a>{' '}
          icon by{' '}
          <a target="_blank" href="https://icons8.com">
            Icons8
          </a>
        </div>

        <div className="whitespace-pre-wrap text-right">
          <a target="_blank" href="https://icons8.com/icon/45674/pokeball">
            Pokeball
          </a>{' '}
          icon by{' '}
          <a target="_blank" href="https://icons8.com">
            Icons8
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
