const data=[
  {
    id:1,
    text:"This is the DSVI Development Tool developed by SDG AI Lab and UN Online Volunteers"
  },
  {
    id:2,
    text:"The SDG AI Lab is a joint initiative of UNDP BPPS teams, and it is hosted under UNDP IICPSD. The Lab has a mission to harness the potential of frontier technologies such as Artificial Intelligence (AI), Machine Learning (ML), Geographic Information Systems (GIS) for sustainable development. SDG AI Lab provides research, development, and advisory services in the areas of frontier technologies and sustainable development. As well, the Lab supports UNDP’s internal capacity strengthening efforts for the increasing demand for digital solutions. To bridge the talent gap in the use of frontier technologies in development contexts, the Lab mobilizes a community of volunteer data scientists, connecting UNDP teams and highly skilled data scientists to address development challenges with digital solutions."
  },
  {
    id:3,
    text:"."
  },
  {
    id:4,
    text:"."
    
  },
  {
    id:5,
    text:"."
  },
]

const Home = () => {
    return (
      
      <div className="bg-white my-2 mx-5 px-2 py-5 rounded-lg">
        <img src="https://www.tutorialspoint.com/html/images/test.png" alt="Simply Easy Learning" width="200" height="80"></img>
        {
          
          data.map((val,index)=>{
            return(
              <p key={val.id} className="font-sans text-gray-700 text-md font-normal py-2 px-5 ">
                {val.text}
                
              </p>
              
            )
          })
        } 
        </div>
    )
  }
export default Home;
  