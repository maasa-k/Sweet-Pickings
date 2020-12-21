import React, { useState, useEffect } from "react";
import classnames from "classnames";
import DefaultLayout from "../layouts/Default";
import Banner from "../components/Banner/Banner";
import { H1, H2, Grid } from "@actionishope/shelley";
import { classes as spacing } from "@actionishope/shelley/styles/default/spacing.st.css";
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";
import { classes as text } from "../styles/puma/text.st.css";
import { st, classes } from "./solution.st.css";
import ReactMarkdown from "react-markdown";
import { renderers } from "../components/Markdown/MarkDownMap";
import gfm from "remark-gfm";
import { api } from "../api";
import { Link, useParams } from "react-router-dom";
import { classes as buttons } from "../styles/puma/button.st.css";

// @ts-ignore
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const CaseStudy = ({ match, location }: any) => {
  let params: any = useParams();
  const image_list: any = [];
  // console.log(match, location, params);
  // Set the initial content with what have from the link via link state.
  const [content, setContent] = useState<any>({
    name: location.state && location.state.title,
    description: location.state && location.state.description,
    // image: location.state && location.state.media,
  });

  useEffect(() => {
    // GET case study via id from the url params.
    api
      .get(`/news/${params.caseStudyId}`)
      .then(async (response) => {
        const page = response.data.data[0];
        // Update content with what comes back from the API
        setContent({
          name: page.title,
          description: page.description,
          images: page.images,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [params.caseStudyId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={st(classnames(classes.root, spacing.mb8))}>
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
                  backgroundImage: `url(${content.images[0]})`,
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
                text.color1
              )}
            >
              {/* {category.title} */}[Main Category]
            </span>
            <br />
            <span
              className={classnames(
                text.textBannerInline,
                text.textBgSm,
                classes.subCategory
              )}
            ></span>
          </H2>
        </Banner>
        <Grid tag="main" variant={1} formatted>
          <H1 vol={7}>
            <small className={classnames(classes.solutionSub, text.color1)}>
              Case Study:
            </small>
            <br />
            {content.name}
          </H1>
          {typeof content.images === "object" && content.images.forEach((item: any) => { image_list.push(item);})}

        <div className={grid.mid}>
        <div className="slide-container"> 
            <Slide infinite = {false} arrows = {image_list.length > 1 ? true : false} autoplay = {false}>
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
            <Link to="/case-studies" className={buttons.link}>
              Find more case studies
            </Link>

            <Link to="/suggestion/case-study" className={buttons.link}>
              Suggest a case study
            </Link>
          </Grid>
        </Grid>
      </DefaultLayout>
    </div>
  );
};

export default CaseStudy;
