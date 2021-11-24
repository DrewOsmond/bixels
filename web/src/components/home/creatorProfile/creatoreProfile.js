import github from "../../../assets/github.svg";
import linkedin from "../../../assets/linkedin.svg";
import twitter from "../../../assets/twitter.svg";

const CreatorProfile = ({ person, name, links, title }) => {
  const [ghLink, twitterLink, linkedinLink] = links;
  return (
    <div className="profile">
      <img src={person} alt={name} />
      <div className="creator-details">
        <div className="creator-names">{name}</div>
        <div className="creator-titles">{title}</div>
        <div className="link-icons">
          <a href={ghLink} target="_blank" rel="noreferrer">
            <img src={github} alt="github" />
          </a>
          <a href={twitterLink} target="_blank" rel="noreferrer">
            <img src={twitter} alt="twitter" />
          </a>
          <a href={linkedinLink} target="_blank" rel="noreferrer">
            <img src={linkedin} alt="linkedin" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CreatorProfile;
