const initialState = {
  dogs: [], //copia burda para hacerle magia
  allDogs: [], //los buenos dogs
  temperaments: [],
  chocoDetail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };
    case "GET_TEMPS":
      return {
        ...state,
        temperaments: action.payload,
      };
    case "GET_QUERY":
      return {
        ...state,
        allDogs: action.payload,
      };
    case "GET_DETAIL":
      return {
        ...state,
        chocoDetail: action.payload,
      };
    case "POST_DOG":
      return {
        ...state,
      };
    case "DELETE_BY_ID":
      return {
        ...state,
      };
    case "FILTER_SOURCE":
      const copy = [...state.dogs];
      const bySource =
        action.payload === "MIXED"
          ? copy
          : action.payload === "DB"
          ? state.dogs.filter((el) => el.createdInDB)
          : state.dogs.filter((el) => !el.createdInDB);
      return {
        ...state,
        allDogs: bySource,
      };
    case "SORT_WEIGHT":
      //   const falseDogs = [...state.dogs];
      const sortWait =
        action.payload === "Low"
          ? state.dogs.sort((a, b) => {
              if (a.weight.split("-")[0] > b.weight.split("-")[0]) {
                return 1;
              }
              if (b.weight.split("-")[0] > a.weight.split("-")[0]) {
                return -1;
              }
              return 0;
            })
          : state.dogs.sort((a, b) => {
              if (a.weight.split("-")[0] > b.weight.split("-")[0]) {
                return -1;
              }
              if (a.weight.split("-")[0] > b.weight.split("-")[0]) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        allDogs: sortWait,
      };
    case "SORT_NAME":
      const copeeDogs = [...state.dogs];
      const sorted =
        action.payload === "ASC"
          ? state.dogs.slice().sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : action.payload === "DSC"
          ? state.dogs.slice().sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            })
          : copeeDogs;
      return {
        ...state,
        allDogs: sorted,
      };
    case "FILTER_TEMPS":
      const filteredByTemp =
        action.payload === "ALL"
          ? state.dogs
          : state.dogs.filter((element) =>
              element.temperaments.map((el) => el.name).includes(action.payload)
            );
      return {
        ...state,
        allDogs: filteredByTemp,
      };
    case "CLEAR":
      return {
        ...state,
        chocoDetail: [],
      };
    default:
      return {
        ...state,
      };
  }
}
export default rootReducer;