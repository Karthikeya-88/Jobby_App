import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const onClickFindJobs = () => {
    const {history} = props
    history.push('/jobs')
  }
  return (
    <>
      <Header />
      <div className="homeContainer">
        <h1 className="homeHeading">
          Find The Job That <br />
          Fits Your Life
        </h1>
        <p className="homeDescription">
          Millions of people are searching for jobs, salary infromation, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs" className="retryBtnLink">
          <button type="button" className="homeBtn" onClick={onClickFindJobs}>
            Find Jobs
          </button>
        </Link>
      </div>
    </>
  )
}
export default Home
