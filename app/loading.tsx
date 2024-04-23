import React from 'react';

const LoadingPage = () => {
  return (
    <div className='mt-[10%] text-xl flex justify-center text-[var(--backgroundSecondary)] w-2/3'>
        Loading <p className='pl-1 text-[var(--backgroundPrimary)]'>Flashcards</p>...
    </div>
  );
};

export default LoadingPage;