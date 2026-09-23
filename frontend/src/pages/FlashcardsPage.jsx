import React from 'react';
import Header from '../components/Header';

export default function FlashcardsPage() {
  return (
    <div className='min-h-screen bg-[#0b1120] text-white'>
      <Header />
      <main className='container mx-auto px-4 py-20 text-center'>
        <h1 className='text-4xl font-bold'>Trang Flashcards</h1>
        <p className='text-slate-400 mt-4'>ang pht tri?n n?i dung...</p>
      </main>
    </div>
  );
}
