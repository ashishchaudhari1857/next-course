import React from 'react';
 import { useRouter } from 'next/router';
const Developer=() => {
  const router=useRouter();
  const name =router.query.role;
  return (
    <div>
      {/* Component JSX */}
      <h1>iam a developer{name}</h1>
    </div>
  );
};

export default Developer;