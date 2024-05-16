import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocation} from 'react-icons/io5'
import {BsBriefcase} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobDescription} = props
  const {
    title,
    description,
    rating,
    id,
    employementType,
    companyLogoUrl,
    location,
    packagePA,
  } = jobDescription

  return (
    <li>
      <Link to={`/jobs/${id}`}>
        <div className="jobsContainer">
          <div className="jobsCompanyLogo">
            <img src={companyLogoUrl} alt="company logo" className="jobLogo" />
            <div>
              <h1 className="jobTitle">{title}</h1>
              <div className="jobRating">
                <FaStar className="icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="jobLocEmpPackage">
            <div className="location">
              <IoLocation className="locationIcon" />
              <p className="jobLoc">{location}</p>
            </div>
            <div className="employment">
              <BsBriefcase className="employementIcon" />
              <p className="jobEmp">{employementType}</p>
            </div>
            <div className="package">
              <p className="jobPackage">{packagePA}</p>
            </div>
          </div>
          <hr className="hrLine" />
          <h1 className="jobDescriptionHead">Description</h1>
          <p className="jobDescriptionHead description">{description}</p>
        </div>
      </Link>
    </li>
  )
}
export default JobCard
