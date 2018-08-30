import { sortOnlineStatus } from '../utils';
import {
  CLEAR_MISSED_MSG,
  CLEAR_NOTICES,
  GET_MESSAGES,
  GET_MESSAGES_PRIVATE,
  MESSAGE_SENT,
  MESSAGE_SENT_PRIVATE,
  LOADING,
  LOGGED_IN,
  LOGIN_ERROR,
  LOGOUT,
  RECEIVE_GIPHY,
  STOPPED_TYPING,
  STOPPED_TYPING_PRIVATE,
  TOGGLE_GIPHY,
  TOGGLE_EMOJI,
  TOGGLE_MISSED_MSG,
  TOGGLE_MIC,
  TOGGLE_PRIVATE_PW_INPUT,
  TYPING,
  TYPING_PRIVATE,
  USER_CONNECTED,
  USER_DISCONNECTED,
  SET_IMAGE_SRC,
  SET_FILE_NAME,
  TOGGLE_LOCK,
  UNLOCK_PRIVATE_PASSWORD,
  TOGGLE_APP,
  END_POS,
  FLOOR,
} from '../../constants';

import { SearchGrid, Agent, GridCell } from '../components/Grid/astar';
const auditoriumWall = [278,
     279,
     280,
     306,
     332,
     359,
     410,
     461,
     385,
     358,
     436,
     487,
     513,
     538,
     516,
     466,
     415,
     440,
     491,
     253,
     204,
     205,
     206,
     362,
     286,
     232,
     233,
     259,
     285,
     311,
     337,
     389,
     363,
     4,
     210,
     236,
     29,
     54,
     79,
     156,
     158,
     157,
     159,
     185,
     290,
     268,
     269,
     295,
     346,
     320,
     372,
     397,
     447,
     473,
     494,
     468,
     443,
     392,
     418,
     367,
     341,
     315,
     422,
     558,
     533,
     507,
     481,
     455,
     429,
     403,
     218,
     193,
     141,
     167,
     377];
const floorPlan = [
     4,
     6,
     10,
     35,
     60,
     85,
     8,
     33,
     58,
     83,
     81,
     6,
     31,
     56,
     45,
     20,
     4,
     29,
     3,
     4,
     29,
     54,
     79,
     51,
     50,
     3,
     102,
     152,
     150,
     151,
     153,
     152,
     151,
     150,
     202,
     201,
     200,
     250,
     251,
     252,
     300,
     301,
     302,
     350,
     351,
     352,
     14,
     39,
     64,
     39,
     89,
     64,
     114,
     16,
     41,
     66,
     91,
     18,
     43,
     68,
     93,
     70,
     71,
     172,
     173,
     174,
     222,
     223,
     224,
     272,
     273,
     274,
     322,
     323,
     324,
     372,
     373,
     374,
     122,
     422,
     423,
     424,
     472,
     473,
     474,
     522,
     620,
     594,
     594,
     620,
     594,
     595,
     570,
     545,
     520,
     543,
     568,
     593,
     618,
     616,
     591,
     566,
     541,
     539,
     564,
     589,
     614,
     589,
     562,
     610,
     585,
     560,
     535,
     510,
     533,
     558,
     583,
     608,
     606,
     581,
     556,
     531,
     604,
     579,
     554,
     529,
     502,
     458,
     460,
     213,
     188,
     163,
     166,
     165,
     164,
     470,
     475,
     476,
     477,
     463,
     360,
     310,
     335,
     309,
     308,
     307,
     332,
     333,
     334,
     359,
     357,
     356,
     357,
     358,
     331,
     306,
     281,
     256,
     257,
     283,
     258,
     282,
     284,
     285,
     260,
     259,
     284,
     135,
     134,
     133,
     132,
     160,
     159,
     158,
     157,
     156,
     181,
     206,
     231,
     364,
     365,
     367,
     368,
     366,
     369,
     418,
     417,
     393,
     263,
     288,
     313,
     338,
     238,
     443,
     468,
     182,
     183,
     184,
     185,
     167,
     168,
     243,
     241,
     242,
     244,
     193,
     218,
     268,
     293,
     343,
     266,
     291,
     316,
     341,
     380,
     405,
     430,
     455,
     383,
     408,
     433,
     434,
     435,
     363,
     442,
     467,
     413,
     419,
     438,
     414,
     416,
     415,
   ];
const grid = new SearchGrid(25, 25);
const auditoriumStart = 527;
const floorStart = 210;
grid.cells[floorStart].setProperty({ 'startPosition': true });
grid.cells[2].setProperty({ 'goalPosition': true });
for (let i = 0; i < auditoriumWall.length; i++) {
  grid.cells[floorPlan[i]].setProperty({wall: true });
}

const agent = new Agent(grid);

const initialState = {
  endPos: 211,
  endPosBool: false,
  auth: false,
  imgSrc: '',
  imgFileName: '',
  toggleEmoji: false,
  err: '',
  giphy: [],
  loading: false,
  messages: [],
  messagesPrivate: [],
  missedMsg: [],
  toggleMissedMsg: false,
  notice: '',
  toggleGiphy: false,
  isLocked: true,
  typing: false,
  typingPrivate: false,
  typingUsers: [],
  typingUsersPrivate: [],
  username: '',
  user: null,
  users: [],
  verbs: '',
  isMatchPrivatePassword: false,
  privatePasswordInput: false,
  toggleMic: false,
  app: false,
  grid,
  agent,
  openList: agent.openList,
  closedList: agent.closedList,
  path: agent.path,
  currentCell: agent.currentCell,
  floor: 'floor',
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case END_POS:
      const width = 25;
      const height = 25;
      let numCells = width * height;
      let goalPos;
      
      for (let i=0; i<numCells; i++) {
        if (payload.grid.cells[i].properties.goalPosition) {
         goalPos = i;
         payload.grid.cells[i] = new GridCell(payload.grid.cells[i].properties);
        }
      };

      payload.grid = new SearchGrid(25, 25);
      payload.grid.cells[goalPos].setProperty({ 'goalPosition': true });
      
      if (payload.floor === 'aud') {
        for (let i = 0; i < auditoriumWall.length; i++) {
          payload.grid.cells[auditoriumWall[i]].setProperty({wall: true });
          payload.grid.cells[auditoriumStart].setProperty({ 'startPosition': true });
        }
      } else {
        for (let i = 0; i < floorPlan.length; i++) {
          payload.grid.cells[floorPlan[i]].setProperty({wall: true });
          payload.grid.cells[floorStart].setProperty({ 'startPosition': true });
        }
      }

      return {
        ...state,
        ...payload,
        agent: new Agent(payload.grid),
      };
    case TOGGLE_APP:
      return {
        ...state,
        app: payload,
      };
    case FLOOR:
      return {
        ...state,
        floor: payload,
      };
    case CLEAR_MISSED_MSG:
      return {
        ...state,
        missedMsg: [],
      };
    case CLEAR_NOTICES:
      return {
        ...state,
        notice: '',
      };
    case GET_MESSAGES:
      return {
        ...state,
        messages: [...payload],
      };
    case GET_MESSAGES_PRIVATE:
      return {
        ...state,
        messagesPrivate: [...payload],
      };
    case MESSAGE_SENT:
      return {
        ...state,
        messages: [...state.messages, payload],
      };
    case MESSAGE_SENT_PRIVATE:
      return {
        ...state,
        messagesPrivate: [...state.messagesPrivate, payload],
      };
    case LOADING:
      return {
        ...state,
        loading: payload,
      };
    case LOGGED_IN:
      return {
        ...state,
        auth: true,
        missedMsg: payload.missedMsg,
        username: payload.user.username,
        user: payload.user,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        err: payload,
      };
    case LOGOUT:
      return {
        ...state,
        auth: false,
      };
    case RECEIVE_GIPHY:
      return {
        ...state,
        giphy: payload,
      };
    case STOPPED_TYPING:
      return {
        ...state,
        typing: false,
        typingUsers: state.typingUsers.filter(username => username !== payload),
      };
    case STOPPED_TYPING_PRIVATE:
      return {
        ...state,
        typingPrivate: false,
        typingUsersPrivate: state.typingUsersPrivate.filter(username => username !== payload),
      };
    case TOGGLE_GIPHY:
      return {
        ...state,
        toggleGiphy: payload,
      };
    case TOGGLE_EMOJI:
      return {
        ...state,
        toggleEmoji: payload,
      };
    case TOGGLE_MISSED_MSG:
      return {
        ...state,
        toggleMissedMsg: !state.toggleMissedMsg,
      };
    case TOGGLE_LOCK:
      return {
        ...state,
        isLocked: payload,
      };
    case TOGGLE_MIC:
      return {
        ...state,
        toggleMic: payload,
      };
    case TOGGLE_PRIVATE_PW_INPUT:
      return {
        ...state,
        privatePasswordInput: payload,
      };
    case TYPING:
      return {
        ...state,
        typing: true,
        typingUsers: state.typingUsers.includes(payload)
          ? state.typingUsers
          : [...state.typingUsers, payload],
        verbs: state.typingUsers.length > 1 ? 'are' : 'is',
      };
    case TYPING_PRIVATE:
      return {
        ...state,
        typingPrivate: true,
        typingUsersPrivate: state.typingUsersPrivate.includes(payload)
          ? state.typingUsersPrivate
          : [...state.typingUsersPrivate, payload],
        verbs: state.typingUsersPrivate.length > 1 ? 'are' : 'is',
      };
    case USER_CONNECTED:
      return {
        ...state,
        notice: payload.notice,
        users: payload.users.length <= 1 ? payload.users : sortOnlineStatus(payload.users),
      };
    case USER_DISCONNECTED:
      return {
        ...state,
        notice: payload.notice,
        users: payload.users.length <= 1 ? payload.users : sortOnlineStatus(payload.users),
      };
    case SET_IMAGE_SRC:
      return {
        ...state,
        imgSrc: payload,
      };
    case SET_FILE_NAME:
      return {
        ...state,
        imgFileName: payload,
      };
    case UNLOCK_PRIVATE_PASSWORD:
      return {
        ...state,
        isMatchPrivatePassword: payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
