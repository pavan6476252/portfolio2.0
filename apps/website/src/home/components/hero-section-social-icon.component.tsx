import React, { useContext, useState } from "react";
import { getIconByName } from "../../utils/social-icons.mapper";
import EditSocialPlatformsComponent from "./social-platforms.edit";
import { useAppSelector } from "../../store/store";
import EditContext from "../../context/edit-context";
import { TbEditCircle } from "react-icons/tb";
import { Link } from "react-router-dom";

function HeroSectionSocialIconsComponent() {
  const resumeState = useAppSelector((state) => state.home);
  const { editMode, setEditMode } = useContext(EditContext);
  if (!resumeState.resume || resumeState.loading) {
    return null;
  }

  const [socialIconsVisibility, setSocialIconsVisibility] = useState(false);

  return (
    <>
      <EditSocialPlatformsComponent
        visibility={socialIconsVisibility}
        togglSocialIconsVisibility={() => setSocialIconsVisibility((s) => !s)}
      />
      {resumeState.resume.socialPlatforms.map((platform) => {
        const Icon = getIconByName(platform.name);
        return (
          <Link to={platform.link} target="_blank">
            <Icon />
          </Link>
        );
      })}
      {editMode && (
        <TbEditCircle
          onClick={() => setSocialIconsVisibility(true)}
          className="text-indigo-500"
        />
      )}
    </>
  );
}

export default HeroSectionSocialIconsComponent;
