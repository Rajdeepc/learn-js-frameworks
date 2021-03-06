import { GET_GITHUB_DATA_SUCCESS,
  GET_GITHUB_DATA_FAILURE, 
  GET_YOUTUBE_DATA_SUCCESS, 
  GET_YOUTUBE_DATA_FAILURE,
  PROFILE_DATA_RECEIVED,
  PROFILE_DATA_FAILED,
  SEARCH_TEXT
} 
from './category.action.types'; 

const INITIAL_STATE = {
  isGithubApiSuccess: false,
  isYoutubeApiSuccess: false,
  githubAPiData: [],
  youtubeApiData: [],
  isProfileApiSuccess: false,
  profileData:[],
  error:{},
  searchText: ''
};

const CategoryDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_GITHUB_DATA_SUCCESS:
      return {
        ...state,
        isGithubApiSuccess: true,
        githubAPiData: action.payload.items,
      };
    case GET_GITHUB_DATA_FAILURE:
      return {
        ...state,
        isGithubApiSuccess: false,
      };
    case GET_YOUTUBE_DATA_SUCCESS:
      return {
        ...state,
        isYoutubeApiSuccess: true,
        youtubeApiData: action.payload.items,
      };
    case GET_YOUTUBE_DATA_FAILURE:
      return {
        ...state,
        isYoutubeApiSuccess: false,
      };
    case PROFILE_DATA_RECEIVED:
      return {
        ...state,
        isProfileApiSuccess: true,
        profileData: action.payload.profile
      };
    case PROFILE_DATA_FAILED:
      return {
        ...state,
        isProfileApiSuccess: false,
        error: action.payload
      };
      case SEARCH_TEXT:
        return {
          ...state,
          searchText: action.text
        };
    default:
      return state;
  }
};

export default CategoryDataReducer;
