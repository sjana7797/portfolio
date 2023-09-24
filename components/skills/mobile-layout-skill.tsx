import { Accordion } from "@radix-ui/react-accordion";
import { segregatedSkills } from "./constant";
import { renderSkills } from "./utils";
import { skillsTypes } from "./type";

type Props = {};

function MobileLayoutSkill({}: Props) {
  const defaultTypes = [...skillsTypes];
  return (
    <Accordion
      type="multiple"
      className="block w-full md:hidden"
      defaultValue={defaultTypes}
    >
      {renderSkills(segregatedSkills)}
    </Accordion>
  );
}

export default MobileLayoutSkill;
