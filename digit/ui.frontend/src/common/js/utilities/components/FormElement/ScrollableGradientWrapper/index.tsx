import React, { useRef, useState } from 'react';

import { ContentContainer, GradientWrapper } from './StyledScrollableGradientWrapper';

const ScrollableGradientWrapper = ({ children }) => {
  const ref = useRef<null | HTMLElement>(null);
  const [shouldShowTopGradient, setShouldShowTopGradient] = useState(false);
  const [shouldShowBottomGradient, setShouldShowBottomGradient] = useState(true);

  const onScroll = () => {
    const scrollTop = ref?.current?.scrollTop;
    const clientHeight = ref?.current?.clientHeight;
    const hasScrollToTheBottom = scrollTop && clientHeight && scrollTop + clientHeight === ref.current?.scrollHeight;
    scrollTop && scrollTop > 0 ? setShouldShowTopGradient(true) : setShouldShowTopGradient(false);
    hasScrollToTheBottom ? setShouldShowBottomGradient(false) : setShouldShowBottomGradient(true);
  };

  return (
    <GradientWrapper
      shouldShowTopGradient={shouldShowTopGradient}
      shouldShowBottomGradient={shouldShowBottomGradient}
    >
      <ContentContainer
        onScroll={onScroll}
        ref={ref as React.RefObject<HTMLDivElement>}
      >
        {children}
      </ContentContainer>
    </GradientWrapper>
  );
};

export default ScrollableGradientWrapper;
