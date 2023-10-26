type DropDownType = {
  heading: string
  desc: string
}

const dropDownContent: DropDownType[] = [
  {
    heading: 'SV Prediction: Random Forest',
    desc: 'This layer is a prediction of Social Vulnerability with sklearns Random Forest Regressor. A random forest is a meta estimator that fits a number of classifying decision trees on various sub-samples of the dataset and uses averaging to improve the predictive accuracy and control over-fitting. The sub-sample size is controlled with the max_samples parameter if bootstrap=True (default), otherwise the whole dataset is used to build each tree.',
  },
  {
    heading: 'SV: Prediction: XGBoost',
    desc: 'This algorithm builds an additive model in a forward stage-wise fashion; it allows for the optimization of arbitrary differentiable loss functions. In each stage n_classes_ regression trees are fit on the negative gradient of the loss function, e.g. binary or multiclass log loss. Binary classification is a special case where only a single regression tree is induced.',
  },
  {
    heading: 'Accessibility: Education Facility',
    desc: 'This layer shows the time it takes to drive an individual to the next available Education Facility. The data was provided by OpenStreetMap. The download source is humdata.org',
  },
  {
    heading: 'Accessibility: Health Institution',
    desc: 'This layer shows the time it takes to drive an individual to the next available Health Facility. The data was provided by OpenStreetMap. The download source is humdata.org',
  },
  {
    heading: 'Accessibility: Financial Service',
    desc: 'This layer shows the time it takes to drive an individual to the next available Financial Facility. The data was provided by OpenStreetMap. The download source is humdata.org',
  },
  {
    heading: 'Population Counts',
    desc: 'The population data is downloaded from: https://dataforgood.facebook.com/dfg/tools/high-resolution-population-density-maps#methodology',
  },
  {
    heading: 'Celltowers',
    desc: 'Celltower data is by: OpenCellID. URL: https://opencellid.org/downloads.php ',
  },
  {
    heading: 'Nightlight Intensity',
    desc: 'Nightlight Intensity is provided by NASA: https://www.earthdata.nasa.gov/learn/backgrounders/nighttime-lights',
  },
  {
    heading: 'Relative Wealth',
    desc: 'The Relative Wealth Index predicts the relative standard of living within countries using de-identified connectivity data, satellite imagery and other nontraditional data sources. The data is provided for 93 low and middle-income countries at 2.4km resolution. Please cite / attribute any use of this dataset using the following: Microestimates of wealth for all low- and middle-income countries Guanghua Chi, Han Fang, Sourav Chatterjee, Joshua E. Blumenstock Proceedings of the National Academy of Sciences Jan 2022, 119 (3) e2113658119; DOI: 10.1073/pnas.2113658119 More details are available here: https://dataforgood.fb.com/tools/relative-wealth-index/ Research publication for the Relative Wealth Index is available here: https://www.pnas.org/content/119/3/e2113658119 Press coverage of the release of the Relative Wealth Index here: https://www.fastcompany.com/90625436/these-new-poverty-maps-could-reshape-how-we-deliver-humanitarian-aid An interactive map of the Relative Wealth Index is available here: http://beta.povertymaps.net/',
  },
  { heading: 'GDP', desc: 'This is about boosting XG' },
  { heading: 'Plant Health', desc: 'This is about forests' },
  { heading: 'Temperature (Max)', desc: 'This is about boosting XG' },
  { heading: 'Land Use Class', desc: 'This is about forests' },
  { heading: 'Elevation', desc: 'This is about boosting XG' },
]

type TabContentType = {
  tabHead: string
  imgLinks: string[]
  text?: {
    h1: string
    p: string
  }
  dropdown?: DropDownType[]
}

export const tabContent: TabContentType[] = [
  {
    tabHead: 'How to use',
    imgLinks: [
      'https://knowsdgs.jrc.ec.europa.eu/themes/sdgs/assets/img/sdg2.png',
      'https://knowsdgs.jrc.ec.europa.eu/themes/sdgs/assets/img/sdg3.png',
      'https://knowsdgs.jrc.ec.europa.eu/themes/sdgs/assets/img/sdg4.png',
    ],
    text: {
      h1: 'Welcome to the DSVI Tool',
      p: 'Shift + drawing a box with your mouse will allow you to zoom into the area on the map',
    },
  },
  {
    tabHead: 'Social Vulnerability',
    imgLinks: [
      'https://knowsdgs.jrc.ec.europa.eu/themes/sdgs/assets/img/sdg2.png',
      'https://knowsdgs.jrc.ec.europa.eu/themes/sdgs/assets/img/sdg3.png',
      'https://knowsdgs.jrc.ec.europa.eu/themes/sdgs/assets/img/sdg4.png',
    ],
    text: {
      h1: 'Social Vulnerability',
      p: 'Social Vulnerability (SV) is the capacity of individuals or communities to cope with social and environmental shocks (Adger 2000, Cutter 2003). This includes climate change, natural disasters, and other societal risks. Vulnerable groups have a disproportionate risk of being affected and experiencing more profound consequences, due to their socio-economic preconditions. SV assessments help to better map the connection between local conditions, social characteristics, or individual vulnerabilities and risks. The calculation of SV scores is a frequent practice to measure a community’s ability to respond to outside stressors and risks. It is an indirect way to quantify resilience. Having such an assessment helps to understand, get prepared and respond in a more effective manner, using a combination of the most appropriate tools once the risk materializes.',
    },
  },
  {
    tabHead: 'Data Exploration',
    imgLinks: [
      'https://knowsdgs.jrc.ec.europa.eu/themes/sdgs/assets/img/sdg2.png',
      'https://knowsdgs.jrc.ec.europa.eu/themes/sdgs/assets/img/sdg3.png',
      'https://knowsdgs.jrc.ec.europa.eu/themes/sdgs/assets/img/sdg4.png',
    ],
    dropdown: dropDownContent,
  },
  {
    tabHead: 'Methods',
    imgLinks: [
      'https://knowsdgs.jrc.ec.europa.eu/themes/sdgs/assets/img/sdg2.png',
      'https://knowsdgs.jrc.ec.europa.eu/themes/sdgs/assets/img/sdg3.png',
      'https://knowsdgs.jrc.ec.europa.eu/themes/sdgs/assets/img/sdg4.png',
    ],
    text: {
      h1: 'Methods',
      p: 'No method details yet.',
    },
  },
]
