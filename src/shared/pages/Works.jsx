import React from 'react'
import Navbar from '../components/Navbar'
import WorksHero from '../components/WorksHero'
import WorksMain from '../components/WorksMain'
import WorksDocuments from '../components/WorksDocuments'
import Footer from '../components/Footer'
const Works = () => {
  return (
    <>
    <Navbar />
    <WorksHero />
    <WorksMain />
    <WorksDocuments />
    <Footer isWorksPage={true} />
    </>
  )
}

export default Works