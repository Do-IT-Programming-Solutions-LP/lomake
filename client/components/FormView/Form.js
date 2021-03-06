import React, { useEffect } from 'react'
import Section from './Section'
import Textarea from 'Components/Generic/Textarea'
import Entity from 'Components/Generic/Entity'
import Measures from 'Components/Generic/Measures'
import { useSelector, useDispatch } from 'react-redux'
import { romanize } from 'Utilities/common'
import { getPreviousAnswersAction } from 'Utilities/redux/previousAnswersReducer'

const Form = ({ questions, programmeKey }) => {
  const previousYearsAnswers = useSelector((state) => state.previousAnswers)
  const dispatch = useDispatch()
  const languageCode = useSelector((state) => state.language)
  const room = useSelector(({ room }) => room)

  useEffect(() => {
    if (room) dispatch(getPreviousAnswersAction(room))
  }, [room])

  const partComponentMap = {
    TEXTAREA: Textarea,
    ENTITY: Entity,
    MEASURES: Measures,
  }

  let number = -1

  const partMap = (part) => {
    const summary =
      part.id.includes('meta')
      || part.id.includes('information_needed')
      || part.id.includes('information_used')

    const divStyle = summary
      ? {
          paddingLeft: '1.5em',
          borderLeft: '5px solid',
          borderColor: '#1B1C1D',
          marginBottom: '0',
        }
      : {}

    if (part.type === 'TITLE') {
      return <h2 key={part.id} style={divStyle}>{part.label[languageCode]}</h2>
    }

    if (!partComponentMap.hasOwnProperty(part.type)) {
      console.error(`No component matching '${part.type}'`)
      return null
    }

    if (part.type === 'ENTITY' || part.type === 'MEASURES') number++

    const Component = partComponentMap[part.type]
    const description = part.description ? part.description[languageCode] : undefined
    return (
      <div key={part.id} style={divStyle}>
        <Component
          id={part.id}
          label={part.label[languageCode]}
          description={description}
          required={part.required}
          noLight={part.no_light}
          number={number}
          previousYearsAnswers={
            previousYearsAnswers.data && previousYearsAnswers.data.data
              ? previousYearsAnswers.data.data
              : null
          }
        />
      </div>
    )
  }

  return (
    <>
      {questions.map((section, index) => {
        return (
          <Section
            title={section.title[languageCode]}
            number={romanize(index)}
            key={section.title[languageCode]}
            programmeKey={programmeKey}
          >
            {section.link_title && section.link_url && (
              <a target="_blank" href={section.link_url}>
                {section.link_title[languageCode]}
              </a>
            )}
            {section.parts.map(partMap)}
          </Section>
        )
      })}
    </>
  )
}

export default Form
