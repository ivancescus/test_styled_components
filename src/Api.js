import axios from 'axios';

const API_ROUTES = {
  PROFILE: 'http://greenhorsegames.com/tests/frontend/profile.php',
  SKILLS_CHALLENGE: 'http://greenhorsegames.com/tests/frontend/challenge.php',
  COLLECT: 'http://greenhorsegames.com/tests/frontend/collect.php',
};

async function getData(route) {
  try {
    const res = await axios.get(route);
    return res.data;
  } catch (e) {
    console.error(`Failed to fetch [${route}] with error `, e);
    return {};
  }
}

async function postData(route, data) {
  try {
    const res = await axios.post(route, data);
    return res.data;
  } catch (e) {
    console.error(`Failed to post to [${route}] with error `, e);
    return {};
  }
}

export {
  API_ROUTES,
  getData,
  postData,
};
