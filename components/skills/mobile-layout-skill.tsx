import { Accordion } from "@radix-ui/react-accordion";
import { segregatedSkills } from "./constant";
import { renderSkills } from "./utils";

type Props = {};

function MobileLayoutSkill({}: Props) {
  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={["frontend", "backend"]}
    >
      {renderSkills(segregatedSkills)}
    </Accordion>
  );
}

export default MobileLayoutSkill;
