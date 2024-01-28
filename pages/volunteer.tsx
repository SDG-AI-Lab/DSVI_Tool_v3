const data = [
  {
    id: 1,
    name: 'Andrei Prokorov',
    image: './images/Photo_Andrei_Prokhorov.jpg',
    motivation:
      'I hope that my work in the UNDP is a small contribution to improving the quality of life of people, in difficult life circumstances.',
    Bio: "Software engineer, with 3+ years of experience. Completed Master's degree in Aircraft Flight Operation in 2012. ",
    Linkedin: 'https://www.linkedin.com/in/andrei-prokhorov-2b5303213',
  },
  {
    id: 2,
    name: 'Vadim Fattakhov',
    image: './images/Photo_Vadim_Fattakhov.jpg',
    motivation:
      'I am a web developer motivated to contribute to the United Nations project, eager to enhance web solutions to advance UN initiatives. Passionate about leveraging technology for social good.',
    Bio: 'Web Developer with over three years of experience. Previously, Petroleum Engineer with 15 years of experience.',
    Linkedin: 'https://www.linkedin.com/in/vadim-fthv/',
  },
  // {
  //   id: 3,
  //   name: 'Name Name',
  //   image: 'https://via.placeholder.com/250',
  //   motivation:
  //     'Sample motivation Sample motivation  Sample motivation Sample motivation Sample motivation',
  //   Bio: 'Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio',
  //   Linkedin: 'https://www.linkedin.com',
  // },
]

/**
 * Utility to detect if you're on the server, or in the browser.
 */
const isBrowser = typeof window !== 'undefined'
const Volunteer = () => {
  return isBrowser ? (
    <div className="my-2 mx-5 rounded-lg bg-white px-2 py-5">
      <div className="container">
        <p>
          <b>DSVI Volunteer Developer Team</b>
        </p>
        <p>
          Online UN Volunteers are actively contributing to DSVI Volunteer
          Developer Team Project. Many thanks to all our volunteers for their
          contribution
        </p>
        <br></br>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {data.map((val, index) => {
            return (
              <div key={val.id} className="col">
                <div className="card h-100">
                  <img src={val.image} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <div className="card-text menu">
                      <div className="py-2">
                        <a
                          href={val.Linkedin}
                          className="-m-2 flex items-center p-2"
                          target="_blank"
                        >
                          <img
                            src="./images/linkedin.png"
                            alt="Logo"
                            width={30}
                            height={30}
                            className="block h-auto w-5 flex-shrink-0"
                          />
                          <span className="ml-3 block text-base font-medium text-gray-900">
                            {val.name}
                          </span>
                        </a>
                      </div>
                    </div>
                    <p className="card-title">{val.motivation}</p>
                    <p className="card-text">{val.Bio}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  ) : null
}
export default Volunteer
