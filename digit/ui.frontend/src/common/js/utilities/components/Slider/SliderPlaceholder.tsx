import { isAuthorMode } from '@/utility/aem';

import { PlaceHolderContainer, Title } from './StyledSlider';

export const SliderPlaceholder = () => {
  return (
    <PlaceHolderContainer>{isAuthorMode() ? <Title>Account Summary Placeholder</Title> : null}</PlaceHolderContainer>
  );
};
