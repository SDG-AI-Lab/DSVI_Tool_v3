const data=[
  {
    id:1,
    text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet venenatis urna cursus eget. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis. Dictum varius duis at consectetur lorem donec massa. Pellentesque id nibh tortor id aliquet lectus proin nibh nisl. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio. Vel pretium lectus quam id leo in vitae. Pharetra sit amet aliquam id. Leo urna molestie at elementum eu facilisis sed odio. Id faucibus nisl tincidunt eget."
  },
  {
    id:2,
    text:"Arcu risus quis varius quam quisque id. Ante metus dictum at tempor commodo ullamcorper a lacus. Placerat vestibulum lectus mauris ultrices eros in. Consequat semper viverra nam libero justo laoreet sit. Tristique senectus et netus et malesuada fames. Amet nulla facilisi morbi tempus. Id diam maecenas ultricies mi eget. In fermentum et sollicitudin ac orci phasellus egestas. Enim tortor at auctor urna nunc id cursus metus aliquam. Semper viverra nam libero justo laoreet sit amet cursus. Gravida rutrum quisque non tellus orci ac auctor augue mauris. Pellentesque sit amet porttitor eget. Velit aliquet sagittis id consectetur purus. Urna et pharetra pharetra massa massa ultricies mi. Cursus in hac habitasse platea dictumst quisque. Iaculis eu non diam phasellus vestibulum lorem. Nisl pretium fusce id velit ut. Ultricies integer quis auctor elit sed vulputate mi sit. Ac auctor augue mauris augue neque gravida in.."
  },
  {
    id:3,
    text:"Erat nam at lectus urna duis. Consectetur a erat nam at lectus. Turpis nunc eget lorem dolor sed. Aliquet nec ullamcorper sit amet risus. Viverra aliquet eget sit amet tellus cras. Ac auctor augue mauris augue. Porta lorem mollis aliquam ut porttitor. Lectus urna duis convallis convallis tellus id. In hendrerit gravida rutrum quisque non tellus. Rhoncus dolor purus non enim praesent elementum facilisis. Massa tincidunt nunc pulvinar sapien et ligula. Diam ut venenatis tellus in metus vulputate. Facilisis mauris sit amet massa vitae tortor condimentum. Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Tortor at risus viverra adipiscing at in tellus. Odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Ante in nibh mauris cursus mattis molestie a iaculis at. Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Pellentesque habitant morbi tristique senectus et netus et malesuada. Nibh mauris cursus mattis molestie a iaculis at erat."
  },
  {
    id:4,
    text:"Nisi scelerisque eu ultrices vitae auctor eu augue. Molestie ac feugiat sed lectus. Imperdiet dui accumsan sit amet nulla. Quisque non tellus orci ac. Neque viverra justo nec ultrices dui sapien eget. Ac auctor augue mauris augue neque gravida in fermentum et. Velit egestas dui id ornare. Porttitor massa id neque aliquam vestibulum morbi blandit. Elit sed vulputate mi sit amet mauris commodo. Volutpat consequat mauris nunc congue."
  },
  {
    id:5,
    text:"Arcu bibendum at varius vel pharetra vel turpis nunc. Urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Dui faucibus in ornare quam. In mollis nunc sed id semper risus in hendrerit gravida. Enim praesent elementum facilisis leo. Elit duis tristique sollicitudin nibh sit amet. Venenatis lectus magna fringilla urna. Sed id semper risus in hendrerit gravida rutrum quisque. Sed vulputate mi sit amet mauris commodo quis. Augue ut lectus arcu bibendum. Nisi porta lorem mollis aliquam. Duis ultricies lacus sed turpis tincidunt id. Semper risus in hendrerit gravida rutrum quisque non. Sit amet tellus cras adipiscing enim eu. Id nibh tortor id aliquet lectus proin nibh nisl condimentum. Nisi scelerisque eu ultrices vitae auctor eu. At lectus urna duis convallis convallis tellus id interdum."
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
  