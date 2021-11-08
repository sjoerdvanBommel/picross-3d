import Link from 'next/link';
import React from 'react';

const IndexPage = () => {
  return (
    <main className='full-screen-responsive flex'>
      <div className="hover:pointer above-canvas">
        <Link href="/create-figure">Create puzzle</Link>
      </div>
    </main>
  )
}

export default IndexPage
