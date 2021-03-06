import React, { useState, useEffect } from "react";
import classnames from "classnames";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { renderers } from "../components/Markdown/MarkDownMap";
import { Link, useParams } from "react-router-dom";
import { api, slug } from "../api";
import DefaultLayout from "../layouts/Default";
import Banner from "../components/Banner/Banner";
import SocialShare from "../components/SocialSahre/SocialShare";
import Card from "../components/Card/Card";
import { H1, H2, P, Grid } from "@actionishope/shelley";
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";
import { classes as spacing } from "@actionishope/shelley/styles/default/spacing.st.css";
import { classes as buttons } from "../styles/puma/button.st.css";
import { classes as text } from "../styles/puma/text.st.css";
import { st, classes } from "./solution.st.css";

// @ts-ignore
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { Helmet } from "react-helmet-async";

const Solution = ({ match, location }: any) => {
  const params: any = useParams();
  // console.log(match, location, params);

  // Set the initial content with what have from the link via link state.
  const [content, setContent] = useState<any>({
    name: location.state && location.state.title,
    description: location.state && location.state.description,
    images: location.state && location.state.media,
  });

  const [caseStudies, setCaseStudies] = useState<any>([]);
  const [similarSolutions, setSimilarSolutions] = useState<any>([]);
  const image_list: any = [];
  useEffect(() => {
    // GET solution via id from the url params.
    api
      .get(`/ideas/${params.solutionId}`)
      .then(async (response) => {
        const page = response.data.data[0];
        // Update content with what comes back from the API
        setContent({
          name: page.name,
          description: page.description,
          images: page.images || false,
          excerpt: page.excerpt,
          mainCategores: page.categories.main_categories ? page.categories.main_categories.items : false,
          orgTypes:  page.categories.organisation_types ? page.categories.organisation_types.items : false,
          stakeholders:page.categories.stakeholders ? page.categories.stakeholders.items : false,
          links: page.links,
          mainCatLabel: page.categories.main_categories ? page.categories.main_categories.sys_name: false,
          orgTypesLabel: page.categories.organisation_types ? page.categories.organisation_types.sys_name : false,
          stakeholdersLabel: page.categories.stakeholders ? page.categories.stakeholders.sys_name : false
        });        
        // Get and set case studies
        page.links.news &&
          api
            .get(page.links.news)
            .then(async (response) => {              
              return setCaseStudies(response.data.data);
            })
            .catch((error) => {
              console.error(error);
            });
            page.links.topic.key && 
            api
               .get(`/topics/${page.links.topic.key}`)
               .then(async (response) => {
                  return setSimilarSolutions(response.data.data[0].links.ideas);              
               })
      .catch((error) => {
        console.error(error);
      });    
    })
      .catch((error) => {
        console.error(error);
      });    
  }, [params.solutionId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={st(classnames(classes.root, spacing.mb8))}>
      <Helmet>
        <meta name="description" content={content.excerpt && content.excerpt}/>
        <meta property="og:title" content={content.name && content.name}/>
        <meta property="og:description" content={content.excerpt && content.excerpt}/>
        <meta property="og:image" content={content.images && content.images[0]}/>
        <meta property="og:type" content="website"/>
      </Helmet>
      <DefaultLayout>
        <Banner
          className={grid.edge}
          style={{
            marginBottom: "3vw",
          }}
          media={
            content.images && (
              <div
                style={{
                  opacity: 0.15,

                  backgroundImage: `url(${
                    (content.mainCategores &&
                      content.mainCategores[0].cat_image)
                    })`,

                  backgroundSize: "cover",
                  backgroundPosition: "0 50%",
                }}
              />
            )
          }
        >
          <H2 className={grid.goal} vol={8} uppercase>
            <span
              className={classnames(
                text.textBannerInline,
                classes.category,
                text.color2
              )}
            >
              {content.mainCategores && content.mainCategores[0].cat_name}
            </span>
            <br />
            <span
              className={classnames(
                text.textBannerInline,
                text.textBgSm,
                classes.subCategory
              )}
            >
              {content.links && content.links.topic.name}
            </span>
          </H2>
        </Banner>           
        <Grid tag="main" variant={1} formatted>
          <H1 vol={7}>
            <small className={classnames(classes.solutionSub, text.color2)}>
              Solution:
            </small>
            <br />
            {content.name}
          </H1>                       
           {typeof content.images === "object" && content.images.forEach((item: any) => { image_list.push(item);})}

        <div className={grid.mid}>
        <div className="slide-container"> 
            <Slide infinite = {false} arrows = {image_list.length > 1 ? true : false}>
              {image_list && image_list.map((item: any, index: number) => {
                return (<img key={index} src={item} width='100%' alt=""/>);
              })}
            </Slide>
          </div>
          </div>                                          
          <ReactMarkdown
            source={content.description}
            renderers={renderers}
            plugins={[gfm]}
          />
  <P vol={2}>
          {content.mainCategores ? <strong>{content.mainCatLabel+': '}</strong> : null}
            {content.mainCategores &&
              content.mainCategores.map((item: any, index: number) => {
                const tail = index !== content.mainCategores.length - 1 && ", ";
                return (
                  <span key={`cattypes${index}`}>
                    {item.cat_name}
                    {tail}
                  </span>
                );
              })}
          </P>
          <P vol={2}>
          {content.orgTypes ? <strong>{content.orgTypesLabel+': '}</strong> : null}
            {content.orgTypes &&
              content.orgTypes.map((item: any, index: number) => {
                const tail = index !== content.orgTypes.length - 1 && ", ";
                return (
                  <span key={`cattypes${index}`}>
                    {item.cat_name}
                    {tail}
                  </span>
                );
              })}
          </P>
          <P vol={2}>
          {content.stakeholders ? <strong>{content.stakeholdersLabel+': '} </strong> : null}
              {content.stakeholders &&
              content.stakeholders.map((item: any, index: number) => {
                const tail = index !== content.stakeholders.length - 1 && ", ";
                return (
                  <span key={`cattypes${index}`}>
                    {item.cat_name}
                    {tail}
                  </span>
                );
              })}
          </P>
          <Grid
            variant={2}
            formatted
            className={classnames(
              spacing.mt2,
              spacing.mt4,
              spacing.mb8,
              grid.pen
            )}
          >
            <Link to="/solutions" className={buttons.link}>
              Find more solutions
            </Link>

            <Link to="/suggestion/solution" className={buttons.link}>
              Suggest a solution
            </Link>
          </Grid>

          <H2 className={classnames(grid.goal, spacing.mb2)} vol={7} uppercase>
            Related Case studies
          </H2>
          {caseStudies.length > 0 && (
            <div className={grid.goal}>
              <Grid variant={4}>
                {caseStudies.map((item: any) => {
                  return (
                    <Card
                      title={item.title}
                      url={`/case-studies/${item.key}/${slug(item.title)}`}
                      description={item.excerpt ? item.excerpt : item.description}
                      media={item.images[0]}
                      key={item.key}
                    />
                  );
                })}
              </Grid>
            </div>
          )}
          <Grid            
            formatted
            className={classnames(
              spacing.mt2,
              spacing.mt4,             
              grid.pen
            )}
            >                
          <H2 className={classnames(grid.goal, spacing.mb2)} vol={7} uppercase>
            Related Solutions
          </H2>
          {similarSolutions.length > 0 && (
            <div className={grid.goal}>
              <Grid variant={4}>
                {similarSolutions.map((item: any) => {
                  if(parseInt(item.key) !== parseInt(params.solutionId)){                  
                  return (
                    <Card
                      title={item.title}
                      url={`/solutions/${item.key}/${slug(item.title)}`}
                      description={item.excerpt ? item.excerpt : item.description}
                      media={item.images[0]}
                      key={item.key}
                      onClick = {() =>{window.scrollTo(0, 0);}}
                    />
                  );
                  } else {
                    return null;
                  }
                })}
              </Grid>
            </div>
          )}
          </Grid> 
        </Grid>
      </DefaultLayout>
      <SocialShare title={(content && content.name) ? content.name : 'Solutions page'} url={document.URL} description={content.excerpt && content.excerpt}></SocialShare>
    </div>
  );
};

export default Solution;
