export const initalState = {
    "show_data":false,
    "show_sidebar_data":false,
    "show_sidebar":true,
    "level":1,
    "show_area_of_interest": false,
    "socioeconomic": {
        "status": false,
        "data": [
            {
                id: 1,
                slug: 'realtive_wealth_district',
                title: 'Relative Wealth: District',
                status: false,
                value: 70,
                priority:1
            },
            {
                id: 2,
                slug: 'gdp_ppp',
                title: 'GDP / PPP',
                status: false,
                value: 70,
                priority:2
            },
            {
                id: 3,
                slug: 'health_care_institutions',
                title: 'Health Care Institutions',
                status: false,
                value: 70,
                priority:3,
                "legend":[
                    {
                        status:true,
                        position:'topbar',
                        title:"Health Care Facilities",
                        description:"Hover on map tile to see more data"
                    },
                    {
                        status:false
                    }
                ]
            },
            {
                id: 4,
                slug: 'sv_ground_truth',
                title: 'SV: Ground Truth',
                status: false,
                value: 70,
                priority:4
            },
            {
                id: 5,
                slug: 'financial_institutions',
                title: 'Financial Institutions',
                status: false,
                value: 70,
                priority:5,
                "legend":[
                    {
                        status:true,
                        position:'topbar',
                        title:"Financial Facilities",
                        description:"Hover on map tile to see more data"
                    },
                    {
                        status:false
                    }
                ]
            },
            {
                id: 6,
                slug: 'population_density',
                title: 'Population Density',
                status: false,
                value: 70,
                priority:6
            },
            {
                id: 7,
                slug: 'educational_facilities',
                title: 'Educational Facilities',
                status: false,
                value: 70,
                priority:7,
                "legend":[
                    {
                        status:true,
                        position:'topbar',
                        title:"Educational Facilities",
                        description:"Hover on map tile to see more data"
                    },
                    {
                        status:false
                    }
                ]
            },
            {
                id: 8,
                slug: 'population_density_mask',
                title: 'Population Density Mask',
                status: false,
                value: 70,
                priority:8
            },
            {
                id: 9,
                slug: 'built_environment',
                title: 'Built Environment',
                status: false,
                value: 70,
                priority:9
            },
            {
                id: 10,
                slug: 'disaster_count',
                title: 'Disaster Count',
                status: false,
                value: 70,

            },



        ]
    },
    "geodata": {
        "status": false,
        "data": [
            {
                id: 1,
                slug: 'distance_maps',
                title: 'Distance Maps',
                data: [
                    {
                        id: 1.1,
                        slug: 'distance_maps',
                        title: 'Distance Maps',
                        status: false,
                        value: 70
                    },
                    {
                        id: 1.2,
                        slug: 'distance_to_healthcare',
                        title: 'Distance to Healthcare',
                        status: false,
                        value: 70
                    },
                    {
                        id: 1.3,
                        slug: 'distance_to_coast',
                        title: 'Distance to Coast',
                        status: false,
                        value: 70
                    },
                    {
                        id: 1.4,
                        slug: 'distance_to_finance',
                        title: 'Distance to Finance',
                        status: false,
                        value: 70


                    }
                ]
            },
            {
                id: 2,
                slug: 'bio_physical',
                title: 'Bio Physical',
                data: [
                    {
                        id: 2.1,
                        slug: 'Elevation',
                        title: 'Elevation',
                        status: false,
                        value: 70
                    },
                    {
                        id: 2.2,
                        slug: 'max_temp',
                        title: 'Max Temp',
                        status: false,
                        value: 70
                    },
                    {
                        id: 2.3,
                        slug: 'plant_health',
                        title: 'Plant Health',
                        status: false,
                        value: 70
                    }
                ]
            },
            {
                id: 3,
                slug: 'socio_economic',
                title: 'Socio Economic',
                data: [
                    {
                        id: 3.1,
                        slug: 'sv_prediction',
                        title: 'SV_Prediction',
                        status: false,
                        value: 70
                    },
                    {
                        id: 3.2,
                        slug: 'nightlight_int',
                        title: 'Nightlight Int',
                        status: false,
                        value: 70
                    },
                    {
                        id: 3.3,
                        slug: 'pop_density',
                        title: 'Pop. Density',
                        status: false,
                        value: 70
                    },
                    {
                        id: 3.4,
                        slug: 'roads_lines',
                        title: 'Roads (lines)',
                        status: false,
                        value: 70
                    },
                    {
                        id: 3.5,
                        slug: ' healthsites_points',
                        title: 'Healthsites (points)',
                        status: false,
                        value: 70
                    },
                    {
                        id: 3.6,
                        slug: 'relative_wealth',
                        title: 'Relative Wealth',
                        status: false,
                        value: 70
                    },
                ]
            }
        ]
    },
    "vulnerability": false,
    "categories": [
        {
            id: 1,
            title: "Very Low",
            slug: 'very_low',
            color: 'bg-lime-500',
            status: true
        },
        {
            id: 2,
            title: "Low",
            slug: 'low',
            color: 'bg-green-500',
            status: true
        },
        {
            id: 3,
            title: "Middle",
            slug: 'middle',
            color: 'bg-yellow-500',
            status: true
        },
        {
            id: 4,
            title: "High",
            slug: 'high',
            color: 'bg-orange-500',
            status: true
        },
        {
            id: 5,
            title: "Very High",
            slug: 'very_high',
            color: 'bg-red-500',
            status: true
        },

    ],
    "dsv_indicator": false,
    "data_column": [
        {
            id: 0,
            slug: 'select_none',
            title: 'SELECT_NONE',
            status: false
        },
        {
            id: 1,
            slug: 'Main floor material',
            title: 'Main floor material',
            status: false
        },
        {
            id: 2,
            slug: 'Number of household members (listed)',
            title: 'Number of household members (listed)',
            status: false
        },
        {
            id: 3,
            slug: 'Frequency of listening to radio',
            title: 'Frequency of listening to radio',
            status: false
        },
        {
            id: 4,
            slug: 'Age of household head',
            title: 'Age of household head',
            status: false
        },
        {
            id: 5,
            slug: 'Time to get to water source',
            title: 'Time to get to water source',
            status: false
        },
        {
            id: 6,
            slug: 'Beating justified if wife goes out without telling husband',
            title: 'Beating justified if wife goes out without telling husband',
            status: false
        },
        {
            id: 7,
            slug: 'Getting medical help for self: distance to health facility',
            title: 'Getting medical help for self: distance to health facility',
            status: false
        },

        {
            id: 8,
            slug: 'Wealth index combined',
            title: 'Wealth index combined',
            status: false
        },
        {
            id: 9,
            slug: 'How often uses internet',
            title: 'How often uses internet',
            status: false
        },
        {
            id: 10,
            slug: 'Annual_Precipitation_2000',
            title: 'Annual_Precipitation_2000',
            status: false
        },
        {
            id: 11,
            slug: 'Aridity_2000',
            title: 'Aridity_2000',
            status: false
        },
        {
            id: 12,
            slug: 'BUILT_Population_1990',
            title: 'BUILT_Population_1990',
            status: false
        },

        {
            id: 13,
            slug: 'Annual_Precipitation_2010',
            title: 'Annual_Precipitation_2010',
            status: false
        },
        {
            id: 14,
            slug: 'BUILT_Population_2014',
            title: 'BUILT_Population_2014',
            status: false
        },
        {
            id: 15,
            slug: 'Day_Land_Surface_Temp_2015',
            title: 'Day_Land_Surface_Temp_2015',
            status: false
        },
        {
            id: 16,
            slug: 'Day_Land_Surface_Temp_2005',
            title: 'Day_Land_Surface_Temp_2005',
            status: false
        }
    ],
    "selected_data_column": "0",
    "draw_area_of_interest": false,
    "statistics": false,

}

export const reducer = (state, action) => {
    switch (action.type) {
        case "TOGGLE_SHOW_DATA":
            return {
                ...state,
                show_data: !state.show_data,
            };
            case "TOGGLE_SIDEBAR_DATA":
                return {
                    ...state,
                    show_sidebar_data: !state.show_sidebar_data,
                };
        case "TOGGLE_SIDEBAR":
            return {
                ...state,
                show_sidebar: !state.show_sidebar,
            };

            case "CHANGE_LEVEL":
                console.log("payload"+JSON.stringify(action.payload));
                return {
                    ...state,
                    level: action.payload.level,
                };    
        case "TOGGLE_AREA_OF_INTEREST":
            return {
                ...state,
                show_area_of_interest: !state.show_area_of_interest,
            };

        case "TOGGLE_SOCIOECONOMIC":
            return {
                ...state,
                socioeconomic: {
                    status: !state.socioeconomic.status,
                    data: state.socioeconomic.data
                }
            };
        case "CHANGE_SOCIOECONOMIC":
            return {
                ...state,
                socioeconomic: {
                    status: state.socioeconomic.status,
                    data: action.payload
                }
            };
        case "TOGGLE_GEODATA":
            return {
                ...state,
                geodata: {
                    status: !state.geodata.status,
                    data: state.geodata.data
                }
            };
        case "CHANGE_GEODATA":
            return {
                ...state,
                geodata: {
                    status: state.geodata.status,
                    data: action.payload
                }
            };
        case "TOGGLE_VULNERABILTY":
            return {
                ...state,
                vulnerability: !state.vulnerability,
            };



        case "CHANGE_CATEGORIES":
            return {
                ...state,
                categories: action.payload
            };
        case "TOGGLE_DSV_INDICATOR":
            return {
                ...state,
                dsv_indicator: !state.dsv_indicator,
            };

        case "SELECT_DATA_COLUMN":
            return {
                ...state,
                selected_data_column: action.payload,
            };
        case "TOGGLE_DRAW_OF_INTEREST":
            return {
                ...state,
                draw_area_of_interest: !state.draw_area_of_interest,
            };
        case "TOGGLE_STATISTICS":
            return {
                ...state,
                show_statistics: !state.show_statistics,
            };

        default:
            return state
    }

}