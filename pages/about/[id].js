import React from 'react';
 import { useRouter } from 'next/router';
const Developer=() => {
  const details = [

    { id : 1, name: 'Yash', role: 'Senior Developer'},
    
    { id : 2, name: 'Vaibhav', role: 'Backend Developer'},
    
    { id : 3, name: 'Suresh', role: 'Frontend Developer'}
    
    ]
    const router=useRouter();
    const id =router.query.id;
    const  developer = details.find((itme)=>itme.id==id)

  
  return (
    <div>
      {/* Component JSX */}
      <h1>iam a {developer.role}</h1>
    </div>
  );
};

export default Developer;