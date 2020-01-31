import React from 'react'
import TextArea from 'Components/Generic/Textarea'
import Streetlights from 'Components/Generic/Streetlights'

const JointProgramme = () => {
  return (
    <>
      <h2>IV - JOINT PROGRAMME WITH SEVERAL FACULTIES</h2>
      <TextArea id="joint_programme_information_used" label="What other information and sources of information did you use?"/>
      <TextArea id="joint_programme_information_needed" label="What information would you have needed?" />
      <h3>15. COOPERATION</h3>
      <p>How successfully have the partners cooperated? What are the major merits and challenges of cross-faculty operations?</p>
      <Streetlights id="cooperation_success" label="General assessment *"/>
      <TextArea id="cooperation_success" label="Main points of discussion"/>
    </>
  )
}

export default JointProgramme