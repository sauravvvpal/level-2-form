import React from 'react';
import { useForm } from './useForm';
import { validate } from './validate';
import './jobApplicationForm.css';

const JobApplicationForm = () => {
  const { values, errors, handleChange, handleSubmit, submitted } = useForm({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    skills: [],
    interviewTime: ''
  }, validate);

  const handleSkillChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      handleChange({ target: { name, value: [...values.skills, name] } });
    } else {
      handleChange({ target: { name, value: values.skills.filter(skill => skill !== name) } });
    }
  };

  return (
    <div className="container">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="form">
          <h2>Job Application Form</h2>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="fullName" value={values.fullName} onChange={handleChange} />
            {errors.fullName && <p className="error">{errors.fullName}</p>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={values.email} onChange={handleChange} />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="number" name="phoneNumber" value={values.phoneNumber} onChange={handleChange} />
            {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
          </div>
          <div className="form-group">
            <label>Applying for Position</label>
            <select name="position" value={values.position} onChange={handleChange}>
              <option value="">Select a position</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
            {errors.position && <p className="error">{errors.position}</p>}
          </div>
          {(values.position === 'Developer' || values.position === 'Designer') && (
            <div className="form-group">
              <label>Relevant Experience (years)</label>
              <input type="number" name="relevantExperience" value={values.relevantExperience} onChange={handleChange} />
              {errors.relevantExperience && <p className="error">{errors.relevantExperience}</p>}
            </div>
          )}
          {values.position === 'Designer' && (
            <div className="form-group">
              <label>Portfolio URL</label>
              <input type="text" name="portfolioURL" value={values.portfolioURL} onChange={handleChange} />
              {errors.portfolioURL && <p className="error">{errors.portfolioURL}</p>}
            </div>
          )}
          {values.position === 'Manager' && (
            <div className="form-group">
              <label>Management Experience</label>
              <textarea name="managementExperience" value={values.managementExperience} onChange={handleChange}></textarea>
              {errors.managementExperience && <p className="error">{errors.managementExperience}</p>}
            </div>
          )}
          <div className="form-group">
            <label>Additional Skills</label>
            <div>
              <label>
                <input type="checkbox" name="JavaScript" checked={values.skills.includes('JavaScript')} onChange={handleSkillChange} />
                JavaScript
              </label>
              <label>
                <input type="checkbox" name="CSS" checked={values.skills.includes('CSS')} onChange={handleSkillChange} />
                CSS
              </label>
              <label>
                <input type="checkbox" name="Python" checked={values.skills.includes('Python')} onChange={handleSkillChange} />
                Python
              </label>
              {/* Add more skills as needed */}
            </div>
            {errors.skills && <p className="error">{errors.skills}</p>}
          </div>
          <div className="form-group">
            <label>Preferred Interview Time</label>
            <input type="datetime-local" name="interviewTime" value={values.interviewTime} onChange={handleChange} />
            {errors.interviewTime && <p className="error">{errors.interviewTime}</p>}
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      ) : (
        <div className="summary">
          <h2>Application Summary</h2>
          <p><strong>Full Name:</strong> {values.fullName}</p>
          <p><strong>Email:</strong> {values.email}</p>
          <p><strong>Phone Number:</strong> {values.phoneNumber}</p>
          <p><strong>Position:</strong> {values.position}</p>
          {(values.position === 'Developer' || values.position === 'Designer') && (
            <p><strong>Relevant Experience:</strong> {values.relevantExperience} years</p>
          )}
          {values.position === 'Designer' && (
            <p><strong>Portfolio URL:</strong> {values.portfolioURL}</p>
          )}
          {values.position === 'Manager' && (
            <p><strong>Management Experience:</strong> {values.managementExperience}</p>
          )}
          <p><strong>Skills:</strong> {values.skills.join(', ')}</p>
          <p><strong>Preferred Interview Time:</strong> {values.interviewTime}</p>
        </div>
      )}
    </div>
  );
};

export default JobApplicationForm;
