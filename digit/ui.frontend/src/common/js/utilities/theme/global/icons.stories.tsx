import React from 'react';
import styled from 'styled-components';

import Icon from '@/utility/components/Icon';
import { Meta, Story } from '@storybook/react/types-6-0';

const IconContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  svg {
    width: 24px;
    height:24px;
    margin: 0 10px 10px ;
  }
`;

const IconsOutput = () => (
  <>
    <h2>Graphic icons</h2>
    <IconContainer>
      <Icon name={'accounting'} />
      <Icon name={'australia-map'} />
      <Icon name={'automotive'} />
      <Icon name={'blank'} />
      <Icon name={'bpay'} />
      <Icon name={'car-badge'} />
      <Icon name={'car-crash'} />
      <Icon name={'card-payment'} />
      <Icon name={'car-fire'} />
      <Icon name={'car-insurance'} />
      <Icon name={'carpark'} />
      <Icon name={'car-rental'} />
      <Icon name={'car-service'} />
      <Icon name={'car-top-view'} />
      <Icon name={'checkmark'} />
      <Icon name={'cheque'} />
      <Icon name={'date-span'} />
      <Icon name={'delete-sign'} />
      <Icon name={'down4'} />
      <Icon name={'driving-guidelines'} />
      <Icon name={'duration-finance'} />
      <Icon name={'error'} />
      <Icon name={'info'} />
      <Icon name={'lock'} />
      <Icon name={'maintenance'} />
      <Icon name={'online-payment-with-a-credit-card'} />
      <Icon name={'paper-money'} />
      <Icon name={'party-balloon'} />
      <Icon name={'pay-date'} />
      <Icon name={'phone'} />
      <Icon name={'pickup'} />
      <Icon name={'print'} />
      <Icon name={'read-message'} />
      <Icon name={'receipt-approved'} />
      <Icon name={'renew'} />
      <Icon name={'right'} />
      <Icon name={'sick'} />
      <Icon name={'stopwatch'} />
      <Icon name={'suv'} />
      <Icon name={'tow-truck'} />
      <Icon name={'transaction-approved'} />
      <Icon name={'unlocked'} />
      <Icon name={'vehicle-insurance'} />
      <Icon name={'recent-messages'} />
      <Icon name={'mail-icon'} />
      <Icon name={'message-icon'} />
      <Icon name={'customer-service'} />
    </IconContainer>
    <h2>Functional icons</h2>
    <IconContainer>
      <Icon
        name={'add'}
        isFunctional={true}
      />
      <Icon
        name={'alert'}
        isFunctional={true}
      />
      <Icon
        name={'arrow-backward'}
        isFunctional={true}
      />
      <Icon
        name={'arrow-forward'}
        isFunctional={true}
      />
      <Icon
        name={'check'}
        isFunctional={true}
        fill="black"
      />
      <Icon
        name={'checkbox-checked'}
        isFunctional={true}
      />
      <Icon
        name={'checkbox-unchecked'}
        isFunctional={true}
      />
      <Icon
        name={'close'}
        isFunctional={true}
      />
      <Icon
        name={'collapse'}
        isFunctional={true}
      />
      <Icon
        name={'edit'}
        isFunctional={true}
      />
      <Icon
        name={'electronic'}
        isFunctional={true}
      />
      <Icon
        name={'expand'}
        isFunctional={true}
      />
      <Icon
        name={'file-download'}
        isFunctional={true}
      />
      <Icon
        name={'hide'}
        isFunctional={true}
      />
      <Icon
        name={'info-circle'}
        isFunctional={true}
      />
      <Icon
        name={'info'}
        isFunctional={true}
      />
      <Icon
        name={'login'}
        isFunctional={true}
      />
      <Icon
        name={'logout'}
        isFunctional={true}
      />
      <Icon
        name={'menu'}
        isFunctional={true}
      />
      <Icon
        name={'open-new'}
        isFunctional={true}
      />
      <Icon
        name={'paper'}
        isFunctional={true}
      />
      <Icon
        name={'pencil'}
        isFunctional={true}
        fill="black"
      />
      <Icon
        name={'profile'}
        isFunctional={true}
      />
      <Icon
        name={'remove'}
        isFunctional={true}
      />
      <Icon
        name={'search'}
        isFunctional={true}
      />
      <Icon
        name={'show'}
        isFunctional={true}
      />
      <Icon
        name={'success'}
        isFunctional={true}
      />
      <Icon
        name={'sorting1'}
        isFunctional={true}
      />
      <Icon
        name={'sorting2'}
        isFunctional={true}
      />
    </IconContainer>
  </>
);
export default {
  title: 'Foundations/Icons',
  component: IconsOutput,
  argTypes: {},
} as Meta;

const Template: Story<React.FC> = () => <IconsOutput />;

export const Example = Template.bind({});
Example.storyName = 'Icons';
