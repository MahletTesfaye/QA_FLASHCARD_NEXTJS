import React from 'react';

const LoadingPage = () => {
  return (
    <div className='m-20 text-xl flex justify-center text-[var(--backgroundSecondary)] '>
        Loading <p className='pl-1 text-[var(--backgroundPrimary)]'>Flashcards</p>...
    </div>
  );
};

export default LoadingPage;