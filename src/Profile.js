
import React from 'react';
import styled from 'styled-components';

import avatarImage from './assets/avatar.png';
import clubImage from './assets/club.png';
import levelImage from './assets/level.png';
import flagImage from './assets/flag.png';
import medalSkillImage from './assets/medal_skill.png';
import medalPlayerImage from './assets/medal_player.png';

const Page = styled.div`
top: 0;
left: 0;
display: flex;
flex-direction: column;
`;
const ProfileHeader = styled.div`
width: 100%;
background: #fff;
padding-bottom: 35px;
`;
const ProfileMedals = styled.div`
width: 100%;
height: 20%;
background: #F5F5F5;
display: flex;
`;

const Avatar = styled.div`
margin-left: 20px;
margin-top: 30px;
display: flex;
flex-direction: row;
`;

const Name = styled.div`
margin-top: 10px;
margin-left: 10px;
font-weight: bold;
font-size: 20px;
`;
const Flag = styled.div`
margin-top: 10px;
margin-left: 20px;
`;

const Stats = styled.div`
margin-top: 0px;
position: relative;
top: 50px;
right: 165px;
display: flex;
`;
const StatsImage = styled.div`
`;
const StatsText = styled.div`
font-size: 21px;
margin-left: 5px;
margin-right: 20px;
`;

const Skill = styled.div`
padding-bottom: 400px;
margin-left: 25px;  
margin-top: 30px;
display:inline-block;
width: 200px;
`;
const SkillName = styled.div`
background-image: linear-gradient(#585858, #101010);
color: white;
height: 32px;
font-size: 24px;
font-weight: normal;
border-radius: 10px 10px 0px 0px;
border: 10px;
`;

const SkillBody = styled.div`
background-image: linear-gradient(#F5F5F5, 	#BEBEBE);
color: white;
height: 240px;
`;

const SkillImage = styled.div`
margin-top: 20px;
`;

const SkillAmount = styled.div`
border-radius: 50%;
width: 30px;
height:  30px;
background: #666;
border: 2px solid #fff;
color: #fff;
text-align: center;
font: 24px Arial, sans-serif;
position: relative;
margin-left: 110px;
bottom: 22px;
}`;

function RenderMedals(props) {
  const player = props.type === 'player';
  return (
    <Skill>
      <SkillName>
        {player ? 'Player Challenge' : 'Skill Master'}
      </SkillName>
      <SkillBody>
        <SkillImage>
          <img src={player ? medalPlayerImage : medalSkillImage} alt="medal" />
        </SkillImage>
        <SkillAmount>
          {props.amount}
        </SkillAmount>
      </SkillBody>

    </Skill>
  );
}

// nationality missing from API
function Profile(props) {
  const {
    medals, clubName, userName, level, // eslint-disable-line react/prop-types
  } = props.profile;

  return (
    <Page>
      <ProfileHeader>
        <Avatar>
          <img src={avatarImage} alt="avatar" />
          <Flag>
            <img src={flagImage} alt="flag" />
          </Flag>
          <Name>
            {userName}
          </Name>
          <Stats>
            <StatsImage>
              <img src={levelImage} alt="flag" />
            </StatsImage>
            <StatsText>
              {level}
            </StatsText>
            <StatsImage>
              <img src={clubImage} alt="club" />
            </StatsImage>
            <StatsText>
              {clubName}
            </StatsText>
          </Stats>

        </Avatar>
      </ProfileHeader>
      <ProfileMedals>
        {medals.map((medal, index) => <th key={index}>{RenderMedals(medal)}</th>)}
      </ProfileMedals>

    </Page>
  );
}

export default Profile;
