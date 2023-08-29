import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../BackButton';

const CreateChapterPage = () => {
  const containerStyles = {
    background: '#f6f9fc',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 20px',
  };

  const cardStyles = {
    background: '#fff',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center',
  };

  const titleStyles = {
    fontSize: '28px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '20px',
  };

  const sectionStyles = {
    marginBottom: '40px',
  };

  const sectionTitleStyles = {
    fontSize: '20px',
    fontWeight: '500',
    color: '#4F46E5',
    marginBottom: '16px',
  };

  const listStyles = {
    color: '#555',
    marginBottom: '20px',
    paddingLeft: '20px',
    lineHeight: '1.5',
  };

  const linkStyles = {
    background: '#4F46E5',
    color: '#fff',
    padding: '16px 40px',
    borderRadius: '30px',
    fontWeight: '600',
    fontSize: '18px',
    textDecoration: 'none',
    transition: 'background 0.3s ease-in-out',
    display: 'inline-block',
    marginTop: '20px',
  };

  const noteStyles = {
    color: '#777',
    marginTop: '20px',
    fontSize: '14px',
  };

  return (
    <div style={containerStyles}>
      <div style={cardStyles}>
        <h2 style={titleStyles}>Start a Chapter with ACYU</h2>
        <div style={sectionStyles}>
          <h3 style={sectionTitleStyles}>Requirements</h3>
          <ul style={listStyles}>
            <li>Assemble a passionate team of at least 5 dedicated individuals.</li>
            <li>Commit to promoting ACYU's mission and values.</li>
            <li>Define a clear vision for your chapter's community impact.</li>
          </ul>
        </div>
        <div style={sectionStyles}>
          <h3 style={sectionTitleStyles}>Responsibilities</h3>
          <ul style={listStyles}>
            <li>Organize impactful events and initiatives.</li>
            <li>Collaborate with local organizations for amplified change.</li>
            <li>Drive advocacy efforts to create positive shifts.</li>
            <li>Cultivate an inclusive environment for all members.</li>
          </ul>
        </div>
        <p style={noteStyles}>
          Empower your community. Make a difference. Begin your ACYU chapter journey today.
        </p>
        <p style={noteStyles}>
          Creating a chapter is a journey of transformation and impact. Ready to elevate your community?
        </p>
        <div>
          <a
            href="https://theacyu.com/create-a-chapter"
            style={linkStyles}
          >
            Get Started
          </a>
        </div>
        <p style={noteStyles}>
          Note: Initiating a chapter requires dedication to meaningful progress. Contact us to embark on this exciting endeavor!
        </p>
        <div style={{ marginTop: '40px' }}>
          <BackButton />
        </div>
      </div>
    </div>
  );
};

export default CreateChapterPage;
