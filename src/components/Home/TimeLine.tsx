import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { Event } from "@mui/icons-material";
import { Typography } from "@mui/material";

type Props = {
  timelines?: number[];
};

TimeLine.Event = TimeLineEvent;

function TimeLine({ timelines = [] }: Props) {
  return (
    <div className="bg-slate-900">
      <div className="bg-gray-100 pt-[4vmax] rounded-b-[200px] border-b-[200px] border-solid border-b-gray-100 relative z-10">
        <Typography
          variant="h3"
          className="text-center p-[4vmax] text-gray-900"
        >
          TIMELINE
        </Typography>
        <TimeLine.Event timelines={[1, 2, 3]} />
      </div>
    </div>
  );
}

function TimeLineEvent({ timelines = [] }: Props) {
  return (
    <Timeline position="alternate">
      {timelines.map((item, index) => {
        return (
          <TimelineItem key={index}>
            <TimelineOppositeContent
              sx={{ m: "auto 0" }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              3/27/23
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot>
                <Event />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: "12px", px: 2 }}>
              <Typography variant="h6">{"item.title"}</Typography>
              <Typography variant="body2">{"item.description"}</Typography>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}

export default TimeLine;
