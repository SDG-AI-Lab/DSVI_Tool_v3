import produce from 'immer'
import { ReducerInitialStateType } from './reducerInitialState'

export const reducer = (state: ReducerInitialStateType, action) => {
  switch (action.type) {
    case 'CHANGE_COORDS':
      return produce(state, (draft) => {
        draft.map_settings.latlong = action.payload
      })
    case 'CHANGE_COUNTRY':
      return produce(state, (draft) => {
        draft.country = action.payload
      })
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
    case 'TOGGLE_INFOBOX_DATA':
      return {
        ...state,
        show_infoBox_data: !state.show_infoBox_data,
      }
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        show_sidebar: !state.show_sidebar,
      }
    case 'CHANGE_LEVEL':
      return produce(state, (draft) => {
        draft.level = action.payload.level
      })
    case 'TOGGLE_RESET_SETTINGS':
      return produce(state, (draft) => {
        draft.reset_settings = !draft.reset_settings
      })
    case 'RESET_INITIAL_STATE_SETTINGS':
      return action.payload
    case 'TOGGLE_AREA_OF_INTEREST':
      return {
        ...state,
        show_area_of_interest: !state.show_area_of_interest,
      }
    case 'TOGGLE_SOCIOECONOMIC':
      return produce(state, (draft) => {
        draft.socioeconomic.status = !draft.socioeconomic.status
      })
    case 'CHANGE_SOCIOECONOMIC':
      return produce(state, (draft) => {
        draft.socioeconomic['data'][action.index_1]['data'][action.index_2] =
          action.payload
      })
    case 'CHANGE_SOCIOECONOMIC_DATA_COLUMN':
      return {
        ...state,
        socioeconomic: {
          status: state.socioeconomic.status,
          data: state.socioeconomic.data,
          data_column: action.payload,
        },
      }
    case 'TOGGLE_GEODATA':
      return produce(state, (draft) => {
        draft.geodata.status = !draft.geodata.status
      })
    case 'CHANGE_GEOLAYERS_DESCRIPTION':
      return produce(state, (draft) => {
        draft.geolayers_description[action.layer] = action.payload
      })
    case 'CHANGE_GEODATA':
      return produce(state, (draft) => {
        draft.geodata['data'][action.index_1]['data'][action.index_2] =
          action.payload
      })
    case 'CHANGE_ACTIVE_LEGENDS':
      return produce(state, (draft) => {
        let newLegends = draft.activeLegends

        if (action.payload.status == true) {
          newLegends.push(action.payload)
        } else if (action.payload.status == false) {
          newLegends = newLegends.filter((item) => {
            return item.slug != action.payload.slug
          })
        }

        /*For DHS indicators. ONLY*/
        if (
          action.payload.hasOwnProperty('Name') &&
          action.payload.hasOwnProperty('Additional Information')
        ) {
          newLegends = newLegends.filter((item) => {
            return !item.hasOwnProperty('Name')
          })
          if (action.payload.id != 0) {
            newLegends.push(action.payload)
          }
        }
        draft.activeLegends = newLegends
      })
    case 'DRAG_DROP_CHANGE_ACTIVE_LEGENDS':
      return produce(state, (draft) => {
        const items = draft.activeLegends
        const [reorderedItem] = items.splice(action.payload.source.index, 1)
        items.splice(action.payload.destination.index, 0, reorderedItem)
        draft.activeLegends = items
      })
    case 'DRAG_DROP_SIDEBAR_SOCIOECONOMIC':
      return produce(state, (draft) => {
        if (action.payload.destination) {
          const items = draft.socioeconomic.data
          const [reorderedItem] = items[action.index_1]['data'].splice(
            action.payload.source.index,
            1
          )
          items[action.index_1]['data'].splice(
            action.payload.destination.index,
            0,
            reorderedItem
          )
          draft.socioeconomic.data = items
        }
      })
    case 'DRAG_DROP_SIDEBAR_GEODATA':
      return produce(state, (draft) => {
        if (action.payload.destination) {
          const items = draft.geodata.data
          const [reorderedItem] = items[action.index_1]['data'].splice(
            action.payload.source.index,
            1
          )
          items[action.index_1]['data'].splice(
            action.payload.destination.index,
            0,
            reorderedItem
          )
          draft.geodata.data = items
        }
      })
    case 'DRAG_DROP_CHANGE_ACTIVE_GEODATA':
      return produce(state, (draft) => {
        const items = draft.geodata.data
        const [reorderedItem] = items[action.index_1]['data'].splice(
          action.payload.source.index,
          1
        )
        items[action.index_1]['data'].splice(
          action.payload.destination.index,
          0,
          reorderedItem
        )
        draft.geodata.data = items
      })
    case 'TOGGLE_VULNERABILITY':
      return produce(state, (draft) => {
        draft.vulnerability = !draft.vulnerability
      })
    case 'FETCH_CSV_DATA_VULNERABILITY':
      return {
        ...state,
        csv_data_vulnerability: action.payload,
      }
    case 'CHANGE_CATEGORIES':
      return produce(state, (draft) => {
        draft.categories[action.index_1] = action.payload
      })

    case 'DRAG_DROP_CATEGORIES':
      return produce(state, (draft) => {
        const { source, destination } = action.payload
        if (!destination) return
        const items = Array.from(action.categories)
        const [reorderedItem] = items.splice(source.index, 1)
        items.splice(destination.index, 0, reorderedItem)
        draft.categories = items
      })

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
    case 'TOGGLE_DHS_INDICATOR':
      return {
        ...state,
        dhs_indicator: !state.dhs_indicator,
      }
    case 'SELECT_DHS_DATA_COLUMN':
      return {
        ...state,
        selected_dhs_data_column: action.payload,
      }
    case 'TOGGLE_DRAW_OF_INTEREST':
      return {
        ...state,
        draw_area_of_interest: !state.draw_area_of_interest,
      }
    // case 'TOGGLE_STATISTICS':
    //   return {
    //     ...state,
    //     show_statistics: !state.show_statistics,
    //   }
    case 'FETCH_CSV_DATA':
      return {
        ...state,
        csv_data: action.payload,
      }
    case 'FETCH_DHS_COLUMN':
      return {
        ...state,
        dhs_data_column: action.payload,
      }
    case 'QUIT_HOMEPAGE':
      return {
        ...state,
        on_homepage: action.payload,
      }
    default:
      return state
  }
}
