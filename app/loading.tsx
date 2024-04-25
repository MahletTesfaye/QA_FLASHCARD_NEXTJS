import React from 'react';

const LoadingPage = () => {
  return (
    <div className='text-xl flex justify-center text-[var(--backgroundSecondary)] mt-[15%]'>
        Loading <p className='pl-1 text-[var(--backgroundPrimary)]'>Flashcards</p>...
    </div>
  );
};

export default LoadingPage;