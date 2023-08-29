import React from 'react';
import DashboardButton from './DashboardButton';

function DashboardSection({ title, items, colorTint, locked }) {
  const sectionStyles = {
    background: '#24232e',
    border: `1px solid ${colorTint}`,
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  };

  const titleStyles = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#e3e3e3',
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '20px',
  };

  return (
    <div style={sectionStyles} className='bg-black-400'>
      <h2 className='text-3xl font-semibold text-color-white m-5'>{title}</h2>
      {locked ? (
        <div className='text-color-white justify-center align-middle text-center'>
          <div className="alert alert-warning text-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span>This Element is currently Locked.</span>
          </div>
        </div>
      ) :
        <div style={gridStyles}>
          {items.map((item, index) => (
            <DashboardButton key={index} item={item} tint={colorTint} />
          ))}
        </div>
      }
    </div>
  );
}

export default DashboardSection;