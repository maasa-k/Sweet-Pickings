import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import classnames from "classnames";
import {
  H1,
  Grid,
  InputText,
  InputSelect,
  Button,
} from "@actionishope/shelley";
import Banner from "../components/Banner/Banner";
import { classes as spacing } from "@actionishope/shelley/styles/default/spacing.st.css";
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";
import { classes as text } from "../styles/puma/text.st.css";

const Suggestion = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={spacing.mb8}>
      <Helmet>
        <title>Make a suggestion - Solutions database</title>
      </Helmet>
      <Banner
        className={grid.edge}
        style={{
          marginBottom: "3vw",
        }}
      >
        <H1 vol={8} uppercase>
          <span className={classnames(text.textBannerInline, text.textBg2)}>
            Make a suggestion
          </span>
        </H1>
      </Banner>
      <Grid tag="main" variant={1} formatted>
        <div className={grid.mid}>
          <InputSelect
            label={`Suggestion type`}
            placeholder="Please select"
            vol={3}
            variant={3}
            id={`sol2`}
          >
            <option value={`carbon`}>Case Study</option>
            <option value={`plastic`}>Solution</option>
          </InputSelect>
          <br />
          <br />
          <InputText
            placeholder="Title..."
            label={`Title`}
            vol={3}
            variant={3}
            id={`sol1`}
          />
          <br />
          <br />
          <InputText
            label={`Main content`}
            placeholder="Start typing..."
            vol={3}
            variant={3}
            rows={10}
            id={`sol3`}
          />
          <Button
            variant={3}
            vol={5}
            tone={5}
            className={spacing.mt2}
            fullWidth
          >
            Submit
          </Button>
        </div>
      </Grid>
    </div>
  );
};

export default Suggestion;