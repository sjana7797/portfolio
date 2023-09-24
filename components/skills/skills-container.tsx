import DesktopLayoutSkills from "./desktop-layout-skills";
import MobileLayoutSkill from "./mobile-layout-skill";

type Props = {};

function SkillsContainer({}: Props) {
  return (
    <>
      {/* Desktop layout */}
      <DesktopLayoutSkills />
      {/* Mobile layout */}
      <MobileLayoutSkill />
    </>
  );
}

export default SkillsContainer;
