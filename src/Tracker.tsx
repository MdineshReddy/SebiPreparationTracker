import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControlLabel,
  Tab,
  Tabs,
  Typography,
  Checkbox,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Phase1Paper1 from "./Phase1Paper1.json";
import Phase1Paper2 from "./Phase1Paper2.json";
import Phase2Paper1 from "./Phase2Paper1.json";
import Phase2Paper2 from "./Phase2Paper2.json";

const PhaseOne = "Phase One";

const PhaseTwo = "Phase Two";

const PaperOne = "Paper One";

const PaperTwo = "Paper Two";

function getTopic(phase: string, paper: string) {
  if (phase === PhaseOne) {
    return paper === PaperOne ? Phase1Paper1 : Phase1Paper2;
  } else {
    return paper === PaperOne ? Phase2Paper1 : Phase2Paper2;
  }
}

function getStoredCompletedSubTopics(): string[] {
  if (localStorage.getItem("sebiTopicsCompleted")) {
    const completedTopics = localStorage
      .getItem("sebiTopicsCompleted")
      ?.split("--");
    if (completedTopics) return completedTopics;
  }
  return [];
}

const Tracker = () => {
  const [phase, setPhase] = useState(PhaseOne);
  const [paper, setPaper] = useState(PaperOne);
  const topicToShow = getTopic(phase, paper);
  const [completedSubTopics, setCompletedSubTopics] = useState<string[]>(
    getStoredCompletedSubTopics()
  );

  useEffect(() => {
    localStorage.setItem("sebiTopicsCompleted", completedSubTopics.join("--"));
  }, [completedSubTopics]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    subTopic: string
  ) => {
    if (event.target.checked) {
      setCompletedSubTopics((prev) => [...prev, subTopic]);
    } else {
      setCompletedSubTopics((prev) => prev.filter((i) => i !== subTopic));
    }
  };

  function getTotalCompleted(subTopics: string[]): number {
    let count = 0;
    for (let subTopic of subTopics) {
      if (completedSubTopics.includes(subTopic)) {
        count++;
      }
    }
    return count;
  }

  return (
    <main>
      <Typography className="app-title" variant="h1">
        SEBI Grade A Preparation Tracker
      </Typography>
      <Box
        sx={{
          border: 2,
          borderColor: "divider",
          width: "fit-content",
          margin: "0 auto",
        }}
      >
        <Tabs value={phase} onChange={(_, value) => setPhase(value)}>
          <Tab label={PhaseOne} value={PhaseOne} />
          <Tab label={PhaseTwo} value={PhaseTwo} />
        </Tabs>
        <Tabs value={paper} onChange={(_, value) => setPaper(value)}>
          <Tab label={PaperOne} value={PaperOne} />
          <Tab label={PaperTwo} value={PaperTwo} />
        </Tabs>
      </Box>
      <Box
        sx={{
          border: 1,
          borderColor: "divider",
          width: "768px",
          maxWidth: "90vw",
          margin: "1rem auto",
          padding: "1rem",
        }}
      >
        <Typography className="topic-title" variant="h2">
          {topicToShow.title}
        </Typography>
        <Typography className="topic-pattern" variant="body1">
          <b>Pattern: </b> {topicToShow.pattern}
        </Typography>

        <Box sx={{ margin: "1rem 0" }}>
          {topicToShow.topics.map((topic) => (
            <Accordion key={topic.title}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <Typography variant="body1">{topic.title}</Typography>
                    {
                      // @ts-ignore
                      topic?.weightage && (
                        // @ts-ignore
                        <Typography variant="subtitle1">{`(Weightage = ${topic.weightage})`}</Typography>
                      )
                    }
                  </div>

                  <Typography variant="body1">
                    {`(${getTotalCompleted(
                      topic.subtopics.map((i) => i.title)
                    )}/${topic.subtopics.length}) Completed`}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                {topic.subtopics.map((subTopic) => (
                  <Box
                    key={subTopic.title}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    padding={"0.3rem"}
                  >
                    <Typography variant="body2">{subTopic.title}</Typography>
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={completedSubTopics.includes(subTopic.title)}
                          onChange={(e) => handleChange(e, subTopic.title)}
                        />
                      }
                      label="Completed"
                    />
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </main>
  );
};

export default Tracker;
