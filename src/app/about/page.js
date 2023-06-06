import Link from 'next/link'

export default function About() {
  return (
    <div className="content-layout">
      <div className="title-box">
        <h2>About Flashcard</h2>
      </div>
      <section className="centered-content">
        <p className="mb-1">Flashcard is a project made by Benjamin Dandre, Student at the 3wa Academy.</p>
        <Link href="/"><button className="button yellow-button">Home</button></Link>
      </section>
    </div>
  )
}
