import React, { useEffect, useRef, useState } from 'react';

import Icon from '@/utility/components/Icon';
import { BREAKPOINTS } from '@/utility/styles/mq';

import { SliderProps } from './definitions';
import { SliderPlaceholder } from './SliderPlaceholder';
import {
  IndicatorsContainer,
  SliderButton,
  SliderContainer,
  SliderInner,
  SliderItem,
  SliderItemContainer,
} from './StyledSlider';

const Slider: React.FC<SliderProps> = ({ slides = [] }) => {
  if (!slides.length) return <SliderPlaceholder />;

  const sliderRef = useRef<any>();

  const [activeIndex, setActiveIndex] = useState(0);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const slideWidth = { mobile: '88vw', desktop: '77vw' };

  const gaps = [16, 45]; // gaps in px [mobile, desktop]

  const minSwipeDistance = 50;

  const getContainerStyles = () => {
    const isLargeScreen = window.innerWidth >= BREAKPOINTS.lg ? true : false;
    const windowWidth = window.innerWidth;
    const containerWidth = sliderRef.current?.parentElement?.offsetWidth;
    const containerMargin = Math.floor((windowWidth - containerWidth) / 2);

    const containerPadding = isLargeScreen ? `${containerMargin}px` : '6vw';

    return {
      marginLeft: `-${containerMargin}px`,
      marginRight: `-${containerMargin}px`,
      paddingLeft: containerPadding,
      paddingRight: containerPadding,
      scrollPaddingRight: containerPadding,
      scrollPaddingLeft: containerPadding,
    };
  };

  useEffect(() => {
    window.addEventListener('resize', () => setActiveIndex(0));
  }, []);

  const updateIndex = (newIndex, direction) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= slides.length - 1) {
      newIndex = slides.length - 1;
    }
    setActiveIndex(newIndex);

    if (sliderRef?.current) {
      sliderRef.current.scrollLeft = sliderRef?.current.children?.[0].offsetWidth * newIndex;
    }
  };

  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      updateIndex(activeIndex + 1, '');
    }

    if (isRightSwipe) {
      updateIndex(activeIndex - 1, '');
    }
  };

  return (
    <>
      <SliderContainer
        isMulti={slides?.length > 1}
        isLastActive={slides?.length - 1 === activeIndex}
      >
        {slides?.length > 1 && (
          <SliderInner
            style={getContainerStyles()}
            activeIndex={activeIndex}
            isLastChild={activeIndex === slides.length - 1}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            ref={sliderRef}
          >
            {slides?.map((item, index) => {
              return (
                <SliderItemContainer
                  gaps={gaps}
                  itemWidth={slideWidth}
                  key={index}
                  onClick={() => updateIndex(index, '')}
                  isMulti={true}
                >
                  <SliderItem>{item}</SliderItem>
                </SliderItemContainer>
              );
            })}
          </SliderInner>
        )}
        {slides?.length == 1 && (
          <SliderItemContainer isMulti={false}>
            <SliderItem>{slides?.[0]}</SliderItem>
          </SliderItemContainer>
        )}
        {slides?.length > 1 && (
          <IndicatorsContainer>
            <SliderButton
              onClick={() => {
                updateIndex(activeIndex - 1, 'left');
              }}
              category="arrow"
              aria-label="Go to Previous Page"
            >
              <Icon
                fill="currentColor"
                aria-label="Previous"
                name={'arrow-backward'}
                isFunctional={true}
              />
            </SliderButton>

            {slides.map((item, index) => {
              return (
                <SliderButton
                  category="cta"
                  key={index}
                  active={index === activeIndex}
                  aria-label={`Go to Page ${index}`}
                  onClick={() => {
                    updateIndex(index, '');
                  }}
                ></SliderButton>
              );
            })}

            <SliderButton
              onClick={() => {
                updateIndex(activeIndex + 1, 'right');
              }}
              category="arrow"
              aria-label="Go to Next Page"
            >
              <Icon
                fill="currentColor"
                aria-label="Previous"
                name={'arrow-forward'}
                isFunctional={true}
              />
            </SliderButton>
          </IndicatorsContainer>
        )}
      </SliderContainer>
    </>
  );
};

export default Slider;
