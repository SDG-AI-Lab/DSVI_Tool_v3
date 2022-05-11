import Head from 'next/head';
import TopBar from '../Topbar';
import Navbar from '../Navbar';

function Header() {
  return (
    <>


        
      <Head>
      <meta charSet="UTF-8" />
        <title>SDG AI Lab | DSVI Tool</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Social Vulnerability Demo developed at SDG AI Lab" />
        <meta name="keywords" content="map,earthquake,social vulnerable" />
        <meta content="SDG AI LAB" name="author" />
        <link defer href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" rel="stylesheet" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossOrigin="anonymous"></link>


      </Head>
  

         
            
        <TopBar/>
     
      <Navbar />
     
           

     
    </>
  );
}

export default Header;