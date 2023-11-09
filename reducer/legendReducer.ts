export type LegendReducerStateType = {
  title: string
  description: string
  data: any[]
}

export const initialState: LegendReducerStateType = {
  title: '',
  description: '',
  data: [],
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_ALL_DATA': {
      return {
        ...state,
        title: action.payload.title,
        description: action.payload.description,
        data: action.payload.data,
      }
    }
    case 'RESET_DATA': {
      return {
        title: '',
        description: '',
        data: [],
      }
    }
    case 'TOGGLE_SHOW_DATA':
      return {
        ...state,
        show_data: !state.show_data,
      }
    case 'TOGGLE_SIDEBAR_DATA':
      return {
        ...state,
        show_sidebar_data: !state.show_sidebar_data,
      }
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        show_sidebar: !state.show_sidebar,
      }
    case 'TOGGLE_AREA_OF_INTEREST':
      return {
        ...state,
        show_area_of_interest: !state.show_area_of_interest,
      }
    case 'TOGGLE_SOCIOECONOMIC':
      return {
        ...state,
        socioeconomic: {
          status: !state.socioeconomic.status,
          data: state.socioeconomic.data,
        },
      }
    case 'CHANGE_SOCIOECONOMIC':
      return {
        ...state,
        socioeconomic: {
          status: state.socioeconomic.status,
          data: action.payload,
        },
      }
    case 'TOGGLE_GEODATA':
      return {
        ...state,
        geodata: {
          status: !state.geodata.status,
          data: state.geodata.data,
        },
      }
    case 'CHANGE_GEODATA':
      return {
        ...state,
        geodata: {
          status: state.geodata.status,
          data: action.payload,
        },
      }
    case 'TOGGLE_VULNERABILITY':
      return {
        ...state,
        vulnerability: !state.vulnerability,
      }
    case 'CHANGE_CATEGORIES':
      return {
        ...state,
        categories: action.payload,
      }
    case 'TOGGLE_DSV_INDICATOR':
      return {
        ...state,
        dsv_indicator: !state.dsv_indicator,
      }

    case 'SELECT_DATA_COLUMN':
      return {
        ...state,
        selected_data_column: action.payload,
      }
    case 'TOGGLE_DRAW_OF_INTEREST':
      return {
        ...state,
        draw_area_of_interest: !state.draw_area_of_interest,
      }
    case 'TOGGLE_STATISTICS':
      return {
        ...state,
        show_statistics: !state.show_statistics,
      }
    default:
      return state
  }
}
