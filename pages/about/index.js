import React from 'react';
import Link from 'next/link';
 
const About = () => {

  const details = [

    { id : 1, name: 'Yash', role: 'Senior Developer'},
    
    { id : 2, name: 'Vaibhav', role: 'Backend Developer'},
    
    { id : 3, name: 'Suresh', role: 'Frontend Developer'}
    
    ]
  return (
    <div>
      {/* Component JSX */}
      <h1>this is about page</h1>

   {
    details.map((item)=>(
      <div>
      <Link  href={`/about/${item.id}`}>
       {item.name}</Link>
     </div>
    ))
      
   }
    </div>
  );
};

export default About;


