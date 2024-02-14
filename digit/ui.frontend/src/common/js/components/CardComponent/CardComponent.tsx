import React, { useEffect } from 'react';
import { AEMProps } from '@/types/global/aem-definition';
import { CardComponentProps } from './definitions';
import {
  BodyWrapper,
  ButtonWrapper,
  CardContainer,
  CardGroup,
  ContentWrapper,
  Description,
  GridContainer,
  GridItemContainer,
  GridRowContainer,
  Heading,
  Image,
} from './StyledCardComponent';
import ActionButton from '@/utility/components/FormElement/ActionButton';

const CardComponent = ({ attributes }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }

  const cardComponentJson: CardComponentProps = JSON.parse(attributes);
  let cardWidthConfig: any;

  useEffect(() => {
    if (cardComponentJson?.cardContainerList?.length > 0) {
      cardWidthConfig = { col: { xs: 12, md: 12, lg: 4 } };
    } else {
      cardWidthConfig = { col: { xs: 12, md: 12, lg: 6 } };
    }
  }, [cardComponentJson]);

  const handleOnClick = (data) => { 
    window.location.href = data?.includes('/content/') ? `${data}.html` : `${data}`;
  };

  return (
    <>
      <CardGroup>
        <GridContainer>
          <GridRowContainer>
            <GridItemContainer config={cardWidthConfig}>
              <CardContainer>
                <Image backgroundImageUrl={cardComponentJson.card1imagePath}></Image>
                <ContentWrapper>
                  <BodyWrapper>
                    <Heading>{cardComponentJson.card1title}</Heading>
                    <Description>{cardComponentJson.card1description}</Description>
                  </BodyWrapper>
                </ContentWrapper>
                <ButtonWrapper>
                  <ActionButton
                    onClick={() => {
                      handleOnClick(cardComponentJson.card1CtaPath);
                    }}
                    label={cardComponentJson.card1CtaLabel}
                    type="submit"
                    buttonType={'secondary'}
                  />
                </ButtonWrapper>
              </CardContainer>
            </GridItemContainer>
            <GridItemContainer config={cardWidthConfig}>
              <CardContainer>
                <Image backgroundImageUrl={cardComponentJson.card2imagePath}></Image>
                <ContentWrapper>
                  <BodyWrapper>
                    <Heading>{cardComponentJson.card2title}</Heading>
                    <Description>{cardComponentJson.card2description}</Description>
                  </BodyWrapper>
                </ContentWrapper>
                <ButtonWrapper>
                  <ActionButton
                    onClick={() => {
                      handleOnClick(cardComponentJson.card2CtaPath);
                    }}
                    label={cardComponentJson.card2CtaLabel}
                    type="submit"
                    buttonType={'secondary'}
                  />
                </ButtonWrapper>
              </CardContainer>
            </GridItemContainer>
            {cardComponentJson?.cardContainerList?.length > 0 && (
              <GridItemContainer config={{ col: { xs: 12, md: 12, lg: 4 } }}>
                <CardContainer>
                  <Image backgroundImageUrl={cardComponentJson?.cardContainerList?.[0].imagePath}></Image>
                  <ContentWrapper>
                    <BodyWrapper>
                      <Heading>{cardComponentJson?.cardContainerList?.[0].title}</Heading>
                      <Description>{cardComponentJson?.cardContainerList?.[0].description}</Description>
                    </BodyWrapper>
                  </ContentWrapper>
                  <ButtonWrapper>
                    <ActionButton
                      onClick={() => {
                        handleOnClick(cardComponentJson?.cardContainerList?.[0].ctaPath);
                      }}
                      label={cardComponentJson?.cardContainerList?.[0].ctaLabel}
                      type="submit"
                      buttonType={'secondary'}
                    />
                  </ButtonWrapper>
                </CardContainer>
              </GridItemContainer>
            )}
          </GridRowContainer>
        </GridContainer>
      </CardGroup>
    </>
  );
};

export default CardComponent;
