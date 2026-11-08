import React from "react";
import PageShell from "../components/pageShell";
import PageHeader from "../components/pageHeader";
import SectionIntro from "../components/sectionIntro";
import Paragraph from "../components/paragraph";
import Surface from "../components/surface";
import NumberedRow from "../components/numberedRow";
import FactsRow from "../components/factsRow";
import LinkCard from "../components/linkCard";
import Figure from "../components/figure";
import Tag from "../components/tag";
import { Cluster, Grid, PageSection, Stack } from "../components/layout";
var meta = {
    title: "Pages/Page components",
};
export default meta;
var facts = [
    { label: "Role", value: "Principal Product Designer" },
    { label: "Company", value: "Example Co" },
    { label: "Focus", value: "Agents" },
    { label: "Experience", value: "15 years" },
    { label: "Based", value: "Chicago area" },
];
export var Page = {
    render: function () { return (<PageShell>
      <PageSection>
        <PageHeader eyebrow="Design Translation · 2011" title="Geocentric Clock" lede="The arm stays still and the numbers come to it." facts={facts}/>
      </PageSection>
      <PageSection>
        <SectionIntro name="How to read it" statement="The light stays. The numbers move.">
          <Paragraph tone="secondary">
            The clock has a stationary light at the top of the circle and a rotating face with three dots between each hour.
          </Paragraph>
        </SectionIntro>
        <Surface padding="xlarge" minHeight="tall" align="center">
          <Paragraph>A panel holds the thing being shown.</Paragraph>
        </Surface>
      </PageSection>
      <PageSection>
        <SectionIntro name="Design decisions" statement="Four choices behind the clock"/>
        <Stack gap="giant">
          <NumberedRow index={0} title="Move the numbers, not the arm" proof="One light stays put. Everything else moves." visual={<Paragraph tone="secondary">A visual</Paragraph>}>
            <p>A standard wall clock turns two arms clockwise over twelve fixed numbers.</p>
          </NumberedRow>
          <NumberedRow index={1} title="A row with nothing to show">
            <p>It is text alone, across the column.</p>
          </NumberedRow>
        </Stack>
      </PageSection>
      <PageSection>
        <SectionIntro name="Tools"/>
        <Surface>
          <Cluster>
            {["Figma", "Prototyping", "Design Systems"].map(function (label) { return (<Tag key={label} variant="contained" size="medium" state="enabled" label={label}/>); })}
          </Cluster>
        </Surface>
        <Grid columns={2}>
          <LinkCard href="/design-translation" title="More Design Translation" caption="Design Translation"/>
          <LinkCard href="/design-product" title="More Design Product" caption="Design Product · Locked"/>
        </Grid>
      </PageSection>
    </PageShell>); },
};
export var FactsAndFigures = {
    render: function () { return (<Stack gap="xxlarge">
      <FactsRow items={facts.slice(0, 3)}/>
      <Grid columns={3} compact>
        <Figure caption="Cropped to 4:5" crop={0.8}>
          <img src="data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt=""/>
        </Figure>
        <Figure caption="On paper" paper>
          <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="" width="100%" height="80"/>
        </Figure>
      </Grid>
    </Stack>); },
};
