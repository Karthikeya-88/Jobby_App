import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaStar} from 'react-icons/fa'
import {IoLocation} from 'react-icons/io5'
import {BsBriefcase} from 'react-icons/bs'
import {HiOutlineExternalLink} from 'react-icons/hi'
import SimilarJobs from '../SimilarJobs'
import Header from '../Header'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loader: 'LOADER',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiConstants.initial,
    jobDetailedDetails: [],
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiConstants.loader})

    const jwtToken = Cookies.get('jwt_token')
    const jobDetailsUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(jobDetailsUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updateData = [data.job_details].map(each => ({
        companyLogoUrl: each.company_logo_url,
        id: each.id,
        employmentType: each.employment_type,
        companyWebsiteUrl: each.company_website_url,
        description: each.job_description,
        lifeAtCompany: {
          lifeDescription: each.life_at_company.description,
          imageUrl: each.life_at_company.image_url,
        },
        packagePA: each.package_per_annum,
        location: each.location,
        rating: each.rating,
        title: each.title,
        skills: each.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
      }))

      const updateSimilarJobs = data.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        id: eachItem.id,
        description: eachItem.job_description,
        employmentType: eachItem.employment_type,
        rating: eachItem.rating,
        title: eachItem.title,
        location: eachItem.location,
      }))
      this.setState({
        jobDetailedDetails: updateData,
        apiStatus: apiConstants.success,
        similarJobs: updateSimilarJobs,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderSuccess = () => {
    const {jobDetailedDetails, similarJobs} = this.state
    if (jobDetailedDetails.length >= 1) {
      const {
        companyLogoUrl,
        description,
        companyWebsiteUrl,
        skills,
        employmentType,
        id,
        lifeAtCompany,
        location,
        packagePA,
        rating,
        title,
      } = jobDetailedDetails[0]

      return (
        <>
          <Header />
          <div className="ultimateJobDetailsCont">
            <div className="jobDetailsCont">
              <div className="jobCont">
                <div className="jobsCompanyLogo">
                  <img
                    src={companyLogoUrl}
                    alt="company logo"
                    className="jobLogo"
                  />
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
                    <p className="jobEmp">{employmentType}</p>
                  </div>
                  <div className="jobPackage">
                    <p className="jobPackage">{packagePA}</p>
                  </div>
                </div>
                <hr className="hrLine jobDetails" />
                <div className="jobDetailsDescription">
                  <div className="descriptionHeader">
                    <h1 className="skillsLifeHead">Description</h1>
                    <div className="visitLink">
                      <a className="visit" href={companyWebsiteUrl}>
                        Visit
                      </a>
                      <HiOutlineExternalLink className="linkIcon" />
                    </div>
                  </div>
                  <p className="DetailsDescription">{description}</p>
                </div>
                <div className="skillsLife">
                  <h1 className="skillsLifeHead">Skills</h1>
                  <ul className="skillsLifeUL">
                    {skills.map(eachSkill => (
                      <li className="listItems" key={eachSkill.name}>
                        <img
                          className="skillImg"
                          src={eachSkill.imageUrl}
                          alt={eachSkill.name}
                        />
                        <p>{eachSkill.name}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="skillsLife">
                  <h1 className="skillsLifeHead">Life at Company</h1>
                  <div className="lifeAtCompanyCont">
                    <p className="lifeAtCompanyDes">
                      {lifeAtCompany.lifeDescription}
                    </p>
                    <img
                      src={lifeAtCompany.imageUrl}
                      alt="life at company"
                      className="lifeAtCompanyImg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="skillsLife similarJobs">
              <h1 className="skillsLifeHead">Similar Jobs</h1>
              <ul className="similarJobsUL">
                {similarJobs.map(each => (
                  <SimilarJobs key={each.id} similarJobsData={each} />
                ))}
              </ul>
            </div>
          </div>
        </>
      )
    }
    return null
  }

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.getJobDetails}>
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccess()
      case apiConstants.failure:
        return this.renderFailure()
      case apiConstants.loader:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderDetails()}</div>
  }
}
export default JobItemDetails
