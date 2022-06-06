type Props = {};

function ExperienceCard({}: Props) {
  return (
    <div className="flex w-full flex-col justify-between space-y-5 sm:flex-row sm:space-y-0">
      <div>
        <h4 className="text-xl font-semibold tracking-wider text-primary md:text-2xl">
          2022
        </h4>
        <h5 className="text-sm text-base-content/80">
          Jan 2022 - <em>present</em>
        </h5>
      </div>
      <div className="flex flex-col">
        <h3 className="text-xl tracking-wide text-accent md:text-2xl">
          <strong>ValarTech</strong>
        </h3>
        <h5 className="text-sm text-base-content/80">React JS Developer</h5>
      </div>
    </div>
  );
}

export default ExperienceCard;
