import {FaStar} from 'react-icons/fa'
import {IoLocation} from 'react-icons/io5'
import {BsBriefcase} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {similarJobsData} = props
  const {companyLogoUrl, employmentType, description, title, rating, location} =
    similarJobsData

  return (
    <li className="detailedSimilarJobs">
      <div className="similarJobsTop">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similarJobsImg"
        />
        <div className="titleRating">
          <h1>{title}</h1>
          <div className="jobRating">
            <FaStar className="ratingIcon" />
            <p className="jobRatingDes">{rating}</p>
          </div>
        </div>
      </div>
      <div className="similarDesLocEmp">
        <h1>Description</h1>
        <p>{description}</p>
        <div className="locEmp">
          <div className="locEmp last">
            <IoLocation className="similarIcon" />
            <p>{location}</p>
          </div>
          <div className="locEmp last">
            <BsBriefcase className="similarIcon" />
            <p>{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
