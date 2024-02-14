import styled, { css } from 'styled-components';

import Grid from '@/utility/components/Grid';
import { spacing } from '@/utility/props';
import { mq } from '@/utility/styles';
import { body1, boldFixedBody16, fixedBody14, fixedBody16, headingH1, headingH4 } from '@/utility/styles/text';
import { globalColors } from '@/utility/theme/global/colors';

import { MessageProps, MessageTextProps, NoMessages } from './definitions';

export const RecentMessageContainer = styled.div`
   display: flex;
   box-shadow:rgba(0, 0, 0, 0.12);
`;

export const GridContainer = styled(Grid.Container)`\
${({ theme }) => spacing({ theme, px: 'micro5' })};

${mq('xs')}{
    margin: auto;
  }
`;

export const GridRowContainer = styled(Grid.Row)`
    display: flex;
 
`;

export const GridItemContainer = styled(Grid.Item)`
  display: flex;
  margin-bottom: 24px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.12);
  max-width:100%;

  ${mq('xs')}{
    padding:0;
    flex:1;
    max-width:100%;
  }
`;

export const LeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    ${({ theme }) => spacing({ theme, px: 'micro4', py: 'micro3' })}
    background-color: ${({ theme }) => theme.colors.background['light-2']};
    width:30%;
    max-width:30%;


    &:before{
        content: "";
        display: block;
        left: 0;
        top: 0;
        width: 50px;
        height: 6px;
        margin-bottom: 32px;
        background: ${({ theme }) => theme.colors.border['divider-1']};
    }

    ${mq.lessThan('md')}{
        width:100%;
        max-width:calc(100% - 32px);
    }
`;

export const MessageWrapper = styled.div<NoMessages>`
    display: flex;
    flex-direction: column;
    ${({ noMessage }) =>
      noMessage ? 'width:100%;max-width: 375px;text-align: center;margin: 0 auto;' : 'width:calc(100% - 45px);'}    
`;

export const RightContainer = styled.div`
    display: flex;
    width:70%;
    min-width:70%;
    ${mq.lessThan('md')}{
        width:100%;
    }
    ${mq('md')}{
        background: ${({ theme }) => theme.colors.background['light-1']};
    }
`;

export const Title = styled.div`
  ${body1}
  max-width: 60%;

  ${mq('xs')}{
    margin-bottom:0;
  }

`;

export const ButtonContainer = styled.div`
display:flex;
align-self: start;
margin-bottom: 0;
margin-top: auto;

${mq('xs')}{
  button{
    margin-bottom:0;
    padding: 10px;
  }
}

`;

export const LeftInnerWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    
`;

export const RightInnerWrapper = styled.div<NoMessages>`
    display: flex;
    ${({ noMessage }) => (noMessage ? 'flex-direction:column' : '')}
    ${({ theme }) => spacing({ theme, px: 'micro3', py: 'micro2' })}
    border-bottom: 2px solid ${({ theme }) => theme.colors.background['light-2']};
    &:last-child{
        border:none;
    }
    ${({ mobile }) => (mobile ? `margin:0 -16px;background:white;` : '')}
`;

// TODO Revert margin to `margin:22px 0` for mobile once messages api is back
export const Message = styled.div<MessageProps>`
    display: flex;
    flex-direction:column;
    width:100%;
    ${({ mobile }) => (mobile ? `margin:22px 0 -18px;` : '')}
    ${({ mobile }) => (!mobile ? `min-height: 447px;` : '')}
`;

export const MessageText = styled.div<MessageTextProps>`
    ${({ read }) => (read ? fixedBody16 : boldFixedBody16)};
    display: flex;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    ${mq('xs')}{
        margin-bottom:0;
    }
`;

export const NoMessageText = styled.div`
    display: flex;
    justify-content:center;
    ${mq('xs')}{
        ${headingH1}
        ${({ theme }) => spacing({ theme, mt: 'micro2' })}
    }
    ${mq('md')}{
        ${headingH4}
        ${({ theme }) => spacing({ theme, mt: 'micro2' })}
    }
`;

export const NoMessageSub = styled.div`
    ${fixedBody16};
    display:flex;
    justify-content:center;
    color:${({ theme }) => theme.colors.text.body['dark-2']};
`;

export const MessageDateTime = styled.div`
    ${fixedBody14}
    color:${({ theme }) => theme.colors.text.body['dark-2']};
    display: flex;
    margin-bottom:5px;
`;

export const IconContainer = styled.div`
    margin-top:auto;
    margin-bottom:auto;
    ${({ theme }) => spacing({ theme, mr: 'micro5' })}
    min-width:33px;
`;

export const IconContainer2 = styled.div`
    border-radius:50%;
    border:2px solid ${({ theme }) => theme.colors.border['border-1']};
    padding:25px; 
    margin: auto;
    margin-top:10%;
`;

export const Notifications = styled.div`
    ${fixedBody16}
    border-radius:50%;
    background:${globalColors['error-1']};
    display:flex;
    min-width:22px;
    min-height:20px;
    justify-content: center;
    align-items: center;
    align-self: center;
    margin-left:15px;
    color:white;

    ${mq('md')}{
        margin-right: auto;
        margin-left: auto;
    }

    ${mq('xs')}{
        margin-bottom:0;
    }
`;
