import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import { useTranslation } from "react-i18next";

function ProjectCards(props) {
  const { t } = useTranslation();

  const getTitleLink = () => {
    if (props.demoLink) return props.demoLink;
    if (props.ghLink) return props.ghLink;
    return "#";
  };

  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={props.imgPath} alt="card-img" />
      <Card.Body style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Card.Title className="purple">
          <a 
            href={getTitleLink()} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: 'inherit', 
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'opacity 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.opacity = '0.8'}
            onMouseOut={(e) => e.target.style.opacity = '1'}
          >
            {props.title}
          </a>
        </Card.Title>
        <Card.Text style={{ textAlign: 'left', flex: 1 }} dangerouslySetInnerHTML={{ __html: props.description }} />
        <div style={{ marginTop: 'auto' }}>
          {props.ghLink && (
            <Button variant="primary" href={props.ghLink} target="_blank">
              <BsGithub /> &nbsp;
              {props.isBlog ? t('Blog') : t('GitHub')}
            </Button>
          )}
          {"\n"}
          {"\n"}

          {/* If the component contains Demo link and if it's not a Blog then, it will render the below component  */}

          {!props.isBlog && props.demoLink && (
            <Button
              variant="primary"
              href={props.demoLink}
              target="_blank"
              style={{ marginLeft: "10px" }}
            >
              <CgWebsite /> &nbsp;
              {"Deployed"}
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProjectCards;
