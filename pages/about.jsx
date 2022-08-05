const data=[
  {
    id:1,
    text:"."
  },
  {
    id:2,
    text:"."
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
  