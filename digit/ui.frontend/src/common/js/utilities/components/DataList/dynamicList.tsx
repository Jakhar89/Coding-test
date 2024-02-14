import React, { useEffect, useState } from 'react';

import Icon from '@/utility/components/Icon';

import { DynamicDataListProps } from './definitions';
import {
  BoldTitle,
  BoldValue,
  Container,
  ContentWrapper,
  DisclaimerText,
  IconWrapper,
  ListHead,
  Title,
  Value,
} from './StyledDataList';

const DynamicDataList: React.FC<DynamicDataListProps> = ({
  listHeaders,
  data,
  listCustomColumnsWidth,
  shouldHideEmptyValues,
}) => {
  const [pixelSize, setPixelSize] = useState('');

  let keyCounter;
  const getHeaderKeys = Object.keys(listHeaders);

  const resizer = () => {
    const windowSize = window.matchMedia('(min-width:576px)').matches;
    if (windowSize) {
      setPixelSize('desktop');
    } else {
      setPixelSize('mobile');
    }
  };

  useEffect(() => {
    resizer();
    /**Attaching eventlistener for resizing
     * Re-render component based on viewport */
    window.addEventListener('resize', resizer);
  }, []);

  const MobileRendition1 = ({ item }) => (
    <>
      {getHeaderKeys.map((ele, index) => {
        return (
          <ContentWrapper
            direction="column"
            key={index}
          >
            <ListHead>
              {/**Rendering Header */}
              {listHeaders[ele]}

              <ListHead regular={true}>
                {/**Rendering  Header Value*/}
                {item[ele]}
              </ListHead>
            </ListHead>
          </ContentWrapper>
        );
      })}
    </>
  );

  const MobileRendition2 = ({ item, ind }) => (
    <ContentWrapper
      direction={'column'}
      key={ind}
    >
      {getHeaderKeys.map((ele, index) => {
        return (
          <ListHead key={index}>
            {/**Rendering Header */}
            {listHeaders[ele]}

            <ListHead regular={true}>
              {/**Rendering  Header Value*/}
              {item[ele]}
            </ListHead>
          </ListHead>
        );
      })}
    </ContentWrapper>
  );

  const getColumnWidth = (index) => {
    if (!(getHeaderKeys.length === listCustomColumnsWidth?.length)) {
      return null;
    }

    return listCustomColumnsWidth?.[index];
  };

  return (
    <Container>
      <>
        {pixelSize === 'desktop' && (
          <>
            {/**List headers Desktop */}
            <ContentWrapper justify="space-between">
              {getHeaderKeys.map((ele, index) => {
                return (
                  <ListHead
                    key={index}
                    listSize={getHeaderKeys.length} //to control the width of the element
                    columnWidth={getColumnWidth(index)}
                  >
                    {listHeaders[ele]}
                  </ListHead>
                );
              })}
            </ContentWrapper>
            {/**List Items Desktop */}
            {data?.map((item, index) => {
              return (
                <ContentWrapper
                  justify="space-between"
                  key={index}
                >
                  {getHeaderKeys.map((ele, ind) => {
                    keyCounter++;
                    return (
                      <ListHead
                        key={ind}
                        listSize={getHeaderKeys.length} //to control the width of the element
                        regular={true}
                        columnWidth={getColumnWidth(ind)}
                      >
                        {item[ele]}
                      </ListHead>
                    );
                  })}
                </ContentWrapper>
              );
            })}
          </>
        )}
        {/**Desktop rendition ends
         * Mobile rendition below
         */}
        {pixelSize === 'mobile' && (
          <>
            {data?.map((item, ind) => (
              <React.Fragment key={ind}>
                <MobileRendition2
                  item={item}
                  ind={ind}
                />
              </React.Fragment>
            ))}
          </>
        )}
      </>
    </Container>
  );
};

export default DynamicDataList;
