
import React from 'react';
import styled from 'styled-components';
import trainingImage from './assets/training.png';
import avatarImage from './assets/avatar.png';

const Page = styled.div`
top: 0;
left: 0;
display: flex;
flex-direction: column;
background-color: #fff;
`;


const TableHeader = styled.div`
display: flex;
background-image: linear-gradient( #1963AB, #06111C);
margin: 30px 30px 0px 30px;
color: white;
padding: 5px 5px;
display: flex;
flex-direction: row;
border-radius: 10px 10px 0px 0px;
`;
const HeaderTitle = styled.div`
font-size: 20px;
margin-top: 4px;
margin-left: 10px;
`;
const HeaderImage = styled.div`
margin-left: 10px;
`;

const TableBody = styled.div`
display: flex;
margin: 0px 30px 0px 30px;
color: white;
padding: 5px 5px;
display: flex;
flex-direction: column;
height: 100%;
background-color: #16528E;
border-radius: 0px 0px 10px 10px;
margin-bottom: 20px;
text-align: center;
`;

const TableCollect = styled.div`
background-color: #59AD07;
margin: 30px auto 20px auto;
font-size: 24px;
font-weight: bold;
padding: 16px;
border: 12px;
border-radius: 12px;
position: absolute;
left: 43%;
&:hover{
    background-color: #556B2F;
    cursor: pointer;
}
`;

const TablePlayers = styled.div`
margin: 160px auto 20px auto;
color: white;
background-color: #0F3A66;
border-radius: 10px 10px 10px 10px;
width: 98%;
position: relative;
`;


const TableUser = styled.div`
margin-left: 10px;
display: flex;
margin-bottom: 30px;
`;
const TableUserIndex = styled.div`
margin-left: 12x;
margin-top: 20px;
margin-right: 15px;
`;
const TableUserName = styled.div`
margin-left: 15px;
margin-top: 16px;
margin-right: 15px;
font-size: ${(props) => (props.me ? '26px' : '24px')};
font-weight: ${(props) => (props.me ? 'bold' : 'normal')};
font-style:  ${(props) => (props.me ? 'italic' : 'normal')};
`;
const TableUserAvatar = styled.div`
margin-left: 10px;
margin-top: 4px;
`;

const TableSkill = styled.div`
position: absolute;
left: 70%;
display: flex;
`;

const TableSkillImage = styled.div`
bottom: 20px;
position: relative;
`;
const TableSkillValue = styled.div`
bottom: 22px;
left: 12px;
position: absolute;
margin-left: 20px;

color: white;
font-size: 18px;
background-color: #181818;
border-radius: 6px;
box-shadow: 1px 1px #404040;
`;

function RenderPlayerRow(props, index, myUserId) {
  const { userId, userName, skill } = props;
  return (
    <tr key={userId}>
      <td>
        <TableUser>
          <TableUserIndex>{index}</TableUserIndex>
          <TableUserAvatar>
            <img src={avatarImage} alt="avatar" style={{ height: '50px', width: 'auto' }} />
          </TableUserAvatar>
          <TableUserName me={myUserId === userId}>{userName}</TableUserName>
        </TableUser>
      </td>
      <td>
        <TableSkill>
          <TableSkillImage>
            <img src={trainingImage} alt="trainingHeader" style={{ height: '30px', width: 'auto' }} />
          </TableSkillImage>

          <TableSkillValue>{skill}</TableSkillValue>
        </TableSkill>
      </td>
    </tr>
  );
}
function SkillChallenge(props) {
  const { challengeGroup, uncollectedReward } = props.challenge;
  const { userId, collect } = props;
  return (
    <Page>
      <TableHeader>
        <HeaderImage>
          <img src={trainingImage} alt="trainingHeader" />
        </HeaderImage>
        <HeaderTitle>
          Skill Challenge
        </HeaderTitle>
      </TableHeader>
      <TableBody>
        {uncollectedReward
          ? (
            <TableCollect onClick={collect}>
          COLLECT
            </TableCollect>
          ) : null}
        <TablePlayers>
          <table>
            <tbody>
                {challengeGroup.map((player, index) => (RenderPlayerRow(player, index, userId)))}

              </tbody>
          </table>
        </TablePlayers>
      </TableBody>
    </Page>
  );
}

export default SkillChallenge;
