import { useAuth } from '../components/hooks/useAuth'

const data = [
  {
    id: 1,
    text: 'This is the DSVI Tajikistan Online Tool developed by SDG AI Lab and UN Online Volunteers for UNDP Tajikistan in 2022',
  },
  {
    id: 2,
    text: 'The SDG AI Lab is a joint initiative of UNDP BPPS teams, and it is hosted under UNDP IICPSD. The Lab has a mission to harness the potential of frontier technologies such as Artificial Intelligence (AI), Machine Learning (ML), Geographic Information Systems (GIS) for sustainable development. SDG AI Lab provides research, development, and advisory services in the areas of frontier technologies and sustainable development. As well, the Lab supports UNDP’s internal capacity strengthening efforts for the increasing demand for digital solutions. To bridge the talent gap in the use of frontier technologies in development contexts, the Lab mobilizes a community of volunteer data scientists, connecting UNDP teams and highly skilled data scientists to address development challenges with digital solutions.',
  },
]

const Home = () => {
  console.log('re-render about us')
  const { protectedRoute } = useAuth()
  protectedRoute()
  return (
    <div className="my-2 mx-5 rounded-lg bg-white px-2 py-5">
      <div className="container">
        {data.map((val, index) => {
          return (
            <p
              key={val.id}
              className="text-md py-2 px-5 font-sans font-normal text-gray-700 "
            >
              {val.text}
            </p>
          )
        })}

        <p className="py-5 px-5 ">
          <a href="./volunteer" className="volunteer-link" target="_blank">
            <button className="rounded border border-blue-500 bg-transparent py-2 px-4 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white">
              United Nations Online Volunteers
            </button>
          </a>
        </p>
      </div>
    </div>
  )
}
export default Home
