import { Experience } from "../../typing";

type Props = { experience: Experience };

function ExperienceCard({ experience }: Props) {
  const {
    year_joining,
    month_joining,
    isCurrent,
    year_leave,
    month_leave,
    company,
    designation,
  } = experience;
  return (
    <div className="flex w-full flex-col justify-between space-y-5 sm:flex-row sm:space-y-0">
      <div>
        <h4 className="text-xl font-semibold tracking-wider text-primary md:text-2xl">
          {year_joining}
        </h4>
        <h5 className="text-sm text-base-content/80">
          {`${month_joining} ${year_joining}`} -{" "}
          {isCurrent ? <em>present</em> : `${month_leave} ${year_leave}`}
        </h5>
      </div>
      <div className="flex flex-col">
        <h3 className="text-xl tracking-wide text-accent md:text-2xl">
          <strong>{company}</strong>
        </h3>
        <h5 className="text-right text-sm text-base-content/80">
          {designation}
        </h5>
      </div>
    </div>
  );
}

export default ExperienceCard;
