import Script from 'next/script';
import { useEffect } from 'react';
import { useWindowSize } from 'react-use';
import { create } from 'zustand';
import styles from './DesignHelper.module.css';
import cn from 'clsx';

export type DesignHelperStateProps = {
  showDesignHelper: boolean;
  showGrid: boolean;
  enableSpacing: boolean;
};

export const useDesignHelper = create<DesignHelperStateProps>(() => ({
  showDesignHelper: true,
  showGrid: true,
  enableSpacing: true,
}));

export const DesignHelper = () => {
  const { showDesignHelper, showGrid, enableSpacing } = useDesignHelper();
  const { width, height } = useWindowSize(0);

  const toggle = (e: any) => {
    if (e.key.toLowerCase() === 'd') {
      useDesignHelper.setState(x => ({
        ...x,
        showDesignHelper: !x.showDesignHelper,
      }));
    }
    if (e.key.toLowerCase() === 'g') {
      useDesignHelper.setState(x => ({
        ...x,
        showGrid: !x.showGrid,
      }));
    }
  };

  useEffect(() => {
    if (!enableSpacing) return;

    let spacing = window.Spacing;
    // @ts-ignore
    if (typeof spacing !== 'undefined') return;
    // @ts-ignore
    spacing?.start();

    return () => {
      // @ts-ignore
      spacing?.stop();
    };
  }, [enableSpacing]);

  useEffect(() => {
    window.addEventListener('keydown', toggle);
    return () => {
      window.removeEventListener('keypress', toggle);
    };
  }, []);

  return (
    <>
      <Script
        strategy="lazyOnload"
        onLoad={e => {
          useDesignHelper.setState(x => ({
            ...x,
            enableSpacing: true,
          }));
        }}
        src="//cdn.jsdelivr.net/npm/spacingjs"></Script>

      <div className={styles['design-helper']} data-show={String(showDesignHelper)}>
        <div>
          Toggle Overlay:{' '}
          <kbd
            style={{
              marginLeft: '1rem',
            }}>
            <CommandIcon />D
          </kbd>
        </div>
        <ul>
          <li>
            <label>
              <input
                type="checkbox"
                defaultChecked={showGrid}
                onChange={e => {
                  useDesignHelper.setState(x => ({
                    ...x,
                    showGrid: !x.showGrid,
                  }));
                }}
              />
              Show Grid
              <kbd
                style={{
                  marginLeft: '1rem',
                }}>
                <CommandIcon />G
              </kbd>
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                defaultChecked={enableSpacing}
                onChange={e => {
                  useDesignHelper.setState(x => ({
                    ...x,
                    enableSpacing: !x.enableSpacing,
                  }));
                }}
              />
              Enable Spacing
            </label>
          </li>
          <li>width: {width}</li>
          <li>height: {height}</li>
          <li>
            current media: <span className={styles['media']}></span>
          </li>
        </ul>
      </div>
      {showGrid && (
        <div className={cn(styles['helper-grid'], 'grid')}>
          {Array.from({ length: 12 }).map((item, i) => (
            <div key={i} />
          ))}
        </div>
      )}
    </>
  );
};

const CommandIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="12"
      height="12"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
    </svg>
  );
};
