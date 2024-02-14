import { AEMProps } from '@/types/global/aem-definition';
import RichText from '@/utility/components/RichText';
import React from 'react';
import { DisputeProcessComponentElementProps } from './definitions';
import {
  Description,
  DisputeProcessCompent,
  DisputeProcessComponentElement,
  DisputeProcessDisclaimer,
  Heading,
} from './StyledDisputeProcessComponent';

const DisputeProcessComponent = ({ attributes }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }

  const disputeProcessComponentJson: DisputeProcessComponentElementProps = JSON.parse(attributes);
  const disputeProcessComponentList = disputeProcessComponentJson?.disputeComponentPropertyList;

  return (
    <>
      <DisputeProcessCompent>
        {disputeProcessComponentList?.map((item, index) => {
          return (
            <DisputeProcessComponentElement key={index}>
              <Heading>{item?.title}</Heading>
              <Description>
                <RichText>{item?.description}</RichText>
              </Description>
            </DisputeProcessComponentElement>
          );
        })}
      </DisputeProcessCompent>
      {disputeProcessComponentJson?.infoDisclaimer && (
        <DisputeProcessDisclaimer>
          <RichText>{disputeProcessComponentJson?.infoDisclaimer}</RichText>
        </DisputeProcessDisclaimer>
      )}
    </>
  );
};

export default DisputeProcessComponent;
