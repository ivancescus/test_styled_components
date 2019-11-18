
// Header.js
import React from 'react';
import styled from 'styled-components';
import { API_ROUTES, getData, postData } from './Api';


import { COLORS } from './Defaults';
import MenuButton from './MenuButton';
import Profile from './Profile';
import SkillChallenge from './SkillChallenge';

import profileImage from './assets/profile.png';
import trainingImage from './assets/training.png';
import logoImage from './assets/logo.png';
import goldImage from './assets/gold.png';
import levelImage from './assets/level.png';

const Nav = styled.div`
  background-color: #fff;
`;


const MENUS = {
  PROFILE: 'profile',
  SKILL_CHALLENGE: 'skill_challenge',
};

const NavHeader = styled.div`
  width: 100%;
  display: flex;
  background-color: #303030;
  height: 40px;
  font-size: 32px;
`;


const NavMenu = styled.div`
  width: 100%;
  display: flex;
  height: 40px;
  font-size: 25px;
  background-image: ${COLORS.GRADIENT_BLACK};
`;

const NavLogo = styled.div`
  width: 20%;
  text-align: center;
  margin-right: auto;
`;

const NavScoreText = styled.div`
color: white;
font-size: 16px;
background-color: #181818;
padding-left: 2px;
padding-right: 2px;
border-radius: 4px;
box-shadow: 1px 1px #404040;
font-weight: bold;
`;

const NavScoreImage = styled.div`
margin-left: 20px;
margin-right: 2px;
`;

const NavScore = styled.div`
& { 
  width: 20%;
  margin-left: auto;
  background-image: ${COLORS.GRADIENT_BLACK};
  display: flex;
  align-items: center;
}
&:before {
  border-top: 40px solid #303030;
  border-right: 20px solid transparent; 
  content: '';
  top: 0;
  left: 0;
}
`;

const Page = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
z-index: 9999;
background: #303030;
overflow-y: scroll;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // menu: MENUS.PROFILE,
      menu: MENUS.SKILL_CHALLENGE,
      profile: { // dummy info until request finishes
        level: 0,
        gold: 0,
        medals: [],
        userId: 0,
      },
      skills_challenge: {
        challengeGroup: [],
        uncollectedReward: {},
      },
    };
  }

  async componentDidMount() {
    const skills_challenge = await getData(API_ROUTES.SKILLS_CHALLENGE);
    if (skills_challenge.challengeGroup) {
      skills_challenge.challengeGroup.sort((a, b) => (b.skill - a.skill)); // sort users by their skill
    }
    this.setState({
      profile: await getData(API_ROUTES.PROFILE),
      skills_challenge,
    });
  }

  async collect() {
    const apiResult = await postData(API_ROUTES.COLLECT, {
      userId: this.state.profile.userId,
    });

    if (!apiResult.success) {
      console.error('Collecting request returned ', apiResult);
      return;
    }

    const { type, reward } = this.state.skills_challenge.uncollectedReward;

    const { medals } = this.state.profile;
    for (let i = 0; i < medals.length; i += 1) {
      if (medals[i].type === type) {
        medals[i].amount = parseInt(medals[i].amount) + reward;
      }
    }
    this.setState({
      profile: {
        ...this.state.profile,
        medals,
      },
      skills_challenge: {
        ...this.state.skills_challenge,
        uncollectedReward: null,
      },
    });
  }

  render() {
    const { menu, skills_challenge } = this.state;
    const { gold, level, userId } = this.state.profile;
    return (
      <Page>
        <Nav>
          <NavHeader>
            <NavLogo>
              <img src={logoImage} alt="log" />
            </NavLogo>
            <NavScore>
              <NavScoreImage>
                <img src={goldImage} alt="gold" />
              </NavScoreImage>
              <NavScoreText>
                {gold}
              </NavScoreText>
              <NavScoreImage>
                <img src={levelImage} alt="level" />
              </NavScoreImage>
              <NavScoreText>
                {level}
              </NavScoreText>
            </NavScore>
          </NavHeader>
          <NavMenu>
            <MenuButton
              onClick={() => { this.setState({ menu: MENUS.SKILL_CHALLENGE }); }}
              selected={menu === MENUS.SKILL_CHALLENGE}
              position="left"
              imgSource={trainingImage}
              text="SKILL CHALLENGE"
              imgAlt="skill_challenge"
            />

            <MenuButton
              onClick={() => { this.setState({ menu: MENUS.PROFILE }); }}
              selected={menu === MENUS.PROFILE}
              position="right"
              imgSource={profileImage}
              text="PROFILE"
              imgAlt="profile"
            />
          </NavMenu>
        </Nav>
        {menu === MENUS.PROFILE ? <Profile profile={this.state.profile} /> : <SkillChallenge userId={userId} challenge={skills_challenge} collect={() => (this.collect())} />}
      </Page>

    );
  }
}
export default App;
