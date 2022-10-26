import {useRouter} from 'next/router';
import linkedin from '/public/images/linkedin.png'
import Image from "next/image";


const data=[
  {
    id:1,
    name: "Andrei Prokorov",
    image:"./images/Photo_Andrei_Prokhorov.jpg",
    motivation: 
    "I hope that my work in the UNDP is a small contribution to improving the quality of life of people, in difficult life circumstances.",
    Bio: "Software engineer, with 3+ years of experience. Completed Master's degree in Aircraft Flight Operation in 2012. ",
    Linkedin: "https://www.linkedin.com/in/andrei-prokhorov-2b5303213"
  },
  {
    id:2,
    name: "Name Name",
    image:"https://via.placeholder.com/250",
    motivation: "Sample motivation Sample motivation  Sample motivation Sample motivation Sample motivation",
    Bio: "Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio",
    Linkedin: "https://www.linkedin.com"
  },
  {
    id:3,
    name: "Name Name",    
    image:"https://via.placeholder.com/250",
    motivation: "Sample motivation Sample motivation  Sample motivation Sample motivation Sample motivation",
    Bio: "Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio",
    Linkedin: "https://www.linkedin.com"
  },
  {
    id:4,
    name: "Name Name",    
    image:"https://via.placeholder.com/250",
    motivation: "Sample motivation Sample motivation  Sample motivation Sample motivation Sample motivation",
    Bio: "Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio",
    Linkedin: "https://www.linkedin.com"
    
  },
  {
    id:5,
    name: "Name Name",    
    image:"https://via.placeholder.com/250",
    motivation: "Sample motivation Sample motivation  Sample motivation Sample motivation Sample motivation",
    Bio: "Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio",
    Linkedin: "https://www.linkedin.com"
  },
  {
    id:6,
    name: "Name Name",    
    image:"https://via.placeholder.com/250",
    motivation: "Sample motivation Sample motivation  Sample motivation Sample motivation Sample motivation",
    Bio: "Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio",
    Linkedin: "https://www.linkedin.com"
  },
  {
    id:7,
    name: "Name Name",    
    image:"https://via.placeholder.com/250",
    motivation: "Sample motivation Sample motivation  Sample motivation Sample motivation Sample motivation",
    Bio: "Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio",
    Linkedin: "https://www.linkedin.com"
  },
  {
    id:8,
    name: "Name Name",    
    image:"https://via.placeholder.com/250",
    motivation: "Sample motivation Sample motivation  Sample motivation Sample motivation Sample motivation",
    Bio: "Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio",
    Linkedin: "https://www.linkedin.com"
  },
  {
    id:9,
    name: "Name Name",    
    image:"https://via.placeholder.com/250",
    motivation: "Sample motivation Sample motivation  Sample motivation Sample motivation Sample motivation",
    Bio: "Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio",
    Linkedin: "https://www.linkedin.com"
  },
  {
    id:10,
    name: "Name Name",    
    image:"https://via.placeholder.com/250",
    motivation: "Sample motivation Sample motivation  Sample motivation Sample motivation Sample motivation",
    Bio: "Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio Sample Bio",
    Linkedin: "https://www.linkedin.com/"
  },          
]


/**
 * Utility to detect if you're on the server, or in the browser.
 */
const isBrowser = typeof window !== "undefined";
const Volunteer = () => {
    return isBrowser ? (
      
      <div className="bg-white my-2 mx-5 px-2 py-5 rounded-lg">

    

            <div class="container">


                <p><b>DSVI Volunteer Developer Team</b></p>
                <p>Online UN Volunteers are actively contributing to DSVI Volunteer Developer Team Project. Many thanks to all our volunteers for their contribution</p>
                <br></br>
                  <div class="row row-cols-1 row-cols-md-4 g-4">
                      {        
                        data.map((val,index)=>{
                          return(
                              <div class="col">


                                <div  class="card h-100">
                                  <img src={val.image} class="card-img-top" alt="..."/>
                                  <div class="card-body">
                                    <p class="card-text menu"> 
                                      <div className="py-2">
                                        <a href={val.Linkedin} className="-m-2 flex items-center p-2" target="_blank">
                                          <Image src={linkedin} alt="Logo"  width={30}
                                        height={30} className="block h-auto w-5 flex-shrink-0" />
                                         <span className="ml-3 block text-base font-medium text-gray-900">{val.name}</span>
                                        </a>
                                      </div>
                                      
                                       
                                    </p>


                                    <p class="card-title">{val.motivation}</p>
                                    <p class="card-text">{val.Bio}</p>
                                   


                                  </div>
                                </div>
                              </div>
                          )
                        })
                      } 

                  </div>                    

            </div>



      
        </div>

          
        
    ) : null;
  }
export default Volunteer;